"""Tests for the signals."""

import pytest
from django.core.exceptions import ValidationError
from django.db import transaction
from guardian.shortcuts import get_objects_for_user

from main.models import Profile, Team, TeamMembership
from main.signals import MANAGER_PERMISSIONS
from main.team_services import create_team


@pytest.mark.django_db
def test_creating_a_user_creates_their_profile(django_user_model) -> None:
    """Test that a newly created user has exactly one profile."""
    user = django_user_model.objects.create_user(username="new-user")

    assert Profile.objects.filter(user=user).count() == 1
    assert user.profile.user == user


@pytest.mark.django_db
def test_creating_a_superuser_creates_their_profile(django_user_model) -> None:
    """Test that a newly created superuser has exactly one profile."""
    user = django_user_model.objects.create_superuser(
        username="new-admin", email="admin@example.com", password="password"
    )

    assert Profile.objects.filter(user=user).count() == 1


@pytest.mark.django_db
def test_saving_an_existing_user_keeps_their_profile(user) -> None:
    """Test that saving an existing user does not create another profile."""
    profile = user.profile

    user.first_name = "Updated"
    user.save()

    assert list(Profile.objects.filter(user=user)) == [profile]


@pytest.mark.django_db
def test_membership_permissions_follow_manager_role(user, django_user_model) -> None:
    """Membership saves and deletes synchronize permissions visible via Django."""
    manager = django_user_model.objects.create_user(username="manager")
    team = create_team(user=manager, name="Team 2", description="The second team")
    membership = TeamMembership.objects.create(user=user, team=team)

    assert user.has_perm("main.view_team", team)
    assert not any(
        user.has_perm(f"main.{permission}", team) for permission in MANAGER_PERMISSIONS
    )
    assert team in get_objects_for_user(user, "main.view_team", klass=Team)

    membership.manager = True
    membership.save()
    user = type(user).objects.get(pk=user.pk)
    assert all(
        user.has_perm(f"main.{permission}", team) for permission in MANAGER_PERMISSIONS
    )

    membership.manager = False
    membership.save()
    user = type(user).objects.get(pk=user.pk)
    assert user.has_perm("main.view_team", team)
    assert not any(
        user.has_perm(f"main.{permission}", team) for permission in MANAGER_PERMISSIONS
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
