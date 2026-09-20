"""Test suite for the data views.

This test module includes tests for data views of the app.
"""

from http import HTTPStatus

from django.urls import reverse


class TestFrameworkView:
    """Test suite for the FrameworkView."""

    def _get_url(self):
        return reverse("framework_json")

    def test_framework_view_get(self, mocker, client):
        """Test the GET returns the dictionary returned by `export_framework`."""
        framework_dict = {"key": [{"sub-key": "value"}]}
        export_mock = mocker.patch(
            "main.views.data_views.export_framework", return_value=framework_dict
        )

        response = client.get(self._get_url())

        assert response.status_code == HTTPStatus.OK
        export_mock.assert_called_once()
        assert response.json() == framework_dict

    def test_framework_view_can_only_get(self, client):
        """Test to confirm it is only valid to GET the framework view."""
        response = client.post(self._get_url())
        assert response.status_code == HTTPStatus.METHOD_NOT_ALLOWED
        response = client.put(self._get_url())
        assert response.status_code == HTTPStatus.METHOD_NOT_ALLOWED
        response = client.patch(self._get_url())
        assert response.status_code == HTTPStatus.METHOD_NOT_ALLOWED
        response = client.delete(self._get_url())
        assert response.status_code == HTTPStatus.METHOD_NOT_ALLOWED
        response = client.trace(self._get_url())
        assert response.status_code == HTTPStatus.METHOD_NOT_ALLOWED


class TestDownloadCSVDataLinkView:
    """Test suite for the DownloadCSVDataLinkView."""

    def _get_url(self):
        return reverse("download-csv-data-link")

    def test_download_csv_data_link_view_get(self, client_logged_in):
        """Test the GET returns the correct CSV data link."""
        response = client_logged_in.get(self._get_url())
        assert response.status_code == HTTPStatus.OK

    def test_download_csv_data_link_view_returns_a_csv_file(self, client_logged_in):
        """Test that the GET request returns a CSV file."""
        response = client_logged_in.get(self._get_url())
        assert response.status_code == HTTPStatus.OK
        assert response["Content-Type"] == "text/csv"

    def test_download_csv_data_link_view_csv_content(
        self, client_logged_in, user_skill
    ):
        """Test that the CSV content is correct."""
        response = client_logged_in.get(self._get_url())
        assert response.status_code == HTTPStatus.OK
        content = response.content.decode("utf-8")
        assert content.startswith("skill")
        assert "competency_domain" in content
        assert "competency" in content
        assert "skill_level" in content
        assert user_skill.skill.name in content
        assert (
            content.count("\n") > 1
        )  # Ensure there is at least one row of data besides the header


class TestDownloadUserSkillDataJSONView:
    """Test suite for the DownloadUserSkillDataJSONView."""

    def _get_url(self):
        return reverse("download-json-data-link")

    def test_download_json_data_link_view_get(self, client_logged_in):
        """Test the GET returns the correct JSON data link."""
        response = client_logged_in.get(self._get_url())
        assert response.status_code == HTTPStatus.OK

    def test_download_json_data_link_view_returns_a_json_file(self, client_logged_in):
        """Test that the GET request returns a JSON file."""
        response = client_logged_in.get(self._get_url())
        assert response.status_code == HTTPStatus.OK
        assert response["Content-Type"] == "application/json"

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
