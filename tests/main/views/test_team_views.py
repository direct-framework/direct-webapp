"""Test suite for team views."""

import json
from http import HTTPStatus
from urllib import parse as parseUrl

import pytest
from django.urls import reverse

from main.models import SkillProfile, TeamMembership, User
from main.team_services import create_team, generate_invitation_token

from .view_utils import (
    BS4Mixin,
    LoginRequiredMixin,
    TemplateOkMixin,
    tag_with_text_filter,
)


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


@pytest.mark.django_db
class TestTeamDetailView(LoginRequiredMixin, TemplateOkMixin, BS4Mixin):
    """Test the team page shown to team members."""

    _template_name = "main/team-detail.html"

    @pytest.fixture(autouse=True)
    def create_team_for_view(self, user) -> None:
        """Create a team managed by the default user."""
        self.team = create_team(
            user=user, name="Research team", description="Team page tests"
        )

    @pytest.fixture
    def members(self, django_user_model) -> list[User]:
        """Add two regular members, who have accepted the terms, to the team."""
        members = []
        for index in range(2):
            member = django_user_model.objects.create_user(
                username=f"member-{index}", agreed_to_tos=True
            )
            TeamMembership.objects.create(user=member, team=self.team)
            members.append(member)
        return members

    def _get_url(self, **kwargs) -> str:
        return reverse("team-detail", kwargs={"team_slug": self.team.slug})

    def test_member_sees_the_team_page(self, client, members) -> None:
        """A regular member can open their team's page."""
        client.force_login(members[0])

        response = client.get(self._get_url())

        assert response.status_code == HTTPStatus.OK
        assert response.context["team"] == self.team
        assert "<h1>Research team</h1>" in response.content.decode()

    def test_non_member_and_unknown_team_are_not_found(
        self, client, django_user_model
    ) -> None:
        """People outside a team cannot tell whether it exists."""
        outsider = django_user_model.objects.create_user(
            username="outsider", agreed_to_tos=True
        )
        client.force_login(outsider)
        unknown_url = reverse("team-detail", kwargs={"team_slug": "no-such-team"})

        assert client.get(self._get_url()).status_code == HTTPStatus.NOT_FOUND
        assert client.get(unknown_url).status_code == HTTPStatus.NOT_FOUND

    def test_page_address_is_unchanged_when_team_is_renamed(self, client, user) -> None:
        """Renaming a team keeps its slug, so existing links keep working."""
        url = self._get_url()
        self.team.name = "Renamed team"
        self.team.save()
        client.force_login(user)

        response = client.get(url)

        assert response.status_code == HTTPStatus.OK
        assert response.context["team"].name == "Renamed team"

    def test_user_must_accept_terms_before_viewing_team(self, client, user) -> None:
        """Terms acceptance gates the team page."""
        user.agreed_to_tos = False
        user.save(update_fields=["agreed_to_tos"])
        client.force_login(user)

        response = client.get(self._get_url())

        assert response.status_code == HTTPStatus.FOUND
        assert response.url == reverse("terms_acceptance")

    def test_lists_team_members_with_their_role_by_name(
        self, django_user_model, soup_factory
    ) -> None:
        """List every team member by name with a manager or member badge."""
        for username, first, last, manager in (
            ("zed", "", "", False),
            ("bob", "Bob", "Carter", False),
            ("alice", "Alice", "Brown", True),
        ):
            person = django_user_model.objects.create_user(
                username=username, first_name=first, last_name=last
            )
            TeamMembership.objects.create(user=person, team=self.team, manager=manager)

        soup = soup_factory(authenticated=True)

        roster = soup.find("table")
        assert roster is not None
        headings = [
            heading.get_text(strip=True) for heading in roster.select("thead th")
        ]
        assert headings == ["Name", "Role"]
        rows = [
            [cell.get_text(" ", strip=True) for cell in row.select("td")]
            for row in roster.select("tbody tr")
        ]
        assert rows == [
            ["Alice Brown", "Manager"],
            ["Bob Carter", "Member"],
            ["test user", "Manager"],
            ["zed", "Member"],
        ]
        assert roster.select_one("tbody tr .badge.bg-primary") is not None
        assert roster.select_one("tbody tr .badge.bg-secondary") is not None

    def test_team_wheel_shows_the_rounded_average_of_each_skill(
        self, user, members, competency, skill, skill_levels, soup_factory
    ) -> None:
        """The wheel gets each skill's average, rounded to a whole level."""
        for person, level in zip([user, *members], (1, 2, 2), strict=True):
            SkillProfile.objects.create(
                profile=person.profile, skill=skill, skill_level=skill_levels[level]
            )

        soup = soup_factory(authenticated=True)

        chart_data = [
            {
                "user_id": "team",
                "skill_profile_data": [
                    {
                        "skill": skill.name,
                        "category": competency.competency_domain.name,
                        "subcategory": competency.name,
                        "skill_level": 2,
                    }
                ],
            }
        ]
        wheel_script = soup.find(tag_with_text_filter("script", "const charts"))
        assert wheel_script is not None
        assert f"const charts = {json.dumps(chart_data)};" in wheel_script.text
        assert soup.find(id="dataviz_team") is not None
        assert (
            soup.find(tag_with_text_filter("p", "rounded to the nearest")) is not None
        )

    def test_shows_a_message_when_no_member_has_assessed_their_skills(
        self, members, soup_factory
    ) -> None:
        """Explain why there is no wheel instead of showing an empty one."""
        soup = soup_factory(authenticated=True)

        message = "No team members have assessed their skills yet."
        assert soup.find(tag_with_text_filter("p", message)) is not None
        assert soup.find(id="dataviz_team") is None
        assert soup.find(tag_with_text_filter("script", "const charts")) is None
