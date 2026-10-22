"""Views for getting data from the framework database."""

import csv

from django.http import HttpRequest, HttpResponse, JsonResponse
from django.views import View

from ..io_resources import export_skills_competencies


class FrameworkJSONView(View):
    """A view that downloads the core framework as a JSON file.

    The core framework contains just competency domains, competencies and skills.
    """

    def get(self, request: HttpRequest) -> HttpResponse:
        """Return the nested framework data as an indented JSON attachment.

        Args:
            request: A GET request with no required parameters.

        Returns:
            A JSON response named ``framework.json`` with a ``competency_domains`` list.
            Each domain contains its competencies, and each competency contains its
            skills. Domains, competencies, and skills include their slug, name, and
            description.
        """
        return JsonResponse(
            export_skills_competencies(),
            json_dumps_params=dict(indent=2),
            headers={"Content-Disposition": 'attachment; filename="framework.json"'},
        )


class FrameworkCSVView(View):
    """A view that downloads the core framework as a CSV file.

    The core framework contains only competency domains, competencies and skills.
    """

    def get(self, request: HttpRequest) -> HttpResponse:
        """Define the GET response.

        Args:
            request: A GET request with no required parameters.

        Returns:
            An HTTP response containing the full framework as a CSV attachment.
            Columns are as follows:
                - competency_domain
                - competency
                - skill
                - description
                - slug
            For each row that contains a competency domain, rows that follow nest its
            competencies, which then further nest the skills for each competency.
            This is repeated for each competency.
            Description and slug refer to either competency_domain, competency or skill,
            depending on which of these is not empty for any given row.
        """
        framework = export_skills_competencies()
        response = HttpResponse(
            content_type="text/csv",
            headers={"Content-Disposition": 'attachment; filename="framework.csv"'},
        )
        writer = csv.writer(response)
        writer.writerow(
            ["competency_domain", "competency", "skill", "description", "slug"]
        )

        for domain in framework["competency_domains"]:
            writer.writerow(
                [domain["name"], "", "", domain["description"], domain["slug"]]
            )
            for competency in domain["competencies"]:
                writer.writerow(
                    [
                        "",
                        competency["name"],
                        "",
                        competency["description"],
                        competency["slug"],
                    ]
                )
                for skill in competency["skills"]:
                    writer.writerow(
                        [
                            "",
                            "",
                            skill["name"],
                            skill["description"],
                            skill["slug"],
                        ]
                    )

        return response
