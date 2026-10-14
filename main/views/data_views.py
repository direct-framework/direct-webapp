"""Views for getting data from the framework database."""

import csv

from django.http import HttpRequest, HttpResponse, JsonResponse
from django.views import View

from ..io_resources import export_framework
from ..models import UserSkill


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


class DownloadUserSkillDataCsvView(View):
    """A view that returns the user skill data as a CSV file."""

    def get(self, request: HttpRequest) -> HttpResponse:
        """Define the GET response.

        Args:
            request: A GET request from the user.

        Returns:
            A HttpResponse containing the user skill data in CSV format.
        """
        user_skills = UserSkill.objects.filter(user=request.user.pk)
        user_skills_data = [
            {
                "skill": user_skill.skill.name,
                "competency_domain": user_skill.skill.competency.competency_domain.name,
                "competency": user_skill.skill.competency.name,
                "skill_level": user_skill.skill_level.level,
            }
            for user_skill in user_skills
        ]
        context = {}
        context["chart_data"] = [
            {
                "user_id": "root",
                "user_data": user_skills_data,
            }
        ]

        response = HttpResponse(
            content_type="text/csv",
            headers={"Content-Disposition": 'attachment; filename="downloaded_.csv"'},
        )
        writer = csv.writer(response)
        writer.writerow(["skill", "competency_domain", "competency", "skill_level"])
        for user_skill in user_skills_data:
            writer.writerow(
                [
                    user_skill["skill"],
                    user_skill["competency_domain"],
                    user_skill["competency"],
                    user_skill["skill_level"],
                ]
            )
        return response


class DownloadUserSkillDataJSONView(View):
    """A view that returns the user skill data as a JSON file."""

    def get(self, request: HttpRequest) -> JsonResponse:
        """Define the GET response.

        Args:
            request: A GET request from the user.

        Returns:
            A JsonResponse containing the user skill data in JSON format.
        """
        user_skills = UserSkill.objects.filter(user=request.user.pk)
        # get_anonymous url param
        get_anonymous = request.GET.get("anonymous", "false").lower() == "true"
        user_skills_data = [
            {
                "skill": user_skill.skill.name,
                "competency_domain": user_skill.skill.competency.competency_domain.name,
                "competency": user_skill.skill.competency.name,
                "skill_level": user_skill.skill_level.level,
            }
            for user_skill in user_skills
        ]
        returned_data = {
            "username": "anonymous" if get_anonymous else request.user.username,
            "user_data": user_skills_data,
        }
        return JsonResponse(returned_data, json_dumps_params=dict(indent=2))
