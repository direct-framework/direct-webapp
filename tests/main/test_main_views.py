"""Test suite for the main views.

This test module includes tests for main views of the app ensuring that:
  - The correct templates are used.
  - The correct status codes are returned.
"""

from http import HTTPStatus

import pytest
from django.db.models import QuerySet
from django.urls import reverse
from pytest_django.asserts import assertTemplateUsed

from main.models import (
    Skill,
    UserSkill,
)

from .view_utils import (
    BS4Mixin,
    LoginRequiredMixin,
    TemplateOkMixin,
    tag_with_text_filter,
)


class TestIndex(TemplateOkMixin):
    """Test suite for the index view."""

    _template_name = "main/index.html"

    def _get_url(self):
        return reverse("index")

    def test_provides_required_context(self, admin_client):
        """Test the view provides skill_levels and sample_data context."""
        response = admin_client.get(self._get_url())
        assert "skill_levels" in response.context
        assert "sample_data" in response.context


class TestPrivacy(TemplateOkMixin):
    """Test suite for the privacy view."""

    _template_name = "main/pages/privacy.html"

    def _get_url(self):
        return reverse("privacy")


class TestUserUpdateView(TemplateOkMixin, LoginRequiredMixin):
    """Test suite for the UserUpdateView."""

    _template_name = "main/user_update_form.html"

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


class TestAboutPageView(TemplateOkMixin, BS4Mixin):
    """Test suite for the AboutPageView."""

    _template_name = "main/pages/about.html"

    def _get_url(self):
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

    _template_name = "main/pages/terms.html"

    def _get_url(self):
        return reverse("terms")


class TestSelfAssessPageView(TemplateOkMixin, LoginRequiredMixin):
    """Test suite for the SelfAssessPageView."""

    _template_name = "main/user_self_assess.html"

    def _get_url(self):
        return reverse("self_assess")

    @pytest.mark.django_db
    def test_post(self, client, user, competency, skill, skill_level):
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
        response = client.post(self._get_url(), data=form_data)

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


class TestUserSkillProfile(TemplateOkMixin):
    """Test suite for the user skill profile view."""

    _template_name = "main/user_skill_profile.html"

    def _get_url(self):
        return reverse("skill_profile")

    def test_provides_required_context(self, admin_client):
        """Test that the skill profile view renders the data visualization."""
        response = admin_client.get(self._get_url())
        assert response.status_code == 200
        assert "user_data" in response.context
        assert isinstance(response.context["user_data"], str)
        assert "skill_levels" in response.context
        assert isinstance(response.context["skill_levels"], str)
        # TODO: Improve this test


class TestRolesPageView(TemplateOkMixin):
    """Test suite for the role profiles page view."""

    _template_name = "main/pages/roles.html"

    def _get_url(self):
        return reverse("roles")

    def test_provides_required_context(self, admin_client):
        """Test that the role profiles view renders the data visualization."""
        response = admin_client.get(self._get_url())
        assert response.status_code == 200
        assert "sample_data" in response.context
        assert isinstance(response.context["sample_data"], list)
        assert "skill_levels" in response.context
        assert isinstance(response.context["skill_levels"], list)
        # TODO: Improve this test


class TestSkillLevelsPageView(TemplateOkMixin):
    """Test suite for the SkillLevelsPageView."""

    _template_name = "main/pages/skill-levels.html"

    def _get_url(self):
        return reverse("skill_levels")


class TestTrainingPageView(TemplateOkMixin):
    """Test suite for the TrainingPageView."""

    _template_name = "main/pages/training.html"

    def _get_url(self):
        return reverse("training")


class TestGetInvolvedPageView(TemplateOkMixin):
    """Test suite for the GetInvolvedPageView."""

    _template_name = "main/pages/get-involved.html"

    def _get_url(self):
        return reverse("get_involved")


class TestEventsPageView(TemplateOkMixin):
    """Test suite for the EventsPageView."""

    _template_name = "main/pages/events.html"

    def _get_url(self):
        return reverse("events")

    def test_provides_required_context(self, client):
        """Test that the events view provides the events context."""
        response = client.get(self._get_url())
        assert response.status_code == HTTPStatus.OK
        assert "events" in response.context
        assert isinstance(response.context["events"], list)


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
    def test_redirects_to_skill_profile_when_skills_exist(self, client, user_skill):
        """Test that users with skills are redirected to their skill profile."""
        client.force_login(user_skill.user)

        response = client.get(self._get_url())
        assert response.status_code == HTTPStatus.FOUND
        assert response.url == reverse("skill_profile")


class TestCompetenciesPageView(TemplateOkMixin):
    """Test suite for the CompetenciesPageView."""

    _template_name = "main/pages/competencies.html"

    def _get_url(self):
        return reverse("competencies")

    @pytest.mark.django_db
    def test_provides_required_context(self, client, competency_domain):
        """Test that the competencies view provides the domains context."""
        response = client.get(self._get_url())
        assert response.status_code == HTTPStatus.OK
        assert "domains" in response.context
        assert isinstance(response.context["domains"], QuerySet)
        assert response.context["domains"].first() == competency_domain


class TestSkillPageView(TemplateOkMixin):
    """Test suite for the SkillPageView."""

    _template_name = "main/pages/skill.html"

    def _get_url(self, **kwargs):
        return reverse("skill_detail", kwargs=kwargs)

    def test_template_used(self, admin_client, skill):
        """Test the correct template is used by the GET request."""
        with assertTemplateUsed(template_name=self._template_name):
            response = admin_client.get(self._get_url(slug=skill.slug))
        assert response.status_code == HTTPStatus.OK

    @pytest.mark.django_db
    def test_provides_required_context(self, client, skill):
        """Test that the skill page view provides the skill context."""
        response = client.get(self._get_url(slug=skill.slug))
        assert response.status_code == HTTPStatus.OK
        assert "skill" in response.context
        assert response.context["skill"] == skill

    @pytest.mark.django_db
    def test_404_for_nonexistent_skill(self, client):
        """Test that requesting a non-existent skill returns a 404."""
        response = client.get(self._get_url(slug="nonexistent-skill"))
        assert response.status_code == HTTPStatus.NOT_FOUND
