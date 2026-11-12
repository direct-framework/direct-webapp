"""Signal receivers for the main app."""

from typing import Any

from django.conf import settings
from django.contrib.contenttypes.models import ContentType
from django.core.exceptions import ValidationError
from django.db.models.signals import post_delete, post_save, pre_delete
from django.dispatch import receiver
from guardian.models import UserObjectPermission
from guardian.shortcuts import assign_perm, remove_perm

from .models import Profile, Team, TeamMembership, User


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_user_profile(
    sender: type[User], instance: User, created: bool, raw: bool, **kwargs: Any
) -> None:
    """Create a profile for each newly created user.

    Raw saves from fixture loading are skipped, so fixtures that contain users
    must also contain their profiles.
    """
    if created and not raw:
        Profile.objects.create(user=instance)


TEAM_PERMISSIONS = (
    "view_team",
    "change_team",
    "delete_team",
    "view_team_member_profiles",
    "manage_team_members",
)
MANAGER_PERMISSIONS = TEAM_PERMISSIONS[1:]


def synchronize_team_membership_permissions(
    membership: TeamMembership, *, manager: bool
) -> None:
    """Recompute a member's permissions for a team from their manager role."""
    for codename in TEAM_PERMISSIONS:
        remove_perm(f"main.{codename}", membership.user, membership.team)

    codenames = ("view_team", *MANAGER_PERMISSIONS) if manager else ("view_team",)
    for codename in codenames:
        assign_perm(f"main.{codename}", membership.user, membership.team)


def remove_team_membership_permissions(membership: TeamMembership) -> None:
    """Remove every permission derived from a deleted membership."""
    for codename in TEAM_PERMISSIONS:
        remove_perm(f"main.{codename}", membership.user, membership.team)


@receiver(post_save, sender=TeamMembership)
def team_membership_saved(
    sender: type[TeamMembership],
    instance: TeamMembership,
    raw: bool = False,
    **kwargs: Any,
) -> None:
    """Synchronize permissions when a membership is saved."""
    if not raw:
        synchronize_team_membership_permissions(instance, manager=instance.manager)


@receiver(post_delete, sender=TeamMembership)
def team_membership_deleted(
    sender: type[TeamMembership], instance: TeamMembership, **kwargs: Any
) -> None:
    """Remove team permissions when a membership is deleted."""
    remove_team_membership_permissions(instance)


@receiver(pre_delete, sender=Team)
def team_deleted(sender: type[Team], instance: Team, **kwargs: Any) -> None:
    """Remove generic Guardian permissions before the team is deleted."""
    content_type = ContentType.objects.get_for_model(instance)
    UserObjectPermission.objects.filter(
        content_type=content_type, object_pk=str(instance.pk)
    ).delete()


@receiver(pre_delete, sender=settings.AUTH_USER_MODEL)
def prevent_deleting_last_team_manager(
    sender: type[User], instance: User, **kwargs: Any
) -> None:
    """Keep user deletion from leaving any team without a manager."""
    for membership in TeamMembership.objects.filter(user=instance, manager=True).only(
        "team_id"
    ):
        if (
            not TeamMembership.objects.filter(team_id=membership.team_id, manager=True)
            .exclude(user=instance)
            .exists()
        ):
            raise ValidationError("A team must retain at least one manager.")
