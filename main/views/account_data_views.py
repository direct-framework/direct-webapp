"""Views for getting account-related data from the framework database."""

import csv

from django.http import (
    HttpResponse,
    JsonResponse,
)
from django.views import View

from ..models import User, UserSkill
from .account_views import AuthenticatedHttpRequest, TermsAcceptedMixin


class DownloadUserSkillDataMixin:
    """Mixin to provide functionality for downloading user skill data."""

    def _format_user_skill_data_for_download(
        self, user: User
    ) -> list[dict[str, str | int]]:
        user_skills = UserSkill.objects.filter(user=user.pk)
        return [
            {
                "skill": user_skill.skill.name,
                "competency_domain": user_skill.skill.competency.competency_domain.name,
                "competency": user_skill.skill.competency.name,
                "skill_level": user_skill.skill_level.level,
            }
            for user_skill in user_skills
        ]


class DownloadUserSkillDataCsvView(
    TermsAcceptedMixin, DownloadUserSkillDataMixin, View
):
    """A view that returns the user skill data as a CSV file."""

    def get(self, request: AuthenticatedHttpRequest) -> HttpResponse:
        """Handle GET request to download user skill data as CSV.

        Args:
            request: The HTTP request object.

        Returns:
            An HttpResponse containing the user skill data as a CSV file
        """
        user_skills_data = self._format_user_skill_data_for_download(request.user)
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


class DownloadUserSkillDataJSONView(
    TermsAcceptedMixin, DownloadUserSkillDataMixin, View
):
    """A view that returns the user skill data as a JSON file."""

    def get(self, request: AuthenticatedHttpRequest) -> JsonResponse:
        """Define the GET response.

        Args:
            request: The HTTP request object.

        Returns:
            A JsonResponse containing the user skill data in JSON format.
        """
        user_skills_data = self._format_user_skill_data_for_download(request.user)
        get_anonymous = request.GET.get("anonymous", "false").lower() == "true"
        returned_data = {
            "username": "anonymous" if get_anonymous else request.user.username,
            "user_data": user_skills_data,
        }
        return JsonResponse(
            returned_data,
            json_dumps_params=dict(indent=2),
            headers={"Content-Disposition": 'attachment; filename="downloaded_.json"'},
        )
