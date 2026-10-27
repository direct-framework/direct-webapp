"""Views for getting account-related data from the framework database."""

import csv

from django.http import (
    HttpResponse,
    JsonResponse,
)
from django.views import View

from ..models import Profile, SkillProfile
from .account_views import AuthenticatedHttpRequest, TermsAcceptedMixin


def format_skill_profile_data_for_download(
    profile: Profile,
) -> list[dict[str, str | int]]:
    """Format the skill profile data for download."""
    skill_profiles = SkillProfile.objects.filter(profile=profile)
    return [
        {
            "skill": skill_profile.skill.name,
            "competency_domain": skill_profile.skill.competency.competency_domain.name,
            "competency": skill_profile.skill.competency.name,
            "skill_level": skill_profile.skill_level.level,
        }
        for skill_profile in skill_profiles
    ]


class DownloadSkillProfileDataCsvView(TermsAcceptedMixin, View):
    """A view that returns the skill profile data as a CSV file."""

    def get(self, request: AuthenticatedHttpRequest) -> HttpResponse:
        """Handle GET request to download skill profile data as CSV.

        Args:
            request: The HTTP request object.

        Returns:
            An HttpResponse containing the skill profile data as a CSV file
        """
        skill_profile_data = format_skill_profile_data_for_download(
            request.user.profile
        )
        response = HttpResponse(
            content_type="text/csv",
            headers={"Content-Disposition": 'attachment; filename="skill_profile.csv"'},
        )
        writer = csv.writer(response)
        writer.writerow(["skill", "competency_domain", "competency", "skill_level"])
        for skill_profile in skill_profile_data:
            writer.writerow(
                [
                    skill_profile["skill"],
                    skill_profile["competency_domain"],
                    skill_profile["competency"],
                    skill_profile["skill_level"],
                ]
            )
        return response


class DownloadSkillProfileDataJSONView(TermsAcceptedMixin, View):
    """A view that returns the skill profile data as a JSON file."""

    def get(self, request: AuthenticatedHttpRequest) -> JsonResponse:
        """Define the GET response.

        Args:
            request: The HTTP request object.

        Returns:
            A JsonResponse containing the skill profile data in JSON format.
        """
        skill_profile_data = format_skill_profile_data_for_download(
            request.user.profile
        )
        get_anonymous = request.GET.get("anonymous", "false").lower() == "true"
        returned_data = {
            "username": "anonymous" if get_anonymous else request.user.username,
            "skill_profile_data": skill_profile_data,
        }
        return JsonResponse(
            returned_data,
            json_dumps_params=dict(indent=2),
            headers={
                "Content-Disposition": 'attachment; filename="skill_profile.json"'
            },
        )
