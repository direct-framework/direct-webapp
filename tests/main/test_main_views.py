"""Test suite for the main views.

This test module includes tests for main views of the app ensuring that:
  - The correct templates are used.
  - The correct status codes are returned.
"""

from http import HTTPStatus

from django.urls import reverse

from .view_utils import LoginRequiredMixin, TemplateOkMixin


class TestIndex(TemplateOkMixin):
    """Test suite for the index view."""

    _template_name = "main/index.html"

    def _get_url(self):
        return reverse("index")


class TestPrivacy(TemplateOkMixin):
    """Test suite for the privacy view."""

    _template_name = "main/privacy.html"

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

    _template_name = "main/about.html"

    def _get_url(self):
        return reverse("about")


class TestTermsPageView(TemplateOkMixin):
    """Test suite for the TermsPageView."""

    _template_name = "main/terms.html"

    def _get_url(self):
        return reverse("terms")


class TestContactPageView(TemplateOkMixin):
    """Test suite for the ContactPageView."""

    _template_name = "main/contact.html"

    def _get_url(self):
        return reverse("contact")


class TestSelfAssessPageView(TemplateOkMixin, LoginRequiredMixin):
    """Test suite for the SelfAssessPageView."""

    _template_name = "main/self-assess.html"

    def _get_url(self):
        return reverse("self-assess")

    def test_post(self, client, user, django_user_model):
        """Test the view POST request creates new user skills and redirects."""
        from main.models import Category, Skill, SkillLevel, UserSkill

        client.force_login(user)

        # Create test data
        parent_category = Category.objects.create(
            name="Test Parent Category", description="Test parent description"
        )
        subcategory = Category.objects.create(
            name="Test Subcategory",
            description="Test subcategory description",
            parent_category=parent_category,
        )
        skill1 = Skill.objects.create(
            name="Test Skill 1",
            description="Test skill 1 description",
            category=subcategory,
        )
        skill2 = Skill.objects.create(
            name="Test Skill 2",
            description="Test skill 2 description",
            category=subcategory,
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

        # Assert redirects to self-assess (success_url)
        assert response.status_code == HTTPStatus.FOUND
        assert response.url == reverse("self-assess")
