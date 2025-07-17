"""Test suite for the main views.

This test module includes tests for main views of the app ensuring that:
  - The correct templates are used.
  - The correct status codes are returned.
"""

from django.urls import reverse

from .view_utils import TemplateOkMixin


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


class TestCreateUserView(TemplateOkMixin):
    """Test suite for the CreateUserView."""

    _template_name = "registration/create_user.html"

    def _get_url(self):
        return reverse("create_user")


class TestUserUpdateView(TemplateOkMixin):
    """Test suite for the UserUpdateView."""

    _template_name = "main/user_update_form.html"

    def _get_url(self):
        return reverse("profile")
