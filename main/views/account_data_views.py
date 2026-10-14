"""Views for getting account-related data from the framework database."""

import csv
import logging
from typing import TYPE_CHECKING, Any

from django.http import (
    HttpRequest,
    HttpResponse,
    HttpResponseForbidden,
    JsonResponse,
)
from django.http.response import HttpResponseBase
from django.views import View

from ..models import User, UserSkill

logger = logging.getLogger(__name__)


if TYPE_CHECKING:  # pragma: no cover
    from ..models import User as UserType


class _AuthenticatedHttpRequest(HttpRequest):
    """Custom HttpRequest type for authenticated users."""

    user: "UserType"


class _TermsAcceptedMixin:
    """Require authenticated users to accept terms before accessing endpoints."""

    terms_acceptance_url_name = "terms_acceptance"

    def dispatch(
        self, request: HttpRequest, *args: Any, **kwargs: Any
    ) -> HttpResponseBase:
        """Redirect to terms acceptance page when the user has not accepted terms."""
        if not request.user.is_authenticated:
            return HttpResponseForbidden(
                "User must be authenticated to access this resource."
            )

        if not request.user.agreed_to_tos:
            return HttpResponseForbidden(
                "User must accept the terms of service to access this resource."
            )
        return super().dispatch(request, *args, **kwargs)  # type: ignore


class AuthenticatedDataView(_TermsAcceptedMixin, View):
    """A base view that ensures the user is authenticated formats user data."""

    request: _AuthenticatedHttpRequest


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


class DownloadUserSkillDataCsvView(AuthenticatedDataView, DownloadUserSkillDataMixin):
    """A view that returns the user skill data as a CSV file."""

    def get(self, request: _AuthenticatedHttpRequest) -> HttpResponse:
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


class DownloadUserSkillDataJSONView(AuthenticatedDataView, DownloadUserSkillDataMixin):
    """A view that returns the user skill data as a JSON file."""

    def get(self, request: _AuthenticatedHttpRequest) -> JsonResponse:
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
