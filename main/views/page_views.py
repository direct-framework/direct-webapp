"""Views for the page-related pages of the main app."""

import csv
import json
import logging
from collections.abc import Mapping
from json import dumps
from pathlib import Path
from typing import Any

from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from django.templatetags.static import static
from django.views.generic.base import TemplateView

from ..models import CompetencyDomain, Skill, SkillLevel, Tool

logger = logging.getLogger(__name__)

User = get_user_model()


def _extract_and_combine_roles(
    sample_data_files: list[str | Path],
) -> list[dict[str, Any]]:
    """Read and combine multiple JSON files with sample user data."""
    combined_sample_data = []
    for file_path in sample_data_files:
        json_path = Path(file_path)
        if json_path.exists():
            with json_path.open() as f:
                data = json.load(f)
                if isinstance(data, list):
                    combined_sample_data.extend(data)
                else:
                    combined_sample_data.append(data)
    return combined_sample_data


class IndexPageView(TemplateView):
    """View that renders the index/home page."""

    template_name = "main/index.html"

    def get_context_data(self, **kwargs: Mapping[str, Any]) -> dict[str, Any]:
        """Add skill levels and sample profile data to the template context."""
        context = super().get_context_data(**kwargs)
        logger.info("Rendering index page.")

        context["sample_data"] = _extract_and_combine_roles(
            ["main/static/assets/sample_data/sample_profile_1.json"]
        )
        context["skill_levels"] = dumps(
            list(SkillLevel.objects.values("level", "name"))
        )

        return context


class PrivacyPageView(TemplateView):
    """View that renders the privacy page."""

    template_name = "main/pages/privacy.html"


class AboutPageView(TemplateView):
    """View that renders the about page."""

    template_name = "main/pages/about.html"


class TermsPageView(TemplateView):
    """View that renders the terms and conditions page."""

    template_name = "main/pages/terms.html"


class SkillLevelsPageView(TemplateView):
    """View that renders the skill levels page."""

    template_name = "main/pages/skill-levels.html"

    def get_context_data(self, **kwargs: Mapping[str, Any]) -> dict[str, Any]:
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

    def get_context_data(self, **kwargs: Mapping[str, Any]) -> dict[str, Any]:
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

    def get_context_data(self, **kwargs: Mapping[str, Any]) -> dict[str, Any]:
        """Add sample profile data to the template context."""
        context = super().get_context_data(**kwargs)

        context["sample_data"] = _extract_and_combine_roles(
            [
                "main/static/assets/sample_data/sample_profile_1.json",
                "main/static/assets/sample_data/sample_profile_41.json",
                "main/static/assets/sample_data/sample_profile_59.json",
            ]
        )
        context["skill_levels"] = dumps(
            list(SkillLevel.objects.values("level", "name"))
        )

        return context


class CompetenciesPageView(TemplateView):
    """View that renders the competencies page."""

    template_name = "main/pages/competencies.html"

    def get_context_data(self, **kwargs: Mapping[str, Any]) -> dict[str, Any]:
        """Add the competencies framework data to the template context."""
        context = super().get_context_data(**kwargs)

        domains = CompetencyDomain.objects.prefetch_related(
            "competency_set__skill_set"
        ).all()

        context["domains"] = domains
        return context


class SkillPageView(TemplateView):
    """View that renders a single skill page."""

    template_name = "main/pages/skill.html"

    def get_context_data(self, **kwargs: Mapping[str, Any]) -> dict[str, Any]:
        """Add the selected skill and related data to the template context."""
        context = super().get_context_data(**kwargs)

        slug = self.kwargs["slug"]
        skill = get_object_or_404(
            Skill.objects.select_related(
                "competency",
                "competency__competency_domain",
            ).prefetch_related(
                "related_skills",
                "learning_resources__provider",
                "tools",
            ),
            slug=slug,
        )

        tools_qs = skill.tools.all().order_by("name")
        context["skill"] = skill
        context["related_skills"] = skill.related_skills.all().order_by("name")
        context["learning_resources"] = skill.learning_resources.all().order_by("name")
        context["tools"] = tools_qs.filter(kind=Tool.Kind.TOOL)
        context["languages"] = tools_qs.filter(kind=Tool.Kind.LANGUAGE)
        context["methodologies"] = tools_qs.filter(kind=Tool.Kind.METHODOLOGY)

        return context
