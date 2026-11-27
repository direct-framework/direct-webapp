"""Services for team creation and membership lifecycle operations."""

from __future__ import annotations

from django.contrib.auth import get_user_model
from django.core import signing
from django.core.exceptions import ValidationError
from django.db import transaction
from django.db.models import Count, Sum

from .models.team_models import Team, TeamMembership
from .models.user_models import SkillProfile, User

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


def _get_invitation_team_and_manager(
    token: str, *, lock_team: bool = False
) -> tuple[Team, User]:
    """Return the team and generating manager for a valid invitation link."""
    team_id, invited_by_id = _decode_team_invitation_token(token)
    user_model = get_user_model()
    try:
        teams = Team.objects.select_for_update() if lock_team else Team.objects
        team = teams.get(pk=team_id)
        invited_by = user_model.objects.get(pk=invited_by_id)
    except (Team.DoesNotExist, user_model.DoesNotExist) as exc:
        raise ValidationError(INVALID_TEAM_INVITATION_LINK) from exc
    if not invited_by.has_perm("main.manage_team_members", team):
        raise ValidationError(INVALID_TEAM_INVITATION_LINK)
    return team, invited_by


@transaction.atomic
def create_team(*, user: User, name: str, description: str) -> Team:
    """Create a team with its creator's first membership as team manager."""
    team = Team.objects.create(name=name, description=description)
    TeamMembership.objects.create(user=user, team=team, manager=True)
    return team


def aggregate_team_skill_profile(*, team: Team) -> list[dict[str, str | int]]:
    """Return each assessed skill's average level across the current team.

    A selected level 0 counts, while members who have not assessed a skill are
    left out. Averages are rounded to whole levels, with halves rounded up,
    because the competency wheel can only show whole levels. Rows use the same
    keys as a personal competency wheel, in framework order.
    """
    domain = "skill__competency__competency_domain"
    rows = (
        SkillProfile.objects.filter(profile__user__teams__team=team)
        .values(
            "skill",
            "skill__name",
            "skill__competency__name",
            f"{domain}__name",
        )
        .annotate(contributors=Count("id"), level_total=Sum("skill_level__level"))
        .order_by(
            f"{domain}__rank",
            f"{domain}__name",
            "skill__competency__rank",
            "skill__competency__name",
            "skill__rank",
            "skill__name",
        )
    )
    return [
        {
            "skill": row["skill__name"],
            "category": row[f"{domain}__name"],
            "subcategory": row["skill__competency__name"],
            # Integer form of rounding total / contributors, halves up.
            "skill_level": (2 * row["level_total"] + row["contributors"])
            // (2 * row["contributors"]),
        }
        for row in rows
    ]


@transaction.atomic
def generate_invitation_token(*, team: Team, invited_by: User) -> str:
    """Create a signed, expiring link for a current team manager."""
    current_team = Team.objects.select_for_update().get(pk=team.pk)
    user_model = get_user_model()
    try:
        current_inviter = user_model.objects.get(pk=invited_by.pk)
    except user_model.DoesNotExist as exc:
        raise ValidationError(
            "Only a team manager can generate an invitation link."
        ) from exc
    if not current_inviter.has_perm("main.manage_team_members", current_team):
        raise ValidationError("Only a team manager can generate an invitation link.")
    return signing.dumps(
        {"team_id": current_team.pk, "invited_by_id": current_inviter.pk},
        salt=TEAM_INVITATION_LINK_SALT,
    )


def resolve_invitation_token(*, token: str) -> Team:
    """Return the team for a valid link whose generating manager is current."""
    team, _ = _get_invitation_team_and_manager(token)
    return team


@transaction.atomic
def accept_invitation(*, token: str, team_slug: str, user: User) -> tuple[Team, bool]:
    """Accept a valid link for its current team slug and add regular membership."""
    team, _ = _get_invitation_team_and_manager(token, lock_team=True)
    if team.slug != team_slug:
        raise ValidationError(INVALID_TEAM_INVITATION_LINK)

    _, created = TeamMembership.objects.get_or_create(
        team=team,
        user=user,
        defaults={"manager": False},
    )
    return team, created


@transaction.atomic
def change_member_role(
    *, team: Team, actor: User, member: User, is_manager: bool
) -> TeamMembership:
    """Promote or demote a team member when called by a team manager."""
    current_team = Team.objects.select_for_update().get(pk=team.pk)
    _require_manager(actor, current_team)
    membership = TeamMembership.objects.select_for_update().get(
        team=current_team, user=member
    )
    membership.manager = is_manager
    membership.save()
    return membership


@transaction.atomic
def remove_member(*, team: Team, actor: User, member: User) -> None:
    """Remove a team member when called by a team manager."""
    current_team = Team.objects.select_for_update().get(pk=team.pk)
    _require_manager(actor, current_team)
    membership = TeamMembership.objects.select_for_update().get(
        team=current_team, user=member
    )
    membership.delete()


@transaction.atomic
def leave_team(*, team: Team, user: User) -> None:
    """End a team member's membership."""
    current_team = Team.objects.select_for_update().get(pk=team.pk)
    membership = TeamMembership.objects.select_for_update().get(
        team=current_team, user=user
    )
    membership.delete()


def _require_manager(user: User, team: Team) -> None:
    """Require team-management permission for an administrative operation."""
    if not user.has_perm("main.manage_team_members", team):
        raise ValidationError("Only a team manager can manage team membership.")
