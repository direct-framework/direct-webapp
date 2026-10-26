"""Test suite for the data views.

This test module includes tests for data views of the app.
"""

import csv
from http import HTTPStatus
from io import StringIO

from django.urls import reverse


class TestFrameworkJSONView:
    """Test suite for the framework JSON download view."""

    def _get_url(self):
        return reverse("framework_json")

    def test_get_downloads_framework_json(self, mocker, client):
        """Test the GET returns the framework JSON as a named attachment."""
        framework_dict = {"competency_domains": []}
        export_mock = mocker.patch(
            "main.views.data_views.export_skills_competencies",
            return_value=framework_dict,
        )

        response = client.get(self._get_url())

        assert response.status_code == HTTPStatus.OK
        assert response["Content-Disposition"] == (
            'attachment; filename="framework.json"'
        )
        export_mock.assert_called_once()
        assert response.json() == framework_dict

    def test_only_get_is_allowed(self, client):
        """Test that the JSON download view only allows GET requests."""
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


class TestFrameworkCSVView:
    """Test suite for the framework CSV download view."""

    def _get_url(self):
        return reverse("framework_csv")

    def test_get_downloads_nested_framework_csv(self, mocker, client):
        """Test the CSV download flattens domains, competencies, and skills."""
        framework_data = {
            "competency_domains": [
                {
                    "name": "Domain",
                    "description": "Domain description",
                    "slug": "domain",
                    "competencies": [
                        {
                            "name": "Competency",
                            "description": "Competency description",
                            "slug": "competency",
                            "skills": [
                                {
                                    "name": "Skill",
                                    "description": "Skill description",
                                    "slug": "skill",
                                }
                            ],
                        }
                    ],
                }
            ]
        }
        export_mock = mocker.patch(
            "main.views.data_views.export_skills_competencies",
            return_value=framework_data,
        )

        response = client.get(self._get_url())

        assert response.status_code == HTTPStatus.OK
        assert response["Content-Type"] == "text/csv"
        assert response["Content-Disposition"] == (
            'attachment; filename="framework.csv"'
        )
        export_mock.assert_called_once()
        rows = list(csv.reader(StringIO(response.content.decode())))
        assert rows == [
            ["competency_domain", "competency", "skill", "description", "slug"],
            ["Domain", "", "", "Domain description", "domain"],
            ["", "Competency", "", "Competency description", "competency"],
            ["", "", "Skill", "Skill description", "skill"],
        ]
