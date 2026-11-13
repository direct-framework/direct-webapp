"""Tests for the Team and TeamMembership models."""

import pytest
from django.core.exceptions import ValidationError

from main.models import Team, TeamMembership
from main.team_services import create_team


@pytest.mark.django_db
def test_team_membership_unique(user) -> None:
    """A team has at most one membership for each person."""
    team = create_team(user=user, name="Team 1", description="The first team")
    membership = TeamMembership.objects.get(user=user, team=team)

    assert team.slug == "team-1"
    assert membership.user == user
    assert membership.team == team
    assert membership.manager

    duplicate = TeamMembership(user=user, team=team)
    with pytest.raises(
        ValidationError,
        match=r"Team membership with this User and Team already exists.",
    ):
        duplicate.full_clean()


@pytest.mark.parametrize("identity_field", ["user", "team"])
@pytest.mark.django_db
def test_team_membership_identity_cannot_change(
    user, django_user_model, identity_field
) -> None:
    """An existing membership cannot change its team or team member."""
    team = create_team(
        user=user, name="Immutable membership", description="Membership test"
    )
    membership = TeamMembership.objects.get(user=user, team=team)
    other_user = django_user_model.objects.create_user(username="other-member")
    other_team = Team.objects.create(name="Other team", description="Membership test")

    setattr(
        membership,
        identity_field,
        other_user if identity_field == "user" else other_team,
    )
    with pytest.raises(
        ValidationError,
        match="Change a member's user or team by removing the existing membership",
    ):
        membership.save()

    membership.refresh_from_db()
    assert membership.user == user
    assert membership.team == team


@pytest.mark.django_db
def test_membership_model_preserves_at_least_one_manager(user) -> None:
    """A team cannot lose its final manager through a membership save or delete."""
    team = create_team(user=user, name="Last manager", description="Model invariant")
    membership = TeamMembership.objects.get(team=team, user=user)
    membership.manager = False

    with pytest.raises(ValidationError):
        membership.save()
    with pytest.raises(ValidationError):
        membership.delete()

    membership.refresh_from_db()
    assert membership.manager
