"""Tests for team invitation-link views."""

from http import HTTPStatus
from urllib.parse import parse_qs, urlparse

import pytest
from django.urls import reverse

from main.models import Team, TeamMembership


@pytest.mark.django_db
def test_manager_generates_link_and_acceptance_requires_post(
    client, django_user_model, user
) -> None:
    """Managers can share a link; membership is created only on explicit accept."""
    invitee = django_user_model.objects.create_user(username="invitee")
    team = Team.objects.create_for_user(
        user=user, name="Shared team", description="Invitation flow"
    )
    link_url = reverse("team-invitation-link", kwargs={"team_id": team.pk})
    client.force_login(user)

    response = client.get(link_url)

    assert response.status_code == HTTPStatus.OK
    assert response.context["team"] == team
    assert not TeamMembership.objects.filter(team=team, user=invitee).exists()

    response = client.post(link_url)

    assert response.status_code == HTTPStatus.OK
    invitation_url = response.context["invitation_url"]
    assert invitation_url.startswith("http://testserver")
    assert "expires" in response.content.decode().lower()
    assert not TeamMembership.objects.filter(team=team, user=invitee).exists()

    client.force_login(invitee)
    response = client.get(invitation_url)

    assert response.status_code == HTTPStatus.OK
    assert response.context["team"] == team
    assert not TeamMembership.objects.filter(team=team, user=invitee).exists()

    response = client.post(invitation_url)

    assert response.status_code == HTTPStatus.OK
    assert response.context["already_member"] is False
    membership = TeamMembership.objects.get(team=team, user=invitee)
    assert not membership.manager
    assert invitee.has_perm("main.view_team", team)


@pytest.mark.django_db
def test_invitation_link_generator_requires_team_manager(
    client, django_user_model, user
) -> None:
    """Only managers may open or submit the team-link generator."""
    member = django_user_model.objects.create_user(username="member")
    team = Team.objects.create_for_user(
        user=user, name="Managed team", description="Invitation flow"
    )
    TeamMembership.objects.create(user=member, team=team)
    link_url = reverse("team-invitation-link", kwargs={"team_id": team.pk})

    response = client.get(link_url)
    assert response.status_code == HTTPStatus.FOUND
    assert response.url == f"{reverse('login')}?next={link_url}"

    client.force_login(member)
    assert client.get(link_url).status_code == HTTPStatus.NOT_FOUND
    assert client.post(link_url).status_code == HTTPStatus.NOT_FOUND


@pytest.mark.django_db
def test_invitation_link_acceptance_is_login_required(
    client, django_user_model, user
) -> None:
    """Anonymous visitors must sign in before accepting a team invitation."""
    team = Team.objects.create_for_user(
        user=user, name="Login required", description="Invitation flow"
    )
    token = team.generate_invitation_token(invited_by=user)
    invitation_url = reverse("team-invitation-accept", kwargs={"token": token})

    response = client.get(invitation_url)

    assert response.status_code == HTTPStatus.FOUND
    redirect_query = parse_qs(urlparse(response.url).query)
    assert redirect_query["next"] == [invitation_url]


@pytest.mark.django_db
def test_accepting_link_as_existing_member_is_reported_as_noop(
    client, user, django_user_model
) -> None:
    """Repeated acceptance reports existing membership without duplicating it."""
    team = Team.objects.create_for_user(
        user=user, name="Existing member", description="Invitation flow"
    )
    token = team.generate_invitation_token(invited_by=user)
    invitation_url = reverse("team-invitation-accept", kwargs={"token": token})
    client.force_login(user)

    response = client.post(invitation_url)

    assert response.status_code == HTTPStatus.OK
    assert response.context["already_member"] is True
    assert TeamMembership.objects.filter(team=team, user=user).count() == 1
