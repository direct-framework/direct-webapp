"""Tests for the Team related models in the main app."""

import pytest
from django.core.exceptions import ValidationError
from guardian.shortcuts import get_objects_for_user

from main.models import Team, TeamMembership

TEAM_MANAGER_PERMISSIONS = (
    "change_team",
    "delete_team",
    "view_team_member_profiles",
    "manage_team_members",
)


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


@pytest.mark.django_db
def test_membership_permissions_follow_manager_role(user, django_user_model) -> None:
    """Membership saves and deletes synchronize permissions visible via Django."""
    team = Team.objects.create(name="Team 2", description="The second team")
    other_user = django_user_model.objects.create_user(username="other")
    membership = TeamMembership.objects.create(user=user, team=team)

    assert user.has_perm("main.view_team", team)
    assert not any(
        user.has_perm(f"main.{perm}", team) for perm in TEAM_MANAGER_PERMISSIONS
    )
    assert not other_user.has_perm("main.view_team", team)
    assert team in get_objects_for_user(user, "main.view_team", klass=Team)

    membership.manager = True
    membership.save()
    user = type(user).objects.get(pk=user.pk)
    assert all(user.has_perm(f"main.{perm}", team) for perm in TEAM_MANAGER_PERMISSIONS)
    assert team in get_objects_for_user(
        user, "main.view_team_member_profiles", klass=Team
    )

    membership.manager = False
    membership.save()
    user = type(user).objects.get(pk=user.pk)
    assert user.has_perm("main.view_team", team)
    assert not any(
        user.has_perm(f"main.{perm}", team) for perm in TEAM_MANAGER_PERMISSIONS
    )

    membership.delete()
    user = type(user).objects.get(pk=user.pk)
    assert not user.has_perm("main.view_team", team)
    assert team not in get_objects_for_user(user, "main.view_team", klass=Team)


@pytest.mark.django_db
def test_team_deletion_does_not_grant_permissions_to_later_team(user) -> None:
    """Deleting a team removes its permissions from future teams."""
    team = Team.objects.create(name="Team 3", description="The third team")
    TeamMembership.objects.create(user=user, team=team, manager=True)
    team.delete()

    later_team = Team.objects.create(name="Team 3 again", description="A new team")
    assert not user.has_perm("main.view_team", later_team)
    assert not user.has_perm("main.manage_team_members", later_team)


@pytest.mark.django_db
def test_user_deletion_does_not_grant_permissions_to_recreated_user(user) -> None:
    """Deleting a user removes their team permissions."""
    team = Team.objects.create(name="Team 4", description="The fourth team")
    user_model = type(user)
    username = user.username
    TeamMembership.objects.create(user=user, team=team, manager=True)
    user.delete()

    recreated_user = user_model.objects.create_user(username=username)
    assert not recreated_user.has_perm("main.view_team", team)
    assert not recreated_user.has_perm("main.manage_team_members", team)
    assert team not in get_objects_for_user(
        recreated_user, "main.view_team", klass=Team
    )
