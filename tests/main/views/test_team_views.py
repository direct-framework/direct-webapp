"""Test suite for team views."""

from http import HTTPStatus
from urllib import parse as parseUrl

import pytest
from django.urls import reverse

from main.models import TeamMembership
from main.team_services import create_team, generate_invitation_token

from .view_utils import LoginRequiredMixin, TemplateOkMixin


@pytest.mark.django_db
class TestTeamInvitationLinkView(LoginRequiredMixin, TemplateOkMixin):
    """Test the manager's team invitation-link page."""

    _template_name = "main/team_invitation_link.html"

    @pytest.fixture(autouse=True)
    def create_team_for_view(self, user) -> None:
        """Create a team whose manager can use the invitation-link page."""
        self.team = create_team(
            user=user, name="Shared team", description="Invitation flow"
        )

    def _get_url(self, **kwargs) -> str:
        return reverse("team-invitation-link", kwargs={"team_slug": self.team.slug})

    def test_manager_generates_link_and_acceptance_requires_post(
        self, client, django_user_model, user
    ) -> None:
        """Managers can share a link; membership starts after explicit acceptance."""
        invitee = django_user_model.objects.create_user(
            username="invitee", agreed_to_tos=True
        )
        client.force_login(user)

        response = client.get(self._get_url())

        assert response.status_code == HTTPStatus.OK
        assert response.context["team"] == self.team
        assert not TeamMembership.objects.filter(team=self.team, user=invitee).exists()

        response = client.post(self._get_url())

        assert response.status_code == HTTPStatus.OK
        invitation_url = response.context["invitation_url"]
        assert invitation_url.startswith("http://testserver/teams/shared-team/")
        assert "expires" in response.content.decode().lower()
        assert not TeamMembership.objects.filter(team=self.team, user=invitee).exists()

        client.force_login(invitee)
        response = client.get(invitation_url)

        assert response.status_code == HTTPStatus.OK
        assert response.context["team"] == self.team
        assert not TeamMembership.objects.filter(team=self.team, user=invitee).exists()

        response = client.post(invitation_url)

        assert response.status_code == HTTPStatus.OK
        assert response.context["already_member"] is False
        membership = TeamMembership.objects.get(team=self.team, user=invitee)
        assert not membership.manager
        assert invitee.has_perm("main.view_team", self.team)

    def test_non_manager_cannot_open_or_submit_link_generator(
        self, client, django_user_model
    ) -> None:
        """Only managers may open or submit the team-link generator."""
        member = django_user_model.objects.create_user(
            username="regular-member", agreed_to_tos=True
        )
        TeamMembership.objects.create(user=member, team=self.team)
        client.force_login(member)

        assert client.get(self._get_url()).status_code == HTTPStatus.NOT_FOUND
        assert client.post(self._get_url()).status_code == HTTPStatus.NOT_FOUND

    def test_unknown_team_slug_returns_not_found(self, client, user) -> None:
        """A missing team slug does not expose a manager-only page."""
        client.force_login(user)
        url = reverse("team-invitation-link", kwargs={"team_slug": "no-such-team"})

        assert client.get(url).status_code == HTTPStatus.NOT_FOUND

    @pytest.mark.parametrize("method", ["get", "post"])
    def test_user_must_accept_terms_before_generating_invitation_link(
        self, client, user, method
    ) -> None:
        """Terms acceptance gates link generation for every HTTP method."""
        user.agreed_to_tos = False
        user.save(update_fields=["agreed_to_tos"])
        client.force_login(user)

        response = getattr(client, method)(self._get_url())

        assert response.status_code == HTTPStatus.FOUND
        assert response.url == reverse("terms_acceptance")
        assert TeamMembership.objects.filter(team=self.team).count() == 1


@pytest.mark.django_db
class TestTeamInvitationAcceptanceView(LoginRequiredMixin, TemplateOkMixin):
    """Test the acceptance page for team invitations."""

    _template_name = "main/team_invitation_accept.html"

    @pytest.fixture(autouse=True)
    def create_invitation_for_view(self, user) -> None:
        """Create a team-wide invitation for the acceptance-page tests."""
        self.team = create_team(
            user=user, name="Acceptance team", description="Invitation flow"
        )
        self.token = generate_invitation_token(team=self.team, invited_by=user)

    def _get_url(self, **kwargs) -> str:
        return reverse(
            "team-invitation-accept",
            kwargs={"team_slug": self.team.slug, "token": self.token},
        )

    def test_login_required(self, client) -> None:
        """A person must sign in before accepting a team invitation."""
        response = client.get(self._get_url())

        assert response.status_code == HTTPStatus.FOUND
        assert parseUrl.urlparse(response.url).path == reverse("login")
        assert parseUrl.parse_qs(parseUrl.urlparse(response.url).query)["next"] == [
            self._get_url()
        ]

    @pytest.mark.parametrize("method", ["get", "post"])
    def test_user_must_accept_terms_before_accepting_invitation(
        self, client, django_user_model, method
    ) -> None:
        """Terms acceptance gates invitation access and membership creation."""
        invitee = django_user_model.objects.create_user(
            username="terms-unaccepted-invitee", agreed_to_tos=False
        )
        client.force_login(invitee)

        response = getattr(client, method)(self._get_url())

        assert response.status_code == HTTPStatus.FOUND
        assert response.url == reverse("terms_acceptance")
        assert not TeamMembership.objects.filter(team=self.team, user=invitee).exists()

    def test_existing_member_acceptance_does_not_duplicate_membership(
        self, client, user
    ):
        """Accepting a link as a current member is a harmless no-op."""
        client.force_login(user)

        response = client.post(self._get_url())

        assert response.status_code == HTTPStatus.OK
        assert response.context["already_member"] is True
        assert TeamMembership.objects.filter(team=self.team, user=user).count() == 1

    @pytest.mark.parametrize("method", ["get", "post"])
    def test_changed_team_slug_shows_invalid_link_page(
        self, client, django_user_model, user, method
    ) -> None:
        """An invitation URL is rejected when its team slug is no longer current."""
        invitee = django_user_model.objects.create_user(
            username="slug-invitee", agreed_to_tos=True
        )
        client.force_login(invitee)
        old_url = self._get_url()
        self.team.slug = "renamed-team"
        self.team.save()

        response = getattr(client, method)(old_url)

        assert response.status_code == HTTPStatus.BAD_REQUEST
        assert response.templates[0].name == "main/team_invitation_invalid.html"
        assert not TeamMembership.objects.filter(team=self.team, user=invitee).exists()
