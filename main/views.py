"""Views for the main app."""

import json
import logging
from collections.abc import Mapping
from json import dumps
from pathlib import Path
from typing import TYPE_CHECKING, cast

from django.contrib.auth import get_user_model
from django.contrib.auth.mixins import LoginRequiredMixin
from django.db.models.query import QuerySet
from django.http import HttpRequest, HttpResponse
from django.shortcuts import render
from django.urls import reverse_lazy
from django.views.generic.base import TemplateView
from django.views.generic.edit import UpdateView

from .models import SkillLevel, UserSkill

logger = logging.getLogger(__name__)

if TYPE_CHECKING:  # pragma: no cover
    from .models import User as UserType

User = get_user_model()


def index(request: HttpRequest) -> HttpResponse:
    """View that renders the index/home page.

    Args:
      request: A GET request.
    """
    logger.info("Rendering index page.")
    return render(request=request, template_name="main/index.html")


def privacy(request: HttpRequest) -> HttpResponse:
    """View that renders the privacy page.

    Args:
      request: A GET request.
    """
    logger.info("Rendering privacy page.")
    return render(request=request, template_name="main/pages/privacy.html")


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


class UserUpdateView(LoginRequiredMixin, UpdateView):  # type: ignore[type-arg]
    """View that renders the user update form page."""

    model = User
    fields = ("username", "email")
    template_name_suffix = "_update_form"
    success_url = reverse_lazy("profile")

    def get_object(self, queryset: QuerySet["UserType"] | None = None) -> "UserType":
        """Remove the need for url args by returning the current user."""
        return cast("UserType", self.request.user)


class AboutPageView(TemplateView):
    """View that renders the about page."""

    template_name = "main/pages/about.html"


class TermsPageView(TemplateView):
    """View that renders the terms and conditions page."""

    template_name = "main/pages/terms.html"


class AccountOverviewPageView(TemplateView):
    """View that renders the account overview page."""

    template_name = "main/account/terms.html"


class CompetenciesPageView(TemplateView):
    """View that renders the competencies page."""

    template_name = "main/pages/competencies.html"

    def get_context_data(self, **kwargs: Mapping[str, object]) -> dict[str, object]:
        """Add the competencies framework data to the template context."""
        context = super().get_context_data(**kwargs)
        json_path = Path("data/skills-competencies-framework.json")
        with open(json_path) as f:
            framework = json.load(f)

        for category in framework.get("categories", []):
            category["competency_count"] = len(category.get("subcategories", []))
            category["skill_count"] = sum(
                len(sub.get("skills", [])) for sub in category.get("subcategories", [])
            )

        context["framework"] = framework
        return context


class ContactPageView(TemplateView):
    """View that renders the contact page."""

    template_name = "main/pages/contact.html"


class SelfAssessPageView(TemplateView):
    """View that renders the self-assessment questionnaire page."""

    template_name = "main/self-assess.html"
