"""Models for the team and collaboration elements of the app."""

from __future__ import annotations

from collections.abc import Iterable
from typing import TYPE_CHECKING

from django.conf import settings
from django.contrib.auth import get_user_model
from django.core import signing
from django.core.exceptions import ValidationError
from django.db import models, transaction
from django.db.models.base import ModelBase

from .framework_models import SluggedModel

if TYPE_CHECKING:
    from .user_models import User


TEAM_INVITATION_LINK_MAX_AGE = 24 * 60 * 60
TEAM_INVITATION_LINK_SALT = "main.team_invitation"
INVALID_TEAM_INVITATION_LINK = (
    "This team invitation link is invalid or expired. "
    "Ask a current team manager to generate a new link."
)


def _decode_team_invitation_token(token: str) -> tuple[int, int]:
    """Return the team and inviter IDs from a valid, unexpired link."""
    try:
        claims = signing.loads(
            token,
            salt=TEAM_INVITATION_LINK_SALT,
            max_age=TEAM_INVITATION_LINK_MAX_AGE,
        )
    except signing.BadSignature as exc:
        raise ValidationError(INVALID_TEAM_INVITATION_LINK) from exc

    if (
        not isinstance(claims, dict)
        or set(claims) != {"team_id", "invited_by_id"}
        or type(claims["team_id"]) is not int
        or type(claims["invited_by_id"]) is not int
    ):
        raise ValidationError(INVALID_TEAM_INVITATION_LINK)
    return claims["team_id"], claims["invited_by_id"]


class TeamManager(models.Manager["Team"]):
    """Create teams with their initial team manager."""

    @transaction.atomic
    def create_for_user(self, *, user: User, name: str, description: str) -> Team:
        """Create a team and its creator's first team membership atomically."""
        team = self.create(name=name, description=description)
        TeamMembership.objects.create(user=user, team=team, manager=True)
        return team


class Team(SluggedModel):
    """Model representing a team of users working together."""

    objects = TeamManager()

    @transaction.atomic
    def generate_invitation_token(self, *, invited_by: User) -> str:
        """Create a signed, expiring team-wide link for a current manager."""
        team = Team.objects.select_for_update().get(pk=self.pk)
        user_model = get_user_model()
        try:
            current_inviter = user_model.objects.get(pk=invited_by.pk)
        except user_model.DoesNotExist as exc:
            raise ValidationError(
                "Only a team manager can generate an invitation link."
            ) from exc
        if not current_inviter.has_perm("main.manage_team_members", team):
            raise ValidationError(
                "Only a team manager can generate an invitation link."
            )
        return signing.dumps(
            {"team_id": team.pk, "invited_by_id": invited_by.pk},
            salt=TEAM_INVITATION_LINK_SALT,
        )

    @classmethod
    def resolve_invitation_token(cls, *, token: str) -> Team:
        """Return the team for a valid link whose generating manager is current."""
        team_id, invited_by_id = _decode_team_invitation_token(token)
        user_model = get_user_model()
        try:
            team = cls.objects.get(pk=team_id)
            invited_by = user_model.objects.get(pk=invited_by_id)
        except (cls.DoesNotExist, user_model.DoesNotExist) as exc:
            raise ValidationError(INVALID_TEAM_INVITATION_LINK) from exc
        if not invited_by.has_perm("main.manage_team_members", team):
            raise ValidationError(INVALID_TEAM_INVITATION_LINK)
        return team

    @classmethod
    @transaction.atomic
    def accept_invitation_token(cls, *, token: str, user: User) -> tuple[Team, bool]:
        """Accept a valid team link, creating regular membership at most once."""
        team_id, invited_by_id = _decode_team_invitation_token(token)
        user_model = get_user_model()
        try:
            team = cls.objects.select_for_update().get(pk=team_id)
            invited_by = user_model.objects.get(pk=invited_by_id)
        except (cls.DoesNotExist, user_model.DoesNotExist) as exc:
            raise ValidationError(INVALID_TEAM_INVITATION_LINK) from exc
        if not invited_by.has_perm("main.manage_team_members", team):
            raise ValidationError(INVALID_TEAM_INVITATION_LINK)

        _, created = TeamMembership.objects.get_or_create(
            team=team,
            user=user,
            defaults={"manager": False},
        )
        return team, created

    @transaction.atomic
    def change_member_role(
        self, *, actor: User, member: User, is_manager: bool
    ) -> TeamMembership:
        """Promote or demote a team member when called by a team manager."""
        Team.objects.select_for_update().get(pk=self.pk)
        self._require_manager(actor)
        membership = TeamMembership.objects.select_for_update().get(
            team=self, user=member
        )
        membership.manager = is_manager
        membership.save()
        return membership

    @transaction.atomic
    def remove_member(self, *, actor: User, member: User) -> None:
        """Remove a team member when called by a team manager."""
        Team.objects.select_for_update().get(pk=self.pk)
        self._require_manager(actor)
        membership = TeamMembership.objects.select_for_update().get(
            team=self, user=member
        )
        membership.delete()

    @transaction.atomic
    def leave(self, *, user: User) -> None:
        """End the caller's membership, unless they are the last team manager."""
        Team.objects.select_for_update().get(pk=self.pk)
        membership = TeamMembership.objects.select_for_update().get(
            team=self, user=user
        )
        membership.delete()

    def _require_manager(self, user: User) -> None:
        """Require team-management permission for an administrative operation."""
        if not user.has_perm("main.manage_team_members", self):
            raise ValidationError("Only a team manager can manage team membership.")

    class Meta:
        """Meta options for the Team model."""

        permissions = (
            ("view_team_member_profiles", "Can view team member profiles"),
            ("manage_team_members", "Can manage team members"),
        )


class TeamMembership(models.Model):
    """Map users to teams and keep their team permissions synchronized.

    Membership changes must use model save/delete operations; queryset updates
    and bulk operations bypass permission synchronization.
    """

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name="teams", on_delete=models.CASCADE
    )
    team = models.ForeignKey(Team, related_name="members", on_delete=models.CASCADE)
    manager = models.BooleanField(blank=True, default=False)

    class Meta:
        """Meta options for the TeamMembership model."""

        constraints = (
            models.UniqueConstraint(fields=["user", "team"], name="unique_user_team"),
        )

    def save(
        self,
        *,
        force_insert: bool | tuple[ModelBase, ...] = False,
        force_update: bool = False,
        using: str | None = None,
        update_fields: Iterable[str] | None = None,
    ) -> None:
        """Save membership only when its team retains at least one manager."""
        with transaction.atomic():
            Team.objects.select_for_update().get(pk=self.team_id)
            existing = None
            if self.pk is not None:
                existing = (
                    TeamMembership.objects.select_for_update()
                    .filter(pk=self.pk)
                    .first()
                )

            if existing is not None and (
                existing.user_id != self.user_id or existing.team_id != self.team_id
            ):
                raise ValidationError(
                    "Change a member's user or team by removing the existing "
                    "membership and adding a new one."
                )

            if existing is not None and existing.manager and not self.manager:
                other_managers = TeamMembership.objects.filter(
                    team_id=existing.team_id, manager=True
                ).exclude(pk=existing.pk)
                if not other_managers.exists():
                    raise ValidationError("A team must retain at least one manager.")
            elif existing is None and not self.manager:
                if not TeamMembership.objects.filter(
                    team_id=self.team_id, manager=True
                ).exists():
                    raise ValidationError("A team must have at least one manager.")

            super().save(
                force_insert=force_insert,
                force_update=force_update,
                using=using,
                update_fields=update_fields,
            )

    def delete(
        self, using: str | None = None, keep_parents: bool = False
    ) -> tuple[int, dict[str, int]]:
        """Delete membership only when its team retains at least one manager."""
        with transaction.atomic():
            Team.objects.select_for_update().get(pk=self.team_id)
            current = (
                TeamMembership.objects.select_for_update().filter(pk=self.pk).first()
            )
            if current is not None and current.manager:
                other_managers = TeamMembership.objects.filter(
                    team_id=current.team_id, manager=True
                ).exclude(pk=current.pk)
                if not other_managers.exists():
                    raise ValidationError("A team must retain at least one manager.")
            return super().delete(using=using, keep_parents=keep_parents)

    def __str__(self) -> str:
        """Return the name of the model instance."""
        return f"{self.user.username} membership of {self.team.name}"
