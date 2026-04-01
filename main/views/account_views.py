"""Views for the account-related pages of the main app."""

import logging
from json import dumps
from typing import TYPE_CHECKING, Any, cast

from django.contrib import messages
from django.contrib.auth import get_user_model
from django.contrib.auth.mixins import LoginRequiredMixin
from django.forms import ModelForm
from django.http import HttpRequest, HttpResponse, HttpResponseRedirect
from django.http.response import HttpResponseBase
from django.urls import reverse, reverse_lazy
from django.utils import timezone
from django.views.generic.base import RedirectView, TemplateView
from django.views.generic.edit import FormView, UpdateView

from ..forms import TermsAcceptanceForm, UserSkillsForm
from ..models import SkillLevel, UserSkill

logger = logging.getLogger(__name__)

if TYPE_CHECKING:  # pragma: no cover
    from ..models import User as UserType


class AuthenticatedHttpRequest(HttpRequest):
    """Custom HttpRequest type for authenticated users."""

    user: "UserType"


User = get_user_model()


class TermsAcceptedMixin(LoginRequiredMixin):
    """Require authenticated users to accept terms before accessing account pages."""

    terms_acceptance_url_name = "terms_acceptance"

    def dispatch(
        self, request: HttpRequest, *args: Any, **kwargs: Any
    ) -> HttpResponseBase:
        """Redirect to terms acceptance page when the user has not accepted terms."""
        if not request.user.is_authenticated:
            return self.handle_no_permission()

        if request.user.agreed_to_tos:
            return super().dispatch(request, *args, **kwargs)

        resolver_match = request.resolver_match
        if resolver_match and resolver_match.url_name == self.terms_acceptance_url_name:
            return super().dispatch(request, *args, **kwargs)

        return HttpResponseRedirect(reverse(self.terms_acceptance_url_name))


class TermsAcceptanceView(LoginRequiredMixin, FormView[TermsAcceptanceForm]):
    """Prompt authenticated users to accept terms before continuing."""

    template_name = "main/terms_acceptance.html"
    form_class = TermsAcceptanceForm
    success_url = reverse_lazy("account-overview")

    def form_valid(self, form: TermsAcceptanceForm) -> HttpResponse:
        """Persist acceptance and the acceptance timestamp."""
        user = cast("UserType", self.request.user)
        user.agreed_to_tos = form.cleaned_data["tos"]
        user.date_agreed = timezone.now()
        user.save(update_fields=["agreed_to_tos", "date_agreed"])
        return HttpResponseRedirect(str(self.success_url))


class SkillProfileView(TermsAcceptedMixin, TemplateView):
    """View that renders the skill profile page."""

    request: AuthenticatedHttpRequest
    template_name = "main/user-skills-profile.html"

    def get_context_data(self, **kwargs: Any) -> dict[str, Any]:
        """Add user skills and skill levels to the template context."""
        context = super().get_context_data(**kwargs)
        logger.info("Rendering skills-profile page.")

        user_skills = UserSkill.objects.filter(user=self.request.user.pk)
        user_skills_data = [
            {
                "skill": user_skill.skill.name,
                "category": user_skill.skill.competency.competency_domain.name,
                "subcategory": user_skill.skill.competency.name,
                "skill_level": user_skill.skill_level.level,
            }
            for user_skill in user_skills
        ]

        context["chart_data"] = dumps(
            [
                {
                    "user_id": "root",
                    "user_data": user_skills_data,
                }
            ]
        )
        context["skill_levels"] = dumps(
            list(SkillLevel.objects.values("level", "name"))
        )
        return context


class AccountOverviewView(TermsAcceptedMixin, RedirectView):
    """Route users to the appropriate account page based on their skills."""

    request: AuthenticatedHttpRequest

    def get_redirect_url(self, *args: Any, **kwargs: Any) -> str:
        """Redirect to skill profile if skills exist, otherwise self-assess."""
        if UserSkill.objects.filter(user=self.request.user).exists():
            return reverse("skills_profile")
        return reverse("self_assess")


class UserUpdateView(TermsAcceptedMixin, UpdateView["UserType", ModelForm["UserType"]]):
    """View that renders the user update form page."""

    request: AuthenticatedHttpRequest
    model = User
    fields = ("username", "email", "first_name", "last_name")
    template_name_suffix = "-update-form"
    success_url = reverse_lazy("profile")

    def get_object(self, queryset: Any | None = None) -> "UserType":
        """Remove the need for url args by returning the current user."""
        return self.request.user


class SelfAssessPageView(TermsAcceptedMixin, FormView[UserSkillsForm]):
    """View that renders the self-assessment questionnaire page."""

    request: AuthenticatedHttpRequest
    template_name = "main/user-self-assess.html"
    form_class = UserSkillsForm
    success_url = reverse_lazy("self_assess")

    def get_form_kwargs(self) -> dict[str, Any]:
        """Return the keyword arguments for instantiating the form."""
        kwargs = super().get_form_kwargs()
        kwargs["user"] = self.request.user
        return kwargs

    def form_valid(self, form: UserSkillsForm) -> HttpResponse:
        """Handle valid form submission."""
        created_skills, updated_skills = form.save(self.request.user)

        # Add success messages
        if created_skills:
            messages.success(
                self.request,
                f"Successfully created {len(created_skills)} new skill assessments.",
            )
        if updated_skills:
            messages.success(
                self.request,
                f"Successfully updated {len(updated_skills)} "
                f"existing skill assessments.",
            )

        return super().form_valid(form)
