"""Test suite for account views."""

import json
from http import HTTPStatus

import pytest
from django.urls import reverse

from main.models import Skill, SkillLevel, SkillProfile, TeamMembership
from main.team_services import create_team

from .view_utils import (
    BS4Mixin,
    LoginRequiredMixin,
    TemplateOkMixin,
    tag_with_text_filter,
)


class TestUserUpdateView(TemplateOkMixin, LoginRequiredMixin):
    """Test suite for the UserUpdateView."""

    _template_name = "main/user-update-form.html"

    def _get_url(self):
        return reverse("profile")

    def test_post(self, client, user, django_user_model):
        """Test the view POST request updates the user and redirects correctly."""
        client.force_login(user)

        user_id = user.id
        new_email = "new@mail.com"
        new_username = "newusername"

        response = client.post(
            self._get_url(), data={"username": new_username, "email": new_email}
        )

        # Assert the user email is updated
        updated_user = django_user_model.objects.get(id=user_id)

        assert updated_user.email == new_email
        assert updated_user.username == new_username

        # Assert redirects to profile
        assert response.status_code == HTTPStatus.FOUND
        assert response.url == self._get_url()


class TestTermsAcceptanceView(TemplateOkMixin, LoginRequiredMixin):
    """Test suite for the terms acceptance view."""

    _template_name = "main/terms_acceptance.html"

    def _get_url(self):
        return reverse("terms_acceptance")

    def test_post_updates_user_and_redirects_to_overview(self, client, user):
        """Test that posting acceptance updates user fields and redirects."""
        user.agreed_to_tos = False
        user.save(update_fields=["agreed_to_tos"])
        client.force_login(user)

        response = client.post(self._get_url(), data={"tos": True})

        user.refresh_from_db()
        assert user.agreed_to_tos is True
        assert user.date_agreed is not None
        assert response.status_code == HTTPStatus.FOUND
        assert response.url == reverse("account-overview")

    def test_post_redirects_to_overview_without_next(self, client, user):
        """Test that posting acceptance without next redirects to account overview."""
        user.agreed_to_tos = False
        user.save(update_fields=["agreed_to_tos"])
        client.force_login(user)

        response = client.post(self._get_url(), data={"tos": True})

        assert response.status_code == HTTPStatus.FOUND
        assert response.url == reverse("account-overview")


class TestSelfAssessPageView(TemplateOkMixin, LoginRequiredMixin):
    """Test suite for the SelfAssessPageView."""

    _template_name = "main/user-self-assess.html"

    def _get_url(self):
        return reverse("self_assess")

    @pytest.mark.django_db
    def test_post(self, client, user, competency, skill, skill_level):
        """Test the view POST request creates new skill profiles and redirects."""
        client.force_login(user)

        skill2 = Skill.objects.create(
            name="Test Skill 2",
            description="Test skill 2 description",
            competency=competency,
        )

        # Create form data for the POST request
        form_data = {
            f"skill_{skill.id}": skill_level.id,
            f"skill_{skill2.id}": skill_level.id,
        }

        # Make POST request
        response = client.post(self._get_url(), data=form_data)

        # Assert skill profiles are created
        skill_profiles = SkillProfile.objects.filter(profile=user.profile)
        assert skill_profiles.count() == 2

        # Assert the skills are correctly associated
        skill_ids = set(us.skill.id for us in skill_profiles)
        assert skill_ids == {skill.id, skill2.id}

        # Assert all skill profiles have the correct level
        for skill_profile in skill_profiles:
            assert skill_profile.skill_level == skill_level

        # Assert redirects to self_assess (success_url)
        assert response.status_code == HTTPStatus.FOUND
        assert response.url == reverse("self_assess")


@pytest.mark.parametrize(
    "url_name",
    ["skills_profile", "self_assess", "profile", "account-overview", "my_teams"],
)
def test_unaccepted_users_are_redirected_to_terms_acceptance(client, user, url_name):
    """Unaccepted users should be redirected from gated account pages."""
    user.agreed_to_tos = False
    user.save(update_fields=["agreed_to_tos"])
    client.force_login(user)
    target_url = reverse(url_name)

    response = client.get(target_url)

    assert response.status_code == HTTPStatus.FOUND
    assert response.url == reverse("terms_acceptance")


class TestSkillProfile(TemplateOkMixin, BS4Mixin):
    """Test suite for the skill profile view."""

    _template_name = "main/user-skills-profile.html"

    def _get_url(self):
        return reverse("skills_profile")

    def test_provides_required_context(self, admin_client, skill_level):
        """Test that the skill profile view send the correct context data."""
        response = admin_client.get(self._get_url())
        assert response.status_code == 200
        assert "chart_data" in response.context
        assert isinstance(response.context["chart_data"], str)
        assert response.context["skill_levels"] == json.dumps(
            [{"level": skill_level.level, "name": skill_level.name}]
        )

    def test_skill_wheel_script(self, skill_profile, auth_soup):
        """Test that the skill profile view contains the correct script."""
        card = auth_soup.find("div", class_="card-body")

        assert card.find(tag_with_text_filter("h1", "Skills profile"))
        assert card.find("div", id="dataviz_root")

        skill_level_list = list(SkillLevel.objects.values("level", "name"))
        skill_profile_dict = {
            "skill": skill_profile.skill.name,
            "category": skill_profile.skill.competency.competency_domain.name,
            "subcategory": skill_profile.skill.competency.name,
            "skill_level": skill_profile.skill_level.level,
        }
        chart_data = [{"user_id": "root", "skill_profile_data": [skill_profile_dict]}]

        assert card.find(
            tag_with_text_filter(
                "script",
                f"const skillLevels = {json.dumps(skill_level_list)};",
            )
        )
        assert card.find(
            tag_with_text_filter(
                "script",
                f"const charts = {json.dumps(chart_data)};",
            )
        )
        assert card.find(
            tag_with_text_filter(
                "script",
                "renderRadialBarChart(target, charts[i].skill_profile_data, skillLevels);",  # noqa: E501
            )
        )


class TestAccountOverviewView(LoginRequiredMixin):
    """Test suite for the account_overview view."""

    def _get_url(self):
        return reverse("account-overview")

    def test_redirects_to_self_assess_when_no_skills(self, client, user):
        """Test that users with no skills are redirected to self-assess."""
        client.force_login(user)
        response = client.get(self._get_url())
        assert response.status_code == HTTPStatus.FOUND
        assert response.url == reverse("self_assess")

    @pytest.mark.django_db
    def test_redirects_to_skill_profile_when_skills_exist(self, client, skill_profile):
        """Test that users with skills are redirected to their skill profile."""
        client.force_login(skill_profile.profile.user)

        response = client.get(self._get_url())
        assert response.status_code == HTTPStatus.FOUND
        assert response.url == reverse("skills_profile")


class TestMyTeamsPageView(LoginRequiredMixin, BS4Mixin):
    """Test the My Teams account page."""

    def _get_url(self, page="my_teams"):
        return reverse(page)

    @pytest.fixture
    def team(self, user):
        """Create a manager-owned team for the signed-in user."""
        return create_team(
            user=user,
            name="Research team",
            description="A team working on research software.",
        )

    @pytest.fixture
    def other_user(self, django_user_model):
        """Create another user for team-membership tests."""
        return django_user_model.objects.create_user(
            username="anotheruser",
            first_name="Private",
            last_name="Colleague",
            email="private.colleague@example.com",
        )

    @pytest.fixture
    def other_team(self, other_user):
        """Create a team managed by a different user."""
        return create_team(
            user=other_user,
            name="Astronomy team",
            description="A team studying distant galaxies.",
        )

    @pytest.fixture
    def member_membership(self, user, other_team):
        """Add the signed-in user as a regular member of another user's team."""
        return TeamMembership.objects.create(user=user, team=other_team)

    @pytest.mark.django_db
    def test_lists_only_the_current_users_memberships_in_name_order(
        self,
        client_logged_in,
        user,
        team,
        other_user,
        other_team,
        member_membership,
        soup_factory,
    ):
        """Return all and only the signed-in user's teams, ordered by name."""
        imaging_team = create_team(
            user=user,
            name="Imaging team",
            description="A team analysing images.",
        )
        unrelated_team = create_team(
            user=other_user,
            name="Unrelated team",
            description="A team the current user does not belong to.",
        )

        response = client_logged_in.get(self._get_url())

        assert response.status_code == HTTPStatus.OK
        memberships = response.context["memberships"]
        assert [membership.team.name for membership in memberships] == [
            "Astronomy team",
            "Imaging team",
            "Research team",
        ]
        assert all(membership.user == user for membership in memberships)

        soup = soup_factory(authenticated=True)
        for visible_team in (other_team, imaging_team, team):
            heading = soup.find("h2", string=visible_team.name)
            assert heading is not None
            team_card = heading.find_parent("article")
            assert team_card is not None
            assert visible_team.description in team_card.get_text(" ", strip=True)

        page_text = soup.get_text(" ", strip=True)
        assert unrelated_team.name not in page_text
        assert unrelated_team.description not in page_text

    @pytest.mark.django_db
    def test_shows_manager_status_for_each_membership(
        self, team, other_team, member_membership, soup_factory
    ):
        """Show the manager label only on teams the current user manages."""
        soup = soup_factory(authenticated=True)
        managed_card = soup.find("h2", string="Research team").find_parent("article")
        member_card = soup.find("h2", string="Astronomy team").find_parent("article")

        assert managed_card is not None
        assert member_card is not None
        assert "Manager" in managed_card.get_text(" ", strip=True)
        assert "Manager" not in member_card.get_text(" ", strip=True)

    @pytest.mark.django_db
    def test_shows_an_empty_state_when_the_user_has_no_teams(
        self, other_team, auth_soup
    ):
        """Explain that the user has no teams without showing another user's team."""
        page_text = auth_soup.get_text(" ", strip=True)

        assert "You are not a member of any teams yet." in page_text
        assert "Astronomy team" not in page_text

    @pytest.mark.parametrize("is_manager", [False, True], ids=["member", "manager"])
    @pytest.mark.django_db
    def test_does_not_show_other_members_or_their_assessments(
        self, user, other_user, skill, skill_level, soup_factory, is_manager
    ):
        """Keep other members' details private from members and managers."""
        team = create_team(
            user=user if is_manager else other_user,
            name="Shared team",
            description="A shared team.",
        )
        TeamMembership.objects.create(
            user=other_user if is_manager else user, team=team
        )
        skill.name = "Confidential calibration skill"
        skill.save(update_fields=["name"])
        SkillProfile.objects.create(
            profile=other_user.profile, skill=skill, skill_level=skill_level
        )

        soup = soup_factory(authenticated=True)
        assert len(soup.find_all("h2", string="Shared team")) == 1
        page_html = str(soup)

        assert other_user.username not in page_html
        assert other_user.get_full_name() not in page_html
        assert other_user.email not in page_html
        assert skill.name not in page_html
        assert skill_level.name not in page_html

    @pytest.mark.parametrize("page", ["my_teams", "self_assess"])
    @pytest.mark.django_db
    def test_account_sidebars_link_to_my_teams(self, page, soup_factory):
        """Keep the link in both account sidebar layouts."""
        soup = soup_factory(authenticated=True, page=page)
        account_menu = soup.find("div", id="sidebarAccount")
        teams_link = account_menu.find(tag_with_text_filter("a", "My Teams"))

        assert teams_link is not None
        assert teams_link["href"] == reverse("my_teams")
        if page == "my_teams":
            assert teams_link.get("aria-current") == "page"

    @pytest.mark.django_db
    def test_account_dropdown_links_to_my_teams(self, soup_factory):
        """Provide a direct My Teams link without changing the Overview link."""
        soup = soup_factory(authenticated=True, page="index")
        account_dropdown = soup.find(
            tag_with_text_filter("div", "Hello,"), class_="dropdown"
        )

        teams_link = account_dropdown.find(tag_with_text_filter("a", "My Teams"))
        assert teams_link is not None
        assert teams_link["href"] == reverse("my_teams")
        assert account_dropdown.find(
            tag_with_text_filter("a", "Overview"), href=reverse("account-overview")
        )
