"""Tests for the Team and TeamMembership models."""

import pytest
from django.core.exceptions import ValidationError
from django.db import transaction
from guardian.shortcuts import get_objects_for_user

from main.models import Team, TeamMembership
from main.team_services import create_team

TEAM_MANAGER_PERMISSIONS = (
    "change_team",
    "delete_team",
    "view_team_member_profiles",
    "manage_team_members",
)


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


@pytest.mark.django_db
def test_membership_permissions_follow_manager_role(user, django_user_model) -> None:
    """Membership saves and deletes synchronize permissions visible via Django."""
    manager = django_user_model.objects.create_user(username="manager")
    team = create_team(user=manager, name="Team 2", description="The second team")
    membership = TeamMembership.objects.create(user=user, team=team)

    assert user.has_perm("main.view_team", team)
    assert not any(
        user.has_perm(f"main.{permission}", team)
        for permission in TEAM_MANAGER_PERMISSIONS
    )
    assert team in get_objects_for_user(user, "main.view_team", klass=Team)

    membership.manager = True
    membership.save()
    user = type(user).objects.get(pk=user.pk)
    assert all(
        user.has_perm(f"main.{permission}", team)
        for permission in TEAM_MANAGER_PERMISSIONS
    )

    membership.manager = False
    membership.save()
    user = type(user).objects.get(pk=user.pk)
    assert user.has_perm("main.view_team", team)
    assert not any(
        user.has_perm(f"main.{permission}", team)
        for permission in TEAM_MANAGER_PERMISSIONS
    )

    membership.delete()
    user = type(user).objects.get(pk=user.pk)
    assert not user.has_perm("main.view_team", team)
    assert team not in get_objects_for_user(user, "main.view_team", klass=Team)


@pytest.mark.django_db
def test_team_deletion_does_not_grant_permissions_to_later_team(user) -> None:
    """Deleting a team removes its permissions from future teams."""
    team = create_team(user=user, name="Team 3", description="The third team")
    team.delete()

    later_team = Team.objects.create(name="Team 3 again", description="A new team")
    assert not user.has_perm("main.view_team", later_team)
    assert not user.has_perm("main.manage_team_members", later_team)


@pytest.mark.django_db
def test_user_deletion_does_not_grant_permissions_to_recreated_user(
    user, django_user_model
) -> None:
    """Deleting a user removes their team permissions."""
    team = Team.objects.create(name="Team 4", description="The fourth team")
    TeamMembership.objects.create(user=user, team=team, manager=True)
    other_manager = django_user_model.objects.create_user(username="other-manager")
    TeamMembership.objects.create(user=other_manager, team=team, manager=True)
    username = user.username
    user.delete()

    recreated_user = django_user_model.objects.create_user(username=username)
    assert not recreated_user.has_perm("main.view_team", team)
    assert not recreated_user.has_perm("main.manage_team_members", team)
    assert team not in get_objects_for_user(
        recreated_user, "main.view_team", klass=Team
    )


@pytest.mark.django_db
def test_last_manager_user_cannot_be_deleted(user) -> None:
    """Deleting a sole team manager cannot leave the team unmanageable."""
    team = create_team(
        user=user, name="Protected user", description="Manager invariant test"
    )

    with pytest.raises(ValidationError), transaction.atomic():
        user.delete()

    user.refresh_from_db()
    assert TeamMembership.objects.filter(team=team, user=user, manager=True).exists()
    assert user.has_perm("main.manage_team_members", team)
