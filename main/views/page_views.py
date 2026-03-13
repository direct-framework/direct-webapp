"""Views for the page-related pages of the main app."""

import csv
import json
import logging
from collections.abc import Mapping
from json import dumps
from pathlib import Path

from django.contrib.auth import get_user_model
from django.db.models import Q
from django.http import HttpRequest, HttpResponse
from django.shortcuts import get_object_or_404, render
from django.templatetags.static import static
from django.views.generic.base import TemplateView

from ..models import LearningResource, Skill, SkillLevel, Tool

logger = logging.getLogger(__name__)


User = get_user_model()


def index(request: HttpRequest) -> HttpResponse:
    """View that renders the index/home page."""
    logger.info("Rendering index page.")

    # Skill levels from the database
    skill_levels = SkillLevel.objects.all()
    skill_levels_data = [
        {
            "level": sl.level,
            "name": sl.name,
            "description": sl.description,
        }
        for sl in skill_levels
    ]

    # Combine multiple sample JSON files
    sample_data_files = [
        "main/static/assets/sample_data/sample_profile_1.json",
        "main/static/assets/sample_data/sample_profile_41.json",
        "main/static/assets/sample_data/sample_profile_59.json",
    ]

    combined_sample_data = []
    for file_path in sample_data_files:
        json_path = Path(file_path)
        if json_path.exists():
            with open(json_path) as f:
                data = json.load(f)
                if isinstance(data, list):
                    combined_sample_data.extend(data)
                else:
                    combined_sample_data.append(data)

    context = {
        "skill_levels": dumps(skill_levels_data),
        "sample_data": dumps(combined_sample_data),
    }

    return render(request=request, template_name="main/index.html", context=context)


def privacy(request: HttpRequest) -> HttpResponse:
    """View that renders the privacy page.

    Args:
      request: A GET request.
    """
    logger.info("Rendering privacy page.")
    return render(request=request, template_name="main/pages/privacy.html")


class AboutPageView(TemplateView):
    """View that renders the about page."""

    template_name = "main/pages/about.html"


class TermsPageView(TemplateView):
    """View that renders the terms and conditions page."""

    template_name = "main/pages/terms.html"


class SkillLevelsPageView(TemplateView):
    """View that renders the skill levels page."""

    template_name = "main/pages/skill-levels.html"

    def get_context_data(self, **kwargs: Mapping[str, object]) -> dict[str, object]:
        """Add skill levels to the template context."""
        context = super().get_context_data(**kwargs)
        skill_levels = SkillLevel.objects.all().order_by("level")
        context["skill_levels"] = skill_levels
        return context


class TrainingPageView(TemplateView):
    """View that renders the training page."""

    template_name = "main/pages/training.html"


class GetInvolvedPageView(TemplateView):
    """View that renders the get involved page."""

    template_name = "main/pages/get-involved.html"


class EventsPageView(TemplateView):
    """View that renders the events page."""

    template_name = "main/pages/events.html"

    def get_context_data(self, **kwargs: Mapping[str, object]) -> dict[str, object]:
        """Add events from CSV to the template context."""
        context = super().get_context_data(**kwargs)
        csv_path = Path("data/events.csv")
        events = []

        if csv_path.exists():
            with open(csv_path, newline="", encoding="utf-8") as csvfile:
                reader = csv.DictReader(csvfile)
                for row in reader:
                    events.append(
                        {
                            "title": row.get("Title", ""),
                            "start_date": row.get("Start Date", ""),
                            "end_date": row.get("End Date", ""),
                            "description": row.get("Description", ""),
                            "contributors": row.get("Contributors", ""),
                            "image": static(
                                row.get("Image", "assets/img/blog/single/image.jpg")
                            ),
                        }
                    )

        events.sort(key=lambda e: e["start_date"], reverse=True)

        context["events"] = events
        return context


class RolesPageView(TemplateView):
    """View that renders the role profiles page."""

    template_name = "main/pages/roles.html"

    def get_context_data(self, **kwargs: Mapping[str, object]) -> dict[str, object]:
        """Add sample profile data to the template context."""
        context = super().get_context_data(**kwargs)

        # Skill levels from the database
        skill_levels = SkillLevel.objects.all()
        skill_levels_data = [
            {
                "level": sl.level,
                "name": sl.name,
                "description": sl.description,
            }
            for sl in skill_levels
        ]

        # Combine multiple sample JSON files
        sample_data_files = [
            "main/static/assets/sample_data/sample_profile_1.json",
            "main/static/assets/sample_data/sample_profile_41.json",
            "main/static/assets/sample_data/sample_profile_59.json",
        ]

        combined_sample_data = []
        for file_path in sample_data_files:
            json_path = Path(file_path)
            if json_path.exists():
                with open(json_path) as f:
                    data = json.load(f)
                    if isinstance(data, list):
                        combined_sample_data.extend(data)
                    else:
                        combined_sample_data.append(data)

        context["skill_levels"] = skill_levels_data
        context["sample_data"] = combined_sample_data
        return context


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


class SkillPageView(TemplateView):
    """View that renders the skill details page."""

    template_name = "main/pages/skill-page.html"

    def get_context_data(self, **kwargs: Mapping[str, object]) -> dict[str, object]:
        """Add skill data and related resources to the template context."""
        context = super().get_context_data(**kwargs)
        slug = self.kwargs["slug"]

        skill = get_object_or_404(
            Skill.objects.select_related(
                "competency", "competency__competency_domain"
            ).prefetch_related("related_skills", "tools", "learning_resources"),
            slug=slug,
        )

        all_learning_resources = (
            LearningResource.objects.filter(Q(skill=skill) | Q(tool__skill=skill))
            .select_related("provider")
            .distinct()
            .order_by("name")
        )

        tools = skill.tools.order_by("name")
        context["skill"] = skill
        context["related_skills"] = skill.related_skills.order_by("name")
        context["learning_resources"] = all_learning_resources
        context["tools"] = tools.filter(kind=Tool.Kind.TOOL)
        context["languages"] = tools.filter(kind=Tool.Kind.LANGUAGE)
        context["methodologies"] = tools.filter(kind=Tool.Kind.METHODOLOGY)
        return context
