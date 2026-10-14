"""Tests for the Team related models in the main app."""

import pytest
from django.core.exceptions import ValidationError

from main.models import Team, TeamMembership


@pytest.mark.django_db
def test_team_membership_unique(user) -> None:
    """Test the TeamMemberhip model is unique for combo of team and member."""
    team = Team.objects.create(name="Team 1", description="The first team")
    team_membership = TeamMembership.objects.create(user=user, team=team, manager=True)

    assert team.slug == "team-1"
    assert team_membership.user == user
    assert team_membership.team == team
    assert team_membership.manager

    new_team_membership = TeamMembership(user=user, team=team)
    with pytest.raises(
        ValidationError,
        match=r"Team membership with this User and Team already exists.",
    ):
        new_team_membership.full_clean()
