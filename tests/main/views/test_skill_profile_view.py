"""Test suite for the main views.

This test module includes tests for main views of the app ensuring that:
  - The correct templates are used.
  - The correct status codes are returned.
"""

from django.urls import reverse

from ..view_utils import TemplateOkMixin


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
