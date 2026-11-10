"""Tests for the Team related models in the main app."""

import pytest
from django.core.exceptions import ValidationError
from django.db import IntegrityError, transaction
from guardian.shortcuts import get_objects_for_user

from main.models import Team, TeamInvitation, TeamMembership

TEAM_MANAGER_PERMISSIONS = (
    "change_team",
    "delete_team",
    "view_team_member_profiles",
    "manage_team_members",
)


@pytest.mark.django_db
def test_creating_team_makes_creator_first_manager(user) -> None:
    """Team creation also creates the creator's manager membership and perms."""
    team = Team.objects.create_for_user(
        user=user, name="Creator team", description="Created by a person"
    )

    membership = TeamMembership.objects.get(user=user, team=team)
    assert membership.manager
    assert user.has_perm("main.view_team", team)
    assert user.has_perm("main.manage_team_members", team)
    assert team in get_objects_for_user(user, "main.view_team", klass=Team)


@pytest.mark.django_db
def test_accepting_invitation_creates_non_manager_membership(
    user, django_user_model
) -> None:
    """Pending invitations grant no access; acceptance grants member access."""
    invitee = django_user_model.objects.create_user(username="invitee")
    team = Team.objects.create_for_user(
        user=user, name="Invited team", description="Invitation test"
    )
    invitation = team.invite_user(invited_by=user, invitee=invitee)

    assert invitation.status == TeamInvitation.Status.PENDING
    assert not TeamMembership.objects.filter(team=team, user=invitee).exists()
    assert not invitee.has_perm("main.view_team", team)
    assert not invitee.has_perm("main.view_team_member_profiles", team)
    assert team not in get_objects_for_user(invitee, "main.view_team", klass=Team)

    invitation.accept(user=invitee)

    invitation.refresh_from_db()
    membership = TeamMembership.objects.get(team=team, user=invitee)
    assert invitation.status == TeamInvitation.Status.ACCEPTED
    assert not membership.manager
    assert invitee.has_perm("main.view_team", team)
    assert not invitee.has_perm("main.manage_team_members", team)
    assert not invitee.has_perm("main.view_team_member_profiles", team)


@pytest.mark.django_db
def test_invitation_can_be_reissued_after_decline_or_withdrawal(
    user, django_user_model
) -> None:
    """Declined and withdrawn invitations do not block later invitations."""
    invitee = django_user_model.objects.create_user(username="invitee")
    team = Team.objects.create_for_user(
        user=user, name="Re-invite team", description="Invitation test"
    )

    declined = team.invite_user(invited_by=user, invitee=invitee)
    declined.decline(user=invitee)
    assert declined.status == TeamInvitation.Status.DECLINED
    after_decline = team.invite_user(invited_by=user, invitee=invitee)

    after_decline.withdraw(user=user)
    assert after_decline.status == TeamInvitation.Status.WITHDRAWN
    after_withdrawal = team.invite_user(invited_by=user, invitee=invitee)

    assert after_withdrawal.status == TeamInvitation.Status.PENDING
    assert not TeamMembership.objects.filter(team=team, user=invitee).exists()


@pytest.mark.django_db
def test_invitation_status_cannot_be_changed_with_model_save(
    user, django_user_model
) -> None:
    """Invitation state changes must use acceptance or decline operations."""
    invitee = django_user_model.objects.create_user(username="invitee")
    team = Team.objects.create_for_user(
        user=user, name="State transition team", description="Invitation test"
    )
    invitation = team.invite_user(invited_by=user, invitee=invitee)
    invitation.status = TeamInvitation.Status.ACCEPTED

    with pytest.raises(ValidationError):
        invitation.save()

    invitation.refresh_from_db()
    assert invitation.status == TeamInvitation.Status.PENDING
    assert not TeamMembership.objects.filter(team=team, user=invitee).exists()


@pytest.mark.django_db
def test_duplicate_or_unauthorized_team_invitations_are_rejected(
    user, django_user_model
) -> None:
    """Only managers may invite; members and pending invites cannot be repeated."""
    member = django_user_model.objects.create_user(username="member")
    invitee = django_user_model.objects.create_user(username="invitee")
    team = Team.objects.create_for_user(
        user=user, name="Invite checks", description="Invitation test"
    )
    TeamMembership.objects.create(user=member, team=team)
    pending = team.invite_user(invited_by=user, invitee=invitee)

    with pytest.raises(ValidationError):
        team.invite_user(invited_by=user, invitee=invitee)
    with pytest.raises(IntegrityError), transaction.atomic():
        TeamInvitation.objects.create(team=team, invitee=invitee, invited_by=user)
    with pytest.raises(IntegrityError), transaction.atomic():
        TeamInvitation.objects.bulk_create(
            [TeamInvitation(team=team, invitee=invitee, invited_by=user)]
        )
    with pytest.raises(IntegrityError), transaction.atomic():
        TeamInvitation.objects.create(
            team=team,
            invitee=invitee,
            invited_by=user,
            status="unknown",
        )
    with pytest.raises(ValidationError):
        team.invite_user(invited_by=member, invitee=invitee)
    with pytest.raises(ValidationError):
        team.invite_user(invited_by=user, invitee=member)
    with pytest.raises(ValidationError):
        pending.withdraw(user=member)
    with pytest.raises(ValidationError):
        pending.accept(user=member)

    pending.decline(user=invitee)
    with pytest.raises(ValidationError):
        pending.withdraw(user=user)


@pytest.mark.django_db
def test_manager_can_promote_demote_and_remove_member(user, django_user_model) -> None:
    """Role changes update permissions and removal revokes team access."""
    member = django_user_model.objects.create_user(username="member")
    team = Team.objects.create_for_user(
        user=user, name="Membership team", description="Membership test"
    )
    TeamMembership.objects.create(user=member, team=team)

    team.change_member_role(actor=user, member=member, is_manager=True)
    member.refresh_from_db()
    assert member.has_perm("main.manage_team_members", team)

    team.change_member_role(actor=user, member=member, is_manager=False)
    member.refresh_from_db()
    assert member.has_perm("main.view_team", team)
    assert not member.has_perm("main.manage_team_members", team)

    team.remove_member(actor=user, member=member)
    member.refresh_from_db()
    assert not TeamMembership.objects.filter(team=team, user=member).exists()
    assert not member.has_perm("main.view_team", team)
    assert team not in get_objects_for_user(member, "main.view_team", klass=Team)


@pytest.mark.django_db
def test_member_can_leave_and_lose_team_access(user, django_user_model) -> None:
    """Leaving ends membership and the team's access to that member's profile."""
    member = django_user_model.objects.create_user(username="leaving-member")
    team = Team.objects.create_for_user(
        user=user, name="Leaving team", description="Membership test"
    )
    TeamMembership.objects.create(user=member, team=team)

    team.leave(user=member)

    member.refresh_from_db()
    assert not TeamMembership.objects.filter(team=team, user=member).exists()
    assert not member.has_perm("main.view_team", team)
    assert team not in get_objects_for_user(member, "main.view_team", klass=Team)
    assert user.has_perm("main.manage_team_members", team)


@pytest.mark.django_db
def test_team_manager_can_leave_when_another_manager_remains(
    user, django_user_model
) -> None:
    """A manager may leave when another manager retains team administration."""
    other_manager = django_user_model.objects.create_user(username="other-manager")
    team = Team.objects.create_for_user(
        user=user, name="Manager departure", description="Membership test"
    )
    TeamMembership.objects.create(user=other_manager, team=team, manager=True)

    team.leave(user=user)

    user.refresh_from_db()
    other_manager.refresh_from_db()
    assert not TeamMembership.objects.filter(team=team, user=user).exists()
    assert not user.has_perm("main.view_team", team)
    assert other_manager.has_perm("main.manage_team_members", team)


@pytest.mark.django_db
def test_last_manager_cannot_be_demoted_removed_or_leave(
    user, django_user_model
) -> None:
    """Team membership operations preserve at least one team manager."""
    team = Team.objects.create_for_user(
        user=user, name="Last manager team", description="Membership test"
    )
    membership = TeamMembership.objects.get(team=team, user=user)

    with pytest.raises(ValidationError):
        team.change_member_role(actor=user, member=user, is_manager=False)
    with pytest.raises(ValidationError):
        team.remove_member(actor=user, member=user)
    with pytest.raises(ValidationError):
        team.leave(user=user)

    membership.manager = False
    with pytest.raises(ValidationError):
        membership.save()
    with pytest.raises(ValidationError):
        membership.delete()

    membership.refresh_from_db()
    assert membership.manager
    assert user.has_perm("main.manage_team_members", team)


@pytest.mark.django_db
def test_team_membership_unique(user) -> None:
    """Test the TeamMemberhip model is unique for combo of team and member."""
    team = Team.objects.create_for_user(
        user=user, name="Team 1", description="The first team"
    )
    team_membership = TeamMembership.objects.get(user=user, team=team)

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
    manager = django_user_model.objects.create_user(username="manager")
    team = Team.objects.create_for_user(
        user=manager, name="Team 2", description="The second team"
    )
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
    for permission in TEAM_MANAGER_PERMISSIONS:
        assert team in get_objects_for_user(user, f"main.{permission}", klass=Team)

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
    other_manager = user_model.objects.create_user(username="other-manager")
    TeamMembership.objects.create(user=other_manager, team=team, manager=True)
    user.delete()

    recreated_user = user_model.objects.create_user(username=username)
    assert not recreated_user.has_perm("main.view_team", team)
    assert not recreated_user.has_perm("main.manage_team_members", team)
    assert team not in get_objects_for_user(
        recreated_user, "main.view_team", klass=Team
    )


@pytest.mark.django_db
def test_last_manager_user_cannot_be_deleted(user) -> None:
    """Deleting a sole team manager cannot leave the team unmanageable."""
    team = Team.objects.create_for_user(
        user=user, name="Protected user", description="Manager invariant test"
    )

    with pytest.raises(ValidationError), transaction.atomic():
        user.delete()

    user.refresh_from_db()
    assert TeamMembership.objects.filter(team=team, user=user, manager=True).exists()
    assert user.has_perm("main.manage_team_members", team)


@pytest.mark.django_db
def test_admin_explains_why_last_manager_user_cannot_be_deleted(
    admin_client, user
) -> None:
    """The user admin presents the manager invariant instead of a server error."""
    Team.objects.create_for_user(
        user=user, name="Protected admin user", description="Manager invariant test"
    )

    response = admin_client.get(f"/admin/main/user/{user.pk}/delete/")

    assert response.status_code == 200
    assert b"Protected admin user must retain at least one manager" in response.content


@pytest.mark.django_db
def test_admin_membership_role_change_synchronizes_permissions(
    admin_client, user, django_user_model
) -> None:
    """Changing a membership role in the admin updates team permissions."""
    manager = django_user_model.objects.create_user(username="admin-team-manager")
    team = Team.objects.create_for_user(
        user=manager, name="Admin team", description="Admin test team"
    )
    membership = TeamMembership.objects.create(user=user, team=team)
    manager_membership = TeamMembership.objects.get(user=manager, team=team)

    response = admin_client.post(
        f"/admin/main/team/{team.pk}/change/",
        {
            "name": team.name,
            "description": team.description,
            "slug": team.slug,
            "members-TOTAL_FORMS": "2",
            "members-INITIAL_FORMS": "2",
            "members-MIN_NUM_FORMS": "0",
            "members-MAX_NUM_FORMS": "1000",
            "members-0-id": str(membership.pk),
            "members-0-user": str(user.pk),
            "members-0-manager": "on",
            "members-1-id": str(manager_membership.pk),
            "members-1-user": str(manager.pk),
            "members-1-manager": "on",
        },
    )

    assert response.status_code == 302
    user.refresh_from_db()
    assert user.has_perm("main.change_team", team)
    assert user.has_perm("main.manage_team_members", team)


@pytest.mark.django_db
def test_admin_can_replace_a_team_manager(
    admin_client, user, django_user_model
) -> None:
    """Admin promotes the replacement before demoting the current manager."""
    member = django_user_model.objects.create_user(username="replacement-manager")
    team = Team.objects.create_for_user(
        user=user, name="Manager handover", description="Admin test team"
    )
    manager_membership = TeamMembership.objects.get(team=team, user=user)
    member_membership = TeamMembership.objects.create(user=member, team=team)

    response = admin_client.post(
        f"/admin/main/team/{team.pk}/change/",
        {
            "name": team.name,
            "description": team.description,
            "slug": team.slug,
            "members-TOTAL_FORMS": "2",
            "members-INITIAL_FORMS": "2",
            "members-MIN_NUM_FORMS": "0",
            "members-MAX_NUM_FORMS": "1000",
            "members-0-id": str(manager_membership.pk),
            "members-0-user": str(user.pk),
            "members-1-id": str(member_membership.pk),
            "members-1-user": str(member.pk),
            "members-1-manager": "on",
        },
    )

    assert response.status_code == 302
    manager_membership.refresh_from_db()
    member_membership.refresh_from_db()
    assert not manager_membership.manager
    assert member_membership.manager
    user.refresh_from_db()
    member.refresh_from_db()
    assert not user.has_perm("main.manage_team_members", team)
    assert member.has_perm("main.manage_team_members", team)


@pytest.mark.django_db
def test_admin_membership_user_change_resynchronizes_permissions(
    admin_client, user, django_user_model
) -> None:
    """Reassigning an inline membership revokes the former member's access."""
    former_member = django_user_model.objects.create_user(username="former-member")
    new_member = django_user_model.objects.create_user(username="new-member")
    team = Team.objects.create_for_user(
        user=user, name="Member reassignment", description="Admin permissions test"
    )
    manager_membership = TeamMembership.objects.get(team=team, user=user)
    membership = TeamMembership.objects.create(user=former_member, team=team)

    response = admin_client.post(
        f"/admin/main/team/{team.pk}/change/",
        {
            "name": team.name,
            "description": team.description,
            "slug": team.slug,
            "members-TOTAL_FORMS": "2",
            "members-INITIAL_FORMS": "2",
            "members-MIN_NUM_FORMS": "0",
            "members-MAX_NUM_FORMS": "1000",
            "members-0-id": str(manager_membership.pk),
            "members-0-user": str(user.pk),
            "members-0-manager": "on",
            "members-1-id": str(membership.pk),
            "members-1-user": str(new_member.pk),
        },
    )

    assert response.status_code == 302
    former_member.refresh_from_db()
    new_member.refresh_from_db()
    assert not former_member.has_perm("main.view_team", team)
    assert new_member.has_perm("main.view_team", team)


@pytest.mark.parametrize("change", ["demote", "delete"])
@pytest.mark.django_db
def test_admin_cannot_remove_last_manager(admin_client, user, change) -> None:
    """The admin membership formset prevents a team from losing its manager."""
    team = Team.objects.create_for_user(
        user=user, name="Protected team", description="Admin invariant test"
    )
    membership = TeamMembership.objects.get(team=team, user=user)
    data = {
        "name": team.name,
        "description": team.description,
        "slug": team.slug,
        "members-TOTAL_FORMS": "1",
        "members-INITIAL_FORMS": "1",
        "members-MIN_NUM_FORMS": "0",
        "members-MAX_NUM_FORMS": "1000",
        "members-0-id": str(membership.pk),
        "members-0-user": str(user.pk),
    }
    if change == "delete":
        data["members-0-DELETE"] = "on"
    else:
        data["members-0-manager"] = ""

    response = admin_client.post(f"/admin/main/team/{team.pk}/change/", data)

    assert response.status_code == 200
    membership.refresh_from_db()
    assert membership.manager
    user.refresh_from_db()
    assert user.has_perm("main.manage_team_members", team)
