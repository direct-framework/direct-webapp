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
            "main.io_resources.export_framework", return_value=framework_dict
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
