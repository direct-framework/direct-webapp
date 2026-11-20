"""Test suite for team views."""

import json
from http import HTTPStatus
from urllib import parse as parseUrl

import pytest
from bs4 import BeautifulSoup
from django.urls import reverse

from main.models import Skill, SkillLevel, SkillProfile, TeamMembership, User
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


@pytest.mark.django_db
class TestTeamDetailView(LoginRequiredMixin, TemplateOkMixin):
    """Test the team page shown to team members."""

    _template_name = "main/team-detail.html"

    @pytest.fixture(autouse=True)
    def create_team_for_view(self, user) -> None:
        """Create a team managed by the default user."""
        self.team = create_team(
            user=user, name="Research team", description="Team page tests"
        )

    def _get_url(self, **kwargs) -> str:
        return reverse("team-detail", kwargs={"team_slug": self.team.slug})

    def test_member_sees_the_team_page(self, client, django_user_model) -> None:
        """A regular member can open their team's page."""
        member = django_user_model.objects.create_user(
            username="regular-member", agreed_to_tos=True
        )
        TeamMembership.objects.create(user=member, team=self.team)
        client.force_login(member)

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

    def test_lists_managers_and_members_separately_by_name(
        self, client, django_user_model, user
    ) -> None:
        """Show full names, or usernames when absent, in alphabetical order."""
        for username, first, last, manager in (
            ("zed", "", "", False),
            ("bob", "Bob", "Carter", False),
            ("alice", "Alice", "Brown", True),
        ):
            person = django_user_model.objects.create_user(
                username=username, first_name=first, last_name=last
            )
            TeamMembership.objects.create(user=person, team=self.team, manager=manager)
        client.force_login(user)

        soup = BeautifulSoup(client.get(self._get_url()).content, "html.parser")

        def names_under(heading: str) -> list[str]:
            title = soup.find("h2", string=heading)
            assert title is not None
            section = title.find_parent("section")
            assert section is not None
            return [item.get_text(strip=True) for item in section.find_all("li")]

        assert names_under("Managers") == ["Alice Brown", "test user"]
        assert names_under("Members") == ["Bob Carter", "zed"]

    def _add_members(self, django_user_model, count: int) -> list[User]:
        """Add regular members to the team and return them."""
        members = []
        for index in range(count):
            member = django_user_model.objects.create_user(username=f"m{index}")
            TeamMembership.objects.create(user=member, team=self.team)
            members.append(member)
        return members

    def test_team_wheel_shows_only_skills_assessed_by_three_members(
        self, client, django_user_model, user, competency, skill
    ) -> None:
        """The wheel gets rounded averages; rarely assessed skills are left out."""
        levels = {
            level: SkillLevel.objects.create(
                level=level,
                name=f"Level {level}",
                description="-",
                short_description="-",
            )
            for level in (1, 2)
        }
        rare = Skill.objects.create(
            name="Rarely assessed skill", description="-", competency=competency
        )
        people = [user, *self._add_members(django_user_model, 2)]
        for person, level in zip(people, (1, 2, 2), strict=True):
            SkillProfile.objects.create(
                profile=person.profile, skill=skill, skill_level=levels[level]
            )
        for person in people[:2]:
            SkillProfile.objects.create(
                profile=person.profile, skill=rare, skill_level=levels[2]
            )
        client.force_login(user)

        html = client.get(self._get_url()).content.decode()

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
        assert f"const charts = {json.dumps(chart_data)};" in html
        assert 'id="dataviz_team"' in html
        assert "rounded to the nearest whole level" in html
        assert rare.name not in html

    def test_shows_a_message_when_no_skill_has_enough_assessments(
        self, client, django_user_model, user, skill, skill_level
    ) -> None:
        """Explain why there is no wheel instead of showing an empty one."""
        for person in (user, *self._add_members(django_user_model, 1)):
            SkillProfile.objects.create(
                profile=person.profile, skill=skill, skill_level=skill_level
            )
        client.force_login(user)

        html = client.get(self._get_url()).content.decode()

        assert "Not enough team members have assessed their skills yet." in html
        assert "dataviz_team" not in html
        assert "const charts" not in html
