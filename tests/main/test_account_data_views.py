"""Test suite for the account-related data views.

This test module includes tests for data views of the app.
"""

from http import HTTPStatus

from django.urls import reverse

from .test_main_views import LoginRequiredMixin


class DownloadUserSkillDataMixin(LoginRequiredMixin):
    """Test suite for the GetUserSkillsDataMixin."""

    _url: str
    _content_type: str

    def test_authenticated_user_can_access(self, client_logged_in):
        """Test that an authenticated user can access the view."""
        response = client_logged_in.get(self._get_url())
        assert response.status_code == HTTPStatus.OK

    def test_returns_correct_content_type(self, client_logged_in):
        """Test that the response returns the correct content type."""
        response = client_logged_in.get(self._get_url())
        assert response.status_code == HTTPStatus.OK
        assert response["Content-Type"] == self._content_type

    def test_return_type_should_be_file_attachement(self, client_logged_in):
        """Test that the response has the correct file attachment header."""
        response = client_logged_in.get(self._get_url())
        assert response.status_code == HTTPStatus.OK
        content_disposition = response["Content-Disposition"]
        assert content_disposition.startswith("attachment;")

    def _get_url(self):
        return reverse(self._url)


class TestDownloadUserSkillDataCsvView(DownloadUserSkillDataMixin):
    """Test suite for the DownloadCSVDataLinkView."""

    _url = "download-csv-data-link"
    _content_type = "text/csv"

    def test_download_csv_data_link_view_csv_content(
        self, client_logged_in, user_skill
    ):
        """Test that the CSV content is correct."""
        response = client_logged_in.get(self._get_url())
        content = response.content.decode("utf-8")
        assert content.startswith("skill")
        assert "competency_domain" in content
        assert "competency" in content
        assert "skill_level" in content
        assert user_skill.skill.name in content
        assert (
            content.count("\n") > 1
        )  # Ensure there is at least one row of data besides the header


class TestDownloadUserSkillDataJSONView(DownloadUserSkillDataMixin):
    """Test suite for the DownloadUserSkillDataJSONView."""

    _url = "download-json-data-link"
    _content_type = "application/json"

    def test_download_json_data_link_view_json_content(self, client_logged_in):
        """Test that the JSON content is correct."""
        response = client_logged_in.get(self._get_url())
        assert response.status_code == HTTPStatus.OK
        content = response.json()
        assert isinstance(content, dict)
        assert "username" in content
        assert "user_data" in content
        assert isinstance(content["user_data"], list)
        if content["user_data"]:
            assert "skill" in content["user_data"][0]
            assert "competency_domain" in content["user_data"][0]
            assert "competency" in content["user_data"][0]
            assert "skill_level" in content["user_data"][0]

    def test_returns_anonymous_username_when_anonymous_param_is_true(
        self, client_logged_in
    ):
        """Assert username is 'anonymous' when anonymous URL para is set to true."""
        response = client_logged_in.get(self._get_url() + "?anonymous=true")
        assert response.status_code == HTTPStatus.OK
        content = response.json()
        assert content["username"] == "anonymous"
        # Also check that the user_data is still present
        assert "user_data" in content
