"""Test suite for the main views.

This test module includes tests for main views of the app ensuring that:
  - The correct templates are used.
  - The correct status codes are returned.
"""

from http import HTTPStatus

import pytest
from django.db.models import QuerySet
from django.urls import reverse

from main.models import (
    Competency,
    CompetencyDomain,
    Skill,
    SkillLevel,
    UserSkill,
)

from .view_utils import LoginRequiredMixin, TemplateOkMixin


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


class TestAboutPageView(TemplateOkMixin):
    """Test suite for the AboutPageView."""

    _template_name = "main/pages/about.html"

    def _get_url(self):
        return reverse("about")


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

    def test_post(self, client, user, django_user_model):
        """Test the view POST request creates new user skills and redirects."""
        client.force_login(user)

        # Create test data
        competency_domain = CompetencyDomain.objects.create(
            name="Test Competency Domain", description="Test parent description"
        )
        competency = Competency.objects.create(
            name="Test Competency",
            description="Test competency description",
            competency_domain=competency_domain,
        )
        skill1 = Skill.objects.create(
            name="Test Skill 1",
            description="Test skill 1 description",
            competency=competency,
        )
        skill2 = Skill.objects.create(
            name="Test Skill 2",
            description="Test skill 2 description",
            competency=competency,
        )
        skill_level = SkillLevel.objects.create(
            level=1, name="Beginner", description="Basic understanding"
        )

        # Create form data for the POST request
        form_data = {
            f"skill_{skill1.id}": skill_level.id,
            f"skill_{skill2.id}": skill_level.id,
        }

        # Make POST request
        response = client.post(self._get_url(), data=form_data)

        # Assert user skills are created
        user_skills = UserSkill.objects.filter(user=user)
        assert user_skills.count() == 2

        # Assert the skills are correctly associated
        skill_ids = set(us.skill.id for us in user_skills)
        assert skill_ids == {skill1.id, skill2.id}

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

    def test_redirects_to_skill_profile_when_skills_exist(self, client, user):
        """Test that users with skills are redirected to their skill profile."""
        client.force_login(user)

        competency_domain = CompetencyDomain.objects.create(
            name="Test Domain", description="Test domain description"
        )
        competency = Competency.objects.create(
            name="Test Competency",
            description="Test competency description",
            competency_domain=competency_domain,
        )
        skill = Skill.objects.create(
            name="Test Skill",
            description="Test skill description",
            competency=competency,
        )
        skill_level = SkillLevel.objects.create(
            level=1, name="Beginner", description="Basic understanding"
        )
        UserSkill.objects.create(user=user, skill=skill, skill_level=skill_level)

        response = client.get(self._get_url())
        assert response.status_code == HTTPStatus.FOUND
        assert response.url == reverse("skill_profile")


class TestCompetenciesPageView(TemplateOkMixin):
    """Test suite for the CompetenciesPageView."""

    _template_name = "main/pages/competencies.html"

    def _get_url(self):
        return reverse("competencies")

    @pytest.mark.django_db
    def test_provides_required_context(self, client):
        """Test that the competencies view provides the domains context."""
        response = client.get(self._get_url())
        assert response.status_code == HTTPStatus.OK
        assert "domains" in response.context
        assert isinstance(response.context["domains"], QuerySet)
