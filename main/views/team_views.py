"""Views for team membership actions."""

from http import HTTPStatus
from typing import TYPE_CHECKING, cast

from django.contrib.auth.mixins import LoginRequiredMixin
from django.core.exceptions import ValidationError
from django.http import Http404, HttpRequest, HttpResponse
from django.shortcuts import render
from django.urls import reverse
from django.views import View

from ..models import Team, TeamMembership
from ..team_services import (
    accept_invitation,
    generate_invitation_token,
    resolve_invitation_token,
)
from .account_views import AuthenticatedHttpRequest

if TYPE_CHECKING:
    from ..models import User as UserType


class TeamInvitationLinkView(LoginRequiredMixin, View):
    """Let team managers generate links to share outside the application."""

    request: AuthenticatedHttpRequest
    template_name = "main/team_invitation_link.html"

    def _get_managed_team(self, team_slug: str) -> Team:
        """Return a team only when the current user can manage its members."""
        team = Team.objects.filter(slug=team_slug).first()
        if team is None or not self.request.user.has_perm(
            "main.manage_team_members", team
        ):
            raise Http404
        return team

    def get(self, request: HttpRequest, team_slug: str) -> HttpResponse:
        """Show the manager the action for generating a shareable link."""
        team = self._get_managed_team(team_slug)
        return render(request, self.template_name, {"team": team})

    def post(self, request: HttpRequest, team_slug: str) -> HttpResponse:
        """Generate and display a signed team link without storing it."""
        team = self._get_managed_team(team_slug)
        try:
            token = generate_invitation_token(
                team=team, invited_by=cast("UserType", request.user)
            )
        except ValidationError as exc:
            raise Http404 from exc
        invitation_url = request.build_absolute_uri(
            reverse(
                "team-invitation-accept",
                kwargs={"team_slug": team.slug, "token": token},
            )
        )
        return render(
            request,
            self.template_name,
            {"team": team, "invitation_url": invitation_url},
        )


class TeamInvitationAcceptView(LoginRequiredMixin, View):
    """Show and accept a signed invitation link for the signed-in user."""

    request: AuthenticatedHttpRequest
    template_name = "main/team_invitation_accept.html"
    invalid_template_name = "main/team_invitation_invalid.html"

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
            team = resolve_invitation_token(token=token)
        except ValidationError:
            return self._invalid_link_response(request)
        if team.slug != team_slug:
            return self._invalid_link_response(request)
        return render(
            request,
            self.template_name,
            {
                "team": team,
                "already_member": TeamMembership.objects.filter(
                    team=team, user=cast("UserType", request.user)
                ).exists(),
                "accepted": False,
            },
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
        return render(
            request,
            self.template_name,
            {
                "team": team,
                "already_member": not created,
                "accepted": created,
            },
        )
