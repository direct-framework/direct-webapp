"""Views for the account-related pages of the main app."""

import logging
from json import dumps
from typing import TYPE_CHECKING, Any

from django.contrib import messages
from django.contrib.auth import get_user_model
from django.contrib.auth.mixins import LoginRequiredMixin
from django.forms import ModelForm
from django.http import HttpRequest, HttpResponse
from django.urls import reverse, reverse_lazy
from django.views.generic.base import RedirectView, TemplateView
from django.views.generic.edit import FormView, UpdateView

from ..forms import UserSkillsForm
from ..models import SkillLevel, UserSkill

logger = logging.getLogger(__name__)

if TYPE_CHECKING:  # pragma: no cover
    from ..models import User as UserType


class AuthenticatedHttpRequest(HttpRequest):
    """Custom HttpRequest type for authenticated users."""

    user: "UserType"


User = get_user_model()


class SkillProfileView(LoginRequiredMixin, TemplateView):
    """View that renders the skill profile page."""

    request: AuthenticatedHttpRequest
    template_name = "main/user_skill_profile.html"

    def get_context_data(self, **kwargs: Any) -> dict[str, Any]:
        """Add user skills and skill levels to the template context."""
        context = super().get_context_data(**kwargs)
        logger.info("Rendering skill_profile page.")

        user_skills = UserSkill.objects.filter(user=self.request.user.pk)
        user_skills_data = [
            {
                "skill": user_skill.skill.name,
                "competency": user_skill.skill.competency.name,
                "skill_level": user_skill.skill_level.level,
            }
            for user_skill in user_skills
        ]

        skill_levels = SkillLevel.objects.all()
        skill_levels_data = [
            {
                "level": skill_level.level,
                "name": skill_level.name,
                "description": skill_level.description,
            }
            for skill_level in skill_levels
        ]

        context["user_data"] = dumps(user_skills_data)
        context["skill_levels"] = dumps(skill_levels_data)
        return context


class AccountOverviewView(LoginRequiredMixin, RedirectView):
    """Route users to the appropriate account page based on their skills."""

    request: AuthenticatedHttpRequest

    def get_redirect_url(self, *args: Any, **kwargs: Any) -> str:
        """Redirect to skill profile if skills exist, otherwise self-assess."""
        if UserSkill.objects.filter(user=self.request.user).exists():
            return reverse("skill_profile")
        return reverse("self_assess")


class UserUpdateView(LoginRequiredMixin, UpdateView["UserType", ModelForm["UserType"]]):
    """View that renders the user update form page."""

    request: AuthenticatedHttpRequest
    model = User
    fields = ("username", "email")
    template_name_suffix = "_update_form"
    success_url = reverse_lazy("profile")

    def get_object(self, queryset: Any | None = None) -> "UserType":
        """Remove the need for url args by returning the current user."""
        return self.request.user


class SelfAssessPageView(LoginRequiredMixin, FormView[UserSkillsForm]):
    """View that renders the self-assessment questionnaire page."""

    request: AuthenticatedHttpRequest
    template_name = "main/user_self_assess.html"
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
