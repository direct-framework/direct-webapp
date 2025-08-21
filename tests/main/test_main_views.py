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


class TestSelfAssessPageView(TemplateOkMixin):
    """Test suite for the SelfAssessPageView."""

    _template_name = "main/self-assess.html"

    def _get_url(self):
        return reverse("self-assess")


class TestSkillProfile(TemplateOkMixin):
    """Test suite for the index view."""

    _template_name = "app/skill_profile.html"

    def _get_url(self):
        return reverse("skill_profile")

    def test_renders_dataviz_with_skills(self, admin_client):
        """Test that the skill profile view renders the data visualization."""
        response = admin_client.get(self._get_url())
        assert response.status_code == 200
        assert "data" in response.context
        assert isinstance(response.context["data"], str)
