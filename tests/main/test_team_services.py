"""Tests for team lifecycle service functions."""

from types import SimpleNamespace

import pytest
from django.core import signing
from django.core.exceptions import ValidationError

from main.models import TeamMembership
from main.team_services import (
    accept_invitation,
    change_member_role,
    create_team,
    generate_invitation_token,
    leave_team,
    remove_member,
    resolve_invitation_token,
)


@pytest.mark.django_db
def test_create_team_makes_creator_first_manager(user) -> None:
    """Team creation also creates its creator's manager membership."""
    team = create_team(user=user, name="Creator team", description="Created by a user")

    membership = TeamMembership.objects.get(user=user, team=team)
    assert membership.manager
    assert user.has_perm("main.manage_team_members", team)


@pytest.mark.django_db
def test_manager_can_generate_and_resolve_invitation_link(user) -> None:
    """A current manager can create a signed link that resolves to its team."""
    team = create_team(user=user, name="Invited team", description="Invitation test")

    token = generate_invitation_token(team=team, invited_by=user)

    assert resolve_invitation_token(token=token) == team


@pytest.mark.django_db
def test_only_team_managers_can_generate_invitation_links(
    user, django_user_model
) -> None:
    """A regular member cannot create a team-wide invitation link."""
    member = django_user_model.objects.create_user(username="member")
    team = create_team(user=user, name="Invite checks", description="Invitation test")
    TeamMembership.objects.create(user=member, team=team)

    with pytest.raises(ValidationError):
        generate_invitation_token(team=team, invited_by=member)


@pytest.mark.django_db
def test_accepting_valid_link_creates_regular_membership(
    user, django_user_model
) -> None:
    """A signed link creates regular membership for its accepting user."""
    invitee = django_user_model.objects.create_user(username="invitee")
    team = create_team(user=user, name="Shared team", description="Invitation test")
    token = generate_invitation_token(team=team, invited_by=user)

    accepted_team, created = accept_invitation(
        token=token, team_slug=team.slug, user=invitee
    )

    membership = TeamMembership.objects.get(team=team, user=invitee)
    assert accepted_team == team
    assert created
    assert not membership.manager
    assert invitee.has_perm("main.view_team", team)
    assert not invitee.has_perm("main.manage_team_members", team)


@pytest.mark.django_db
def test_invitation_link_can_be_accepted_by_multiple_accounts(
    user, django_user_model
) -> None:
    """A team-wide link can add multiple users before it expires."""
    first = django_user_model.objects.create_user(username="first-invitee")
    second = django_user_model.objects.create_user(username="second-invitee")
    team = create_team(user=user, name="Multi-use link", description="Invitation test")
    token = generate_invitation_token(team=team, invited_by=user)

    assert accept_invitation(token=token, team_slug=team.slug, user=first) == (
        team,
        True,
    )
    assert accept_invitation(token=token, team_slug=team.slug, user=second) == (
        team,
        True,
    )


@pytest.mark.django_db
def test_accepting_link_as_existing_member_does_not_duplicate_membership(user) -> None:
    """Accepting a link as a current member is a harmless no-op."""
    team = create_team(user=user, name="Existing member", description="Invitation test")
    token = generate_invitation_token(team=team, invited_by=user)

    assert accept_invitation(token=token, team_slug=team.slug, user=user) == (
        team,
        False,
    )
    assert TeamMembership.objects.filter(team=team, user=user).count() == 1


@pytest.mark.django_db
def test_invitation_link_cannot_be_accepted_with_a_different_slug(
    user, django_user_model
) -> None:
    """Changing the team slug makes the old URL invalid."""
    invitee = django_user_model.objects.create_user(username="invitee")
    team = create_team(user=user, name="Renamed team", description="Invitation test")
    token = generate_invitation_token(team=team, invited_by=user)
    team.slug = "new-team-slug"
    team.save()

    with pytest.raises(ValidationError):
        accept_invitation(token=token, team_slug="renamed-team", user=invitee)

    assert not TeamMembership.objects.filter(team=team, user=invitee).exists()


@pytest.mark.django_db
def test_invitation_link_works_if_team_slug_is_restored(
    user, django_user_model
) -> None:
    """A stateless invitation works again if its slug returns before expiry."""
    invitee = django_user_model.objects.create_user(username="invitee")
    team = create_team(user=user, name="Restored slug", description="Invitation test")
    token = generate_invitation_token(team=team, invited_by=user)
    original_slug = team.slug

    team.slug = "temporary-slug"
    team.save()
    team.slug = original_slug
    team.save()

    assert accept_invitation(token=token, team_slug=original_slug, user=invitee) == (
        team,
        True,
    )


@pytest.mark.django_db
def test_invitation_link_requires_its_generating_manager_to_remain_a_manager(
    user, django_user_model
) -> None:
    """A link is invalid if its generating manager is no longer a manager."""
    other_manager = django_user_model.objects.create_user(username="other-manager")
    invitee = django_user_model.objects.create_user(username="invitee")
    team = create_team(user=user, name="Manager changed", description="Invitation test")
    TeamMembership.objects.create(user=other_manager, team=team, manager=True)
    token = generate_invitation_token(team=team, invited_by=user)
    change_member_role(team=team, actor=user, member=user, is_manager=False)

    with pytest.raises(ValidationError):
        accept_invitation(token=token, team_slug=team.slug, user=invitee)

    assert not TeamMembership.objects.filter(team=team, user=invitee).exists()


@pytest.mark.django_db
def test_tampered_invitation_link_is_rejected(user, django_user_model) -> None:
    """Changing signed invitation-link data invalidates the token."""
    invitee = django_user_model.objects.create_user(username="invitee")
    team = create_team(user=user, name="Tampered link", description="Invitation test")
    token = generate_invitation_token(team=team, invited_by=user)

    with pytest.raises(ValidationError):
        accept_invitation(token=f"{token}x", team_slug=team.slug, user=invitee)

    assert not TeamMembership.objects.filter(team=team, user=invitee).exists()


@pytest.mark.django_db
def test_invitation_link_expires_after_24_hours(
    user, django_user_model, monkeypatch
) -> None:
    """A signed invitation link cannot be used after 24 hours."""
    invitee = django_user_model.objects.create_user(username="invitee")
    team = create_team(user=user, name="Expired link", description="Invitation test")
    clock = [1_000]
    monkeypatch.setattr(signing, "time", SimpleNamespace(time=lambda: clock[0]))
    token = generate_invitation_token(team=team, invited_by=user)
    clock[0] += 24 * 60 * 60 + 1

    with pytest.raises(ValidationError):
        accept_invitation(token=token, team_slug=team.slug, user=invitee)

    assert not TeamMembership.objects.filter(team=team, user=invitee).exists()


@pytest.mark.django_db
def test_manager_can_change_member_role_and_remove_member(
    user, django_user_model
) -> None:
    """Managers can update member roles and remove members."""
    member = django_user_model.objects.create_user(username="member")
    team = create_team(user=user, name="Membership team", description="Membership test")
    TeamMembership.objects.create(user=member, team=team)

    change_member_role(team=team, actor=user, member=member, is_manager=True)
    member.refresh_from_db()
    assert member.has_perm("main.manage_team_members", team)

    change_member_role(team=team, actor=user, member=member, is_manager=False)
    member.refresh_from_db()
    assert member.has_perm("main.view_team", team)
    assert not member.has_perm("main.manage_team_members", team)

    remove_member(team=team, actor=user, member=member)
    member.refresh_from_db()
    assert not TeamMembership.objects.filter(team=team, user=member).exists()
    assert not member.has_perm("main.view_team", team)


@pytest.mark.django_db
def test_non_manager_cannot_change_or_remove_a_team_member(
    user, django_user_model
) -> None:
    """Only team managers can change or remove another member."""
    member = django_user_model.objects.create_user(username="member")
    other_member = django_user_model.objects.create_user(username="other-member")
    team = create_team(user=user, name="Managed membership", description="Access test")
    TeamMembership.objects.create(user=member, team=team)
    TeamMembership.objects.create(user=other_member, team=team)

    with pytest.raises(ValidationError):
        change_member_role(
            team=team, actor=member, member=other_member, is_manager=True
        )
    with pytest.raises(ValidationError):
        remove_member(team=team, actor=member, member=other_member)

    assert TeamMembership.objects.filter(team=team, user=other_member).exists()


@pytest.mark.django_db
def test_member_can_leave_and_lose_team_access(user, django_user_model) -> None:
    """Leaving a team ends membership and its permissions."""
    member = django_user_model.objects.create_user(username="leaving-member")
    team = create_team(user=user, name="Leaving team", description="Membership test")
    TeamMembership.objects.create(user=member, team=team)

    leave_team(team=team, user=member)

    member.refresh_from_db()
    assert not TeamMembership.objects.filter(team=team, user=member).exists()
    assert not member.has_perm("main.view_team", team)


@pytest.mark.django_db
def test_last_manager_cannot_be_demoted_removed_or_leave(user) -> None:
    """Lifecycle operations cannot leave a team without a manager."""
    team = create_team(user=user, name="Last manager", description="Membership test")
    membership = TeamMembership.objects.get(team=team, user=user)

    with pytest.raises(ValidationError):
        change_member_role(team=team, actor=user, member=user, is_manager=False)
    with pytest.raises(ValidationError):
        remove_member(team=team, actor=user, member=user)
    with pytest.raises(ValidationError):
        leave_team(team=team, user=user)

    membership.refresh_from_db()
    assert membership.manager
