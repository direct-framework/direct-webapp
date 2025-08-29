"""Views for the main app."""

import logging
from json import dumps
from typing import TYPE_CHECKING, Any

from django.contrib import messages
from django.contrib.auth import get_user_model
from django.contrib.auth.mixins import LoginRequiredMixin
from django.forms import ModelForm
from django.http import HttpRequest, HttpResponse
from django.shortcuts import render
from django.urls import reverse_lazy
from django.views.generic.base import TemplateView
from django.views.generic.edit import FormView, UpdateView

from .forms import UserSkillsForm
from .models import SkillLevel, UserSkill

logger = logging.getLogger(__name__)

if TYPE_CHECKING:  # pragma: no cover
    from .models import User as UserType


User = get_user_model()


class AuthenticatedHttpRequest(HttpRequest):
    """Custom HttpRequest type for authenticated users."""

    user: "UserType"


def index(request: HttpRequest) -> HttpResponse:
    """View that renders the index/home page.

    Args:
      request: A GET request.
    """
    logger.info("Rendering index page.")
    skill_levels = SkillLevel.objects.all()
    skill_levels_data = [
        {
            "level": skill_level.level,
            "name": skill_level.name,
            "description": skill_level.description,
        }
        for skill_level in skill_levels
    ]
    context = {
        "skill_levels": dumps(skill_levels_data),
    }
    return render(request=request, template_name="main/index.html", context=context)


def privacy(request: HttpRequest) -> HttpResponse:
    """View that renders the privacy page.

    Args:
      request: A GET request.
    """
    logger.info("Rendering privacy page.")
    return render(request=request, template_name="main/privacy.html")


def skill_profile(request: HttpRequest) -> HttpResponse:
    """View that renders the skill profile page.

    Args:
      request: A GET request.
    """
    logger.info("Rendering skill_profile page.")
    user_skills = UserSkill.objects.filter(user=request.user.pk)
    user_skills_data = [
        {
            "skill": user_skill.skill.name,
            "category": user_skill.skill.category.name,
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
    context = {
        "user_data": dumps(user_skills_data),
        "skill_levels": dumps(skill_levels_data),
    }

    return render(
        request=request, template_name="main/user_skill_profile.html", context=context
    )


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


class AboutPageView(TemplateView):
    """View that renders the about page."""

    template_name = "main/about.html"


class TermsPageView(TemplateView):
    """View that renders the terms and conditions page."""

    template_name = "main/terms.html"


class ContactPageView(TemplateView):
    """View that renders the contact page."""

    template_name = "main/contact.html"


class SelfAssessPageView(LoginRequiredMixin, FormView[UserSkillsForm]):
    """View that renders the self-assessment questionnaire page."""

    request: AuthenticatedHttpRequest
    template_name = "main/self-assess.html"
    form_class = UserSkillsForm
    success_url = reverse_lazy("self-assess")

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
