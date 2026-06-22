"""Test suite for the data views.

This test module includes tests for data views of the app.
"""

from http import HTTPStatus

import pytest
from django.urls import reverse


class TestFrameworkView:
    """Test suite for the FrameworkView."""

    @pytest.fixture
    def url(self):
        """Fixture to get the test url."""
        return reverse("framework_json")

    def test_framework_view_get(self, mocker, client, url):
        """Test the GET returns the dictionary returned by `export_framework`."""
        framework_dict = {"key": [{"sub-key": "value"}]}
        export_mock = mocker.patch(
            "main.views.data_views.export_framework", return_value=framework_dict
        )

        response = client.get(url)

        assert response.status_code == HTTPStatus.OK
        export_mock.assert_called_once()
        assert response.json() == framework_dict

    def test_framework_view_can_only_get(self, client, url):
        """Test to confirm it is only valid to GET the framework view."""
        response = client.post(url)
        assert response.status_code == HTTPStatus.METHOD_NOT_ALLOWED
        response = client.put(url)
        assert response.status_code == HTTPStatus.METHOD_NOT_ALLOWED
        response = client.patch(url)
        assert response.status_code == HTTPStatus.METHOD_NOT_ALLOWED
        response = client.delete(url)
        assert response.status_code == HTTPStatus.METHOD_NOT_ALLOWED
        response = client.trace(url)
        assert response.status_code == HTTPStatus.METHOD_NOT_ALLOWED
