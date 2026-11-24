"""Views for team membership actions."""

from collections.abc import Iterable
from http import HTTPStatus
from json import dumps
from typing import TYPE_CHECKING, Any, cast

from django.conf import settings
from django.core.exceptions import ValidationError
from django.http import Http404, HttpRequest, HttpResponse
from django.shortcuts import get_object_or_404, render
from django.urls import reverse
from django.views.generic import TemplateView
from guardian.mixins import PermissionRequiredMixin

from ..models import SkillLevel, Team, TeamMembership
from ..team_services import (
    accept_invitation,
    aggregate_team_skill_profile,
    generate_invitation_token,
    resolve_invitation_token,
)
from .account_views import AuthenticatedHttpRequest, TermsAcceptedMixin

if TYPE_CHECKING:
    from ..models import User as UserType


class TeamDetailView(TermsAcceptedMixin, PermissionRequiredMixin, TemplateView):
    """Show a team to its members."""

    request: AuthenticatedHttpRequest
    template_name = "main/team-detail.html"
    login_url: str = str(settings.LOGIN_URL)
    permission_required = "main.view_team"
    accept_global_perms = False
    return_404 = True
    team: Team

    def get_permission_object(self) -> Team:
        """Return the team whose member permission is required."""
        self.team = get_object_or_404(Team, slug=self.kwargs["team_slug"])
        return self.team

    def get_context_data(self, **kwargs: Any) -> dict[str, Any]:
        """Add the team, its sorted roster and its aggregate skill profile."""
        context = super().get_context_data(**kwargs)
        context["team"] = self.team
        memberships = self.team.members.select_related("user")
        context["managers"] = _sorted_by_name(m.user for m in memberships if m.manager)
        context["members"] = _sorted_by_name(
            m.user for m in memberships if not m.manager
        )
        aggregate = aggregate_team_skill_profile(team=self.team)
        context["has_aggregate"] = bool(aggregate)
        context["chart_data"] = dumps(
            [{"user_id": "team", "skill_profile_data": aggregate}]
        )
        context["skill_levels"] = dumps(
            list(SkillLevel.objects.values("level", "name"))
        )
        return context


def _display_name(user: "UserType") -> str:
    """Return a person's full name, or their username if they have none."""
    return user.get_full_name() or user.username


def _sorted_by_name(users: Iterable["UserType"]) -> list["UserType"]:
    """Sort people alphabetically by the name the team page shows."""
    return sorted(users, key=lambda user: _display_name(user).casefold())


class TeamInvitationLinkView(TermsAcceptedMixin, PermissionRequiredMixin, TemplateView):
    """Let team managers generate links to share outside the application."""

    request: AuthenticatedHttpRequest
    template_name = "main/team_invitation_link.html"
    login_url: str = str(settings.LOGIN_URL)
    permission_required = "main.manage_team_members"
    accept_global_perms = False
    return_404 = True
    team: Team

    def get_permission_object(self) -> Team:
        """Return the team whose manager permission is required."""
        self.team = get_object_or_404(Team, slug=self.kwargs["team_slug"])
        return self.team

    def get_context_data(self, **kwargs: Any) -> dict[str, Any]:
        """Add the managed team and any generated link to the template context."""
        context = super().get_context_data(**kwargs)
        context["team"] = self.team
        return context

    def post(self, request: HttpRequest, team_slug: str) -> HttpResponse:
        """Generate and display a signed team link without storing it."""
        try:
            token = generate_invitation_token(
                team=self.team, invited_by=cast("UserType", request.user)
            )
        except ValidationError as exc:
            raise Http404 from exc
        invitation_url = request.build_absolute_uri(
            reverse(
                "team-invitation-accept",
                kwargs={"team_slug": self.team.slug, "token": token},
            )
        )
        return self.render_to_response(
            self.get_context_data(invitation_url=invitation_url)
        )


class TeamInvitationAcceptView(TermsAcceptedMixin, TemplateView):
    """Show and accept a signed invitation link for the signed-in user."""

    request: AuthenticatedHttpRequest
    template_name = "main/team_invitation_accept.html"
    invalid_template_name = "main/team_invitation_invalid.html"
    team: Team

    def _invalid_link_response(self, request: HttpRequest) -> HttpResponse:
        """Render the recovery instruction for expired or invalid links."""
        return render(
            request,
            self.invalid_template_name,
            status=HTTPStatus.BAD_REQUEST,
        )

    def get(self, request: HttpRequest, team_slug: str, token: str) -> HttpResponse:
        """Show team details and require a separate POST to join."""
        try:
            self.team = resolve_invitation_token(token=token)
        except ValidationError:
            return self._invalid_link_response(request)
        if self.team.slug != team_slug:
            return self._invalid_link_response(request)
        return self.render_to_response(
            self.get_context_data(
                team=self.team,
                already_member=TeamMembership.objects.filter(
                    team=self.team, user=cast("UserType", request.user)
                ).exists(),
                accepted=False,
            )
        )

    def post(self, request: HttpRequest, team_slug: str, token: str) -> HttpResponse:
        """Create regular membership only after explicit acceptance."""
        try:
            team, created = accept_invitation(
                token=token,
                team_slug=team_slug,
                user=cast("UserType", request.user),
            )
        except ValidationError:
            return self._invalid_link_response(request)
        return self.render_to_response(
            self.get_context_data(
                team=team,
                already_member=not created,
                accepted=created,
            )
        )
