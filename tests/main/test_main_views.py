"""Test suite for the main views.

This test module includes tests for main views of the app ensuring that:
  - The correct templates are used.
  - The correct status codes are returned.
"""

import json
from http import HTTPStatus

import pytest
from django.db.models import QuerySet
from django.urls import reverse
from pytest_django.asserts import assertTemplateUsed

from main.models import Skill, SkillLevel, UserSkill
from main.views.page_views import _extract_and_combine_roles

from .view_utils import (
    BS4Mixin,
    LoginRequiredMixin,
    TemplateOkMixin,
    tag_with_text_filter,
)


class TestIndex(TemplateOkMixin, BS4Mixin):
    """Test suite for the index view."""

    _template_name = "main/index.html"

    @pytest.fixture
    def url(self):
        """Fixture to get the test url."""
        return reverse("index")

    def test_provides_required_context(self, admin_client, skill_level, url):
        """Test the view provides skill_levels and sample_data context."""
        response = admin_client.get(url)
        assert "chart_data" in response.context
        assert isinstance(response.context["chart_data"], str)
        assert response.context["skill_levels"] == json.dumps(
            [{"level": skill_level.level, "name": skill_level.name}]
        )

    @pytest.mark.django_db
    def test_navbar_contents(self, soup, auth_soup, admin_soup):
        """Test that the navbar contains expected menus and sub-menus."""
        nav = soup.find("header", class_="navbar")

        # Top-level items
        assert nav.find(tag_with_text_filter("a", "DIRECT"), href=reverse("index"))
        assert nav.find(tag_with_text_filter("a", "About"), href=reverse("about"))
        assert nav.find(
            tag_with_text_filter("a", "Start Using"), href=reverse("self_assess")
        )
        assert nav.find(tag_with_text_filter("a", "Login"), href=reverse("login"))
        assert nav.find(
            tag_with_text_filter("a", "Register"),
            href=reverse("django_registration_register"),
        )

        # Framework Dropdown
        framework_dropdown = nav.find(
            tag_with_text_filter("li", "Framework"), class_="nav-item dropdown"
        )
        assert framework_dropdown.find(
            tag_with_text_filter("a", "Overview"),
            href=reverse("framework_overview"),
        )
        assert framework_dropdown.find(
            tag_with_text_filter("a", "Skills and competencies"),
            href=reverse("skills_and_competencies"),
        )
        assert framework_dropdown.find(
            tag_with_text_filter("a", "Skill levels"), href=reverse("skill_levels")
        )
        assert framework_dropdown.find(
            tag_with_text_filter("a", "Learning resources"),
            href=reverse("learning_resources"),
        )
        assert framework_dropdown.find(
            tag_with_text_filter("a", "Roles & career pathways"), href=reverse("roles")
        )

        # Community Dropdown
        community_dropdown = nav.find(
            tag_with_text_filter("li", "Community"), class_="nav-item dropdown"
        )
        assert community_dropdown.find(
            tag_with_text_filter("a", "Get involved"), href=reverse("get_involved")
        )
        assert community_dropdown.find(
            tag_with_text_filter("a", "Events"), href=reverse("events")
        )

        # Light-Dark mode toggle
        assert nav.find("div", attrs={"data-bs-toggle": "mode"})

        # Account Dropdown (requires to be logged in)
        assert not nav.find(tag_with_text_filter("div", "Hello,"), class_="dropdown")

    def test_navbar_contents_when_authenticated(self, auth_soup, admin_soup):
        """Test the navbar contains expected menus and sub-menus for logged-in users."""
        nav = auth_soup.find("header", class_="navbar")

        # Not-present top-level items
        assert not nav.find(tag_with_text_filter("a", "Login"))
        assert not nav.find(tag_with_text_filter("a", "Register"))

        # Account Dropdown
        account_dropdown = nav.find(
            tag_with_text_filter("div", "Hello,"), class_="dropdown"
        )
        assert account_dropdown.find(
            tag_with_text_filter("a", "Overview"), href=reverse("account-overview")
        )
        assert account_dropdown.find(
            tag_with_text_filter("a", "Update profile"), href=reverse("profile")
        )
        assert account_dropdown.find(
            tag_with_text_filter("a", "Change password"),
            href=reverse("password_change"),
        )
        assert account_dropdown.find(
            tag_with_text_filter("a", "Assessment"), href=reverse("self_assess")
        )
        assert account_dropdown.find(
            tag_with_text_filter("a", "Skills profile"), href=reverse("skills_profile")
        )
        assert account_dropdown.find(
            tag_with_text_filter("form", "Sign out"), action=reverse("logout")
        )

        # Admin link (requires admin user)
        assert not account_dropdown.find(tag_with_text_filter("a", "Admin Backend"))

        assert (
            admin_soup.find("header", class_="navbar")
            .find(tag_with_text_filter("div", "Hello,"), class_="dropdown")
            .find(
                tag_with_text_filter("a", "Admin backend"), href=reverse("admin:index")
            )
        )


class TestPrivacy(TemplateOkMixin):
    """Test suite for the privacy view."""

    _template_name = "main/pages/policies/privacy.html"

    @pytest.fixture
    def url(self):
        """Fixture to get the test url."""
        return reverse("privacy")


class TestUserUpdateView(TemplateOkMixin, LoginRequiredMixin):
    """Test suite for the UserUpdateView."""

    _template_name = "main/user-update-form.html"

    @pytest.fixture
    def url(self):
        """Fixture to get the test url."""
        return reverse("profile")

    def test_post(self, client, user, django_user_model, url):
        """Test the view POST request updates the user and redirects correctly."""
        client.force_login(user)

        user_id = user.id
        new_email = "new@mail.com"
        new_username = "newusername"

        response = client.post(url, data={"username": new_username, "email": new_email})

        # Assert the user email is updated
        updated_user = django_user_model.objects.get(id=user_id)

        assert updated_user.email == new_email
        assert updated_user.username == new_username

        # Assert redirects to profile
        assert response.status_code == HTTPStatus.FOUND
        assert response.url == url


class TestAboutPageView(TemplateOkMixin, BS4Mixin):
    """Test suite for the AboutPageView."""

    _template_name = "main/pages/about.html"

    @pytest.fixture
    def url(self):
        """Fixture to get the test url."""
        return reverse("about")

    def test_page_content(self, soup):
        """Test that the about page contains correct heading and breadcrumbs."""
        assert "Building a stronger future for digital research" == soup.find("h1").text

        breadcrumbs = soup.find("nav", attrs={"aria-label": "breadcrumb"})
        assert breadcrumbs.find(
            tag_with_text_filter("a", "Home"),
            href=reverse("index"),
        )
        assert breadcrumbs.find(
            tag_with_text_filter("li", "About the project"),
            class_="breadcrumb-item active",
        )


class TestTermsPageView(TemplateOkMixin):
    """Test suite for the TermsPageView."""

    _template_name = "main/pages/policies/terms.html"

    @pytest.fixture
    def url(self):
        """Fixture to get the test url."""
        return reverse("terms")


class TestTermsAcceptanceView(TemplateOkMixin, LoginRequiredMixin):
    """Test suite for the terms acceptance view."""

    _template_name = "main/terms_acceptance.html"

    @pytest.fixture
    def url(self):
        """Fixture to get the test url."""
        return reverse("terms_acceptance")

    def test_post_updates_user_and_redirects_to_overview(self, client, user, url):
        """Test that posting acceptance updates user fields and redirects."""
        user.agreed_to_tos = False
        user.save(update_fields=["agreed_to_tos"])
        client.force_login(user)

        response = client.post(url, data={"tos": True})

        user.refresh_from_db()
        assert user.agreed_to_tos is True
        assert user.date_agreed is not None
        assert response.status_code == HTTPStatus.FOUND
        assert response.url == reverse("account-overview")

    def test_post_redirects_to_overview_without_next(self, client, user, url):
        """Test that posting acceptance without next redirects to account overview."""
        user.agreed_to_tos = False
        user.save(update_fields=["agreed_to_tos"])
        client.force_login(user)

        response = client.post(url, data={"tos": True})

        assert response.status_code == HTTPStatus.FOUND
        assert response.url == reverse("account-overview")


class TestSelfAssessPageView(TemplateOkMixin, LoginRequiredMixin):
    """Test suite for the SelfAssessPageView."""

    _template_name = "main/user-self-assess.html"

    @pytest.fixture
    def url(self):
        """Fixture to get the test url."""
        return reverse("self_assess")

    @pytest.mark.django_db
    def test_post(self, client, user, competency, skill, skill_level, url):
        """Test the view POST request creates new user skills and redirects."""
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
        response = client.post(url, data=form_data)

        # Assert user skills are created
        user_skills = UserSkill.objects.filter(user=user)
        assert user_skills.count() == 2

        # Assert the skills are correctly associated
        skill_ids = set(us.skill.id for us in user_skills)
        assert skill_ids == {skill.id, skill2.id}

        # Assert all user skills have the correct level
        for user_skill in user_skills:
            assert user_skill.skill_level == skill_level

        # Assert redirects to self_assess (success_url)
        assert response.status_code == HTTPStatus.FOUND
        assert response.url == reverse("self_assess")


@pytest.mark.parametrize(
    "url_name",
    ["skills_profile", "self_assess", "profile", "account-overview"],
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


class TestUserSkillProfile(TemplateOkMixin, BS4Mixin):
    """Test suite for the user skill profile view."""

    _template_name = "main/user-skills-profile.html"

    @pytest.fixture
    def url(self):
        """Fixture to get the test url."""
        return reverse("skills_profile")

    def test_provides_required_context(self, admin_client, skill_level, url):
        """Test that the skill profile view send the correct context data."""
        response = admin_client.get(url)
        assert response.status_code == 200
        assert "chart_data" in response.context
        assert isinstance(response.context["chart_data"], str)
        assert response.context["skill_levels"] == json.dumps(
            [{"level": skill_level.level, "name": skill_level.name}]
        )

    def test_skill_wheel_script(self, user_skill, auth_soup):
        """Test that the skill profile view contains the correct script."""
        card = auth_soup.find("div", class_="card-body")

        assert card.find(tag_with_text_filter("h1", "Skills profile"))
        assert card.find("div", id="dataviz_root")

        skill_level_list = list(SkillLevel.objects.values("level", "name"))
        user_skill_dict = {
            "skill": user_skill.skill.name,
            "category": user_skill.skill.competency.competency_domain.name,
            "subcategory": user_skill.skill.competency.name,
            "skill_level": user_skill.skill_level.level,
        }
        chart_data = [{"user_id": "root", "user_data": [user_skill_dict]}]

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
                "renderRadialBarChart(target, charts[i].user_data, skillLevels);",
            )
        )


class TestRolesPageView(TemplateOkMixin):
    """Test suite for the role profiles page view."""

    _template_name = "main/pages/roles.html"

    @pytest.fixture
    def url(self):
        """Fixture to get the test url."""
        return reverse("roles")

    def test_provides_required_context(self, admin_client, skill_level, url):
        """Test that the role profiles view renders the data visualization."""
        response = admin_client.get(url)
        assert response.status_code == 200
        assert "chart_data" in response.context
        assert isinstance(response.context["chart_data"], list)
        assert response.context["skill_levels"] == json.dumps(
            [{"level": skill_level.level, "name": skill_level.name}]
        )


class TestSkillLevelsPageView(TemplateOkMixin):
    """Test suite for the SkillLevelsPageView."""

    _template_name = "main/pages/skill-levels.html"

    @pytest.fixture
    def url(self):
        """Fixture to get the test url."""
        return reverse("skill_levels")


class TestLearningResourcesPageView(TemplateOkMixin, BS4Mixin):
    """Test suite for the LearningResourcesPageView."""

    _template_name = "main/pages/learning-resources.html"

    @pytest.fixture
    def url(self):
        """Fixture to get the test url."""
        return reverse("learning_resources")

    @pytest.mark.django_db
    def test_page_content(self, learning_resource, skill, soup):
        """Test that the learning page contains a table with learning resources."""
        assert "Learning resources" == soup.find("h1").text

        table = soup.find("table")
        thead = table.find("thead")
        assert thead.find(tag_with_text_filter("th", "Name"), class_="asc orderable")
        assert thead.find(tag_with_text_filter("th", "Language"), class_="orderable")
        assert thead.find(tag_with_text_filter("th", "Provider"), class_="orderable")
        assert thead.find(tag_with_text_filter("th", "Skills"))
        tr = table.find("tbody").find("tr", class_="even")
        assert tr.find(
            tag_with_text_filter("a", "Learning Resource"), href=learning_resource.url
        )
        assert tr.find(tag_with_text_filter("td", "English"))
        assert tr.find(
            tag_with_text_filter("a", "Provider"), href=learning_resource.provider.url
        )
        assert tr.find(
            tag_with_text_filter("a", "Skill"),
            class_="badge",
            href=reverse("skill_detail", args=(skill.slug,)),
        )


class TestGetInvolvedPageView(TemplateOkMixin):
    """Test suite for the GetInvolvedPageView."""

    _template_name = "main/pages/get-involved.html"

    @pytest.fixture
    def url(self):
        """Fixture to get the test url."""
        return reverse("get_involved")


class TestEventsPageView(TemplateOkMixin):
    """Test suite for the EventsPageView."""

    _template_name = "main/pages/events.html"

    @pytest.fixture
    def url(self):
        """Fixture to get the test url."""
        return reverse("events")

    def test_provides_required_context(self, client, url):
        """Test that the events view provides the events context."""
        response = client.get(url)
        assert response.status_code == HTTPStatus.OK
        assert "events" in response.context
        assert isinstance(response.context["events"], list)


class TestAccountOverviewView(LoginRequiredMixin):
    """Test suite for the account_overview view."""

    @pytest.fixture
    def url(self):
        """Fixture to get the test url."""
        return reverse("account-overview")

    def test_redirects_to_self_assess_when_no_skills(self, client, user, url):
        """Test that users with no skills are redirected to self-assess."""
        client.force_login(user)
        response = client.get(url)
        assert response.status_code == HTTPStatus.FOUND
        assert response.url == reverse("self_assess")

    @pytest.mark.django_db
    def test_redirects_to_skill_profile_when_skills_exist(
        self, client, user_skill, url
    ):
        """Test that users with skills are redirected to their skill profile."""
        client.force_login(user_skill.user)

        response = client.get(url)
        assert response.status_code == HTTPStatus.FOUND
        assert response.url == reverse("skills_profile")


class TestSkillsAndCompetenciesPageView(TemplateOkMixin):
    """Test suite for the SkillsAndCompetenciesPageView."""

    _template_name = "main/pages/skills-and-competencies.html"

    @pytest.fixture
    def url(self):
        """Fixture to get the test url."""
        return reverse("skills_and_competencies")

    @pytest.mark.django_db
    def test_provides_required_context(self, client, competency_domain, url):
        """Test that the competencies view provides the domains context."""
        response = client.get(url)
        assert response.status_code == HTTPStatus.OK
        assert "domains" in response.context
        assert isinstance(response.context["domains"], QuerySet)
        assert response.context["domains"].first() == competency_domain


class TestSkillPageView(TemplateOkMixin):
    """Test suite for the SkillPageView."""

    _template_name = "main/pages/skill.html"

    @pytest.fixture
    def url(self, skill):
        """Fixture to get the test url."""
        return reverse("skill_detail", kwargs={"slug": skill.slug})

    def test_template_used(self, admin_client, url):
        """Test the correct template is used by the GET request."""
        with assertTemplateUsed(template_name=self._template_name):
            response = admin_client.get(url)
        assert response.status_code == HTTPStatus.OK

    @pytest.mark.django_db
    def test_provides_required_context(self, client, skill, url):
        """Test that the skill page view provides the skill context."""
        response = client.get(url)
        assert response.status_code == HTTPStatus.OK
        assert "skill" in response.context
        assert response.context["skill"] == skill

    class TestSkillPageView404:
        """Tests related to the 404 error for non-existent skills."""

        @pytest.fixture
        def url(self):
            """Fixture to get the test url for a non-existent skill."""
            return reverse("skill_detail", kwargs={"slug": "nonexistent-skill"})

        @pytest.mark.django_db
        def test_404_for_nonexistent_skill(self, client, url):
            """Test that requesting a non-existent skill returns a 404."""
            response = client.get(url)
            assert response.status_code == HTTPStatus.NOT_FOUND


def test_extract_and_combine_roles():
    """Test the _extract_and_combine_roles function."""
    data = _extract_and_combine_roles(
        ["./tests/data/example_role.json", "./tests/data/example_role.json"]
    )

    assert isinstance(data, list)
    assert len(data) == 2
    assert isinstance(data[0], dict)
    assert data[0]["name"] == "User 1"
    assert data[0]["user_data"][0]["skill"] == "Skill 1"
    assert data[1]["user_data"][1]["category"] == "Category 2"


class TestFrameworkOverviewPageView(TemplateOkMixin):
    """Test suite for the FrameworkOverviewPageView."""

    _template_name = "main/pages/framework-overview.html"

    @pytest.fixture
    def url(self):
        """Fixture to get the test url."""
        return reverse("framework_overview")


class TestGovernancePageView(TemplateOkMixin):
    """Test suite for the GovernancePageView."""

    _template_name = "main/pages/policies/governance.html"

    @pytest.fixture
    def url(self):
        """Fixture to get the test url."""
        return reverse("governance")


class TestLicensingPageView(TemplateOkMixin):
    """Test suite for the LicensingPageView."""

    _template_name = "main/pages/policies/licensing.html"

    @pytest.fixture
    def url(self):
        """Fixture to get the test url."""
        return reverse("licensing")
