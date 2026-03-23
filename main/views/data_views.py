"""Views for getting data from the framework database."""

from django.http import HttpRequest, JsonResponse
from django.views import View

from ..io_resources import export_framework


class FrameworkView(View):
    """A view that returns the core framework as a JSON string."""

    def get(self, request: HttpRequest) -> JsonResponse:
        """Define the GET response.

        Args:
            request: A GET request with no required parameters.

        Returns:
            A string of the full framework in JSON format. The top-level components are:
                - competency_domains: A list of the Competency Domains
                - competencies: A list of the Competencies
                - skills: A list of the Skills
                - skill_levels: A list of the Skill Levels
        """
        return JsonResponse(export_framework(), json_dumps_params=dict(indent=2))
