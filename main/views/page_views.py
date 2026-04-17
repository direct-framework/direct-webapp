"""Views for the page-related pages of the main app."""

import csv
import json
import logging
from collections.abc import Mapping
from json import dumps
from pathlib import Path
from typing import Any, ClassVar, cast

import markdown
import requests
from django.shortcuts import get_object_or_404
from django.templatetags.static import static
from django.utils.safestring import mark_safe
from django.views.generic.base import TemplateView
from django_tables2 import SingleTableView

from ..models import (
    CompetencyDomain,
    LearningResource,
    Skill,
    SkillLevel,
    ToolLanguageMethodology,
)
from ..tables import LearningResourcesTable

logger = logging.getLogger(__name__)


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

        sample_data = _extract_and_combine_roles(
            ["main/static/assets/sample_data/sample_profile_1.json"]
        )
        context["chart_data"] = dumps(sample_data)
        context["skill_levels"] = dumps(
            list(SkillLevel.objects.values("level", "name"))
        )
        return context


class PrivacyPageView(TemplateView):
    """View that renders the privacy page."""

    template_name = "main/pages/policies/privacy.html"


class AboutPageView(TemplateView):
    """View that renders the about page."""

    template_name = "main/pages/about.html"


class TermsPageView(TemplateView):
    """View that renders the terms and conditions page."""

    template_name = "main/pages/policies/terms.html"


class SkillLevelsPageView(TemplateView):
    """View that renders the skill levels page."""

    template_name = "main/pages/skill-levels.html"

    def get_context_data(self, **kwargs: Mapping[str, Any]) -> dict[str, Any]:
        """Add skill levels to the template context."""
        context = super().get_context_data(**kwargs)
        skill_levels = SkillLevel.objects.all().order_by("level")
        context["skill_levels"] = skill_levels
        return context


class LearningResourcesPageView(SingleTableView):
    """View that renders the page with all learning resources."""

    model = LearningResource
    table_class = LearningResourcesTable
    template_name = "main/pages/learning-resources.html"


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
                    image_path = row.get("Image")
                    events.append(
                        {
                            "title": row.get("Title", ""),
                            "start_date": row.get("Start Date", ""),
                            "end_date": row.get("End Date", ""),
                            "location": row.get("Location", ""),
                            "event_link": row.get("Event Link", ""),
                            "blog": row.get("Blog", ""),
                            "description": row.get("Description", ""),
                            "contributors": row.get("Contributors", ""),
                            "image": static(image_path) if image_path else None,
                        }
                    )

        events.sort(key=lambda e: cast(str, e["start_date"]), reverse=True)

        context["events"] = events
        return context


class RolesPageView(TemplateView):
    """View that renders the role profiles page."""

    template_name = "main/pages/roles.html"

    def get_context_data(self, **kwargs: Mapping[str, Any]) -> dict[str, Any]:
        """Add sample profile data to the template context."""
        context = super().get_context_data(**kwargs)

        sample_data = _extract_and_combine_roles(
            [
                "main/static/assets/sample_data/sample_profile_1.json",
                "main/static/assets/sample_data/sample_profile_41.json",
                "main/static/assets/sample_data/sample_profile_59.json",
            ]
        )
        context["chart_data"] = sample_data
        context["skill_levels"] = dumps(
            list(SkillLevel.objects.values("level", "name"))
        )
        return context


class SkillsAndCompetenciesPageView(TemplateView):
    """View that renders the competencies page."""

    template_name = "main/pages/skills-and-competencies.html"

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
        context["tools"] = tools_qs.filter(kind=ToolLanguageMethodology.Kind.TOOL)
        context["languages"] = tools_qs.filter(
            kind=ToolLanguageMethodology.Kind.LANGUAGE
        )
        context["methodologies"] = tools_qs.filter(
            kind=ToolLanguageMethodology.Kind.METHODOLOGY
        )

        return context


class FrameworkOverviewPageView(TemplateView):
    """View that renders an overview page for the framework."""

    template_name = "main/pages/framework-overview.html"


class GitHubMarkdownPageView(TemplateView):
    """Base view for pages that render markdown content fetched from GitHub."""

    github_raw_url = ""
    page_heading = ""
    unavailable_message = "Document is temporarily unavailable."
    markdown_extensions: ClassVar[list[str]] = ["fenced_code", "tables", "toc"]

    def get_markdown_content(self) -> str:
        """Fetch and convert remote markdown content to HTML."""
        if not self.github_raw_url:
            raise ValueError("github_raw_url must be set on GitHubMarkdownPageView")

        response = requests.get(self.github_raw_url, timeout=5)
        response.raise_for_status()
        return markdown.markdown(
            response.text,
            extensions=self.markdown_extensions,
        )

    def get_context_data(self, **kwargs: Mapping[str, Any]) -> dict[str, Any]:
        """Add rendered markdown content and page metadata to the context."""
        context = super().get_context_data(**kwargs)
        context["page_heading"] = self.page_heading

        try:
            context["markdown_content"] = mark_safe(self.get_markdown_content())
        except requests.RequestException:
            logger.exception("Failed to load markdown from %s", self.github_raw_url)
            context["markdown_content"] = mark_safe(
                f"<p>{self.unavailable_message}</p>"
            )

        return context


# @method_decorator(cache_page(60 * 60), name="dispatch")  # cache 1 hour
class GovernancePageView(GitHubMarkdownPageView):
    """View that renders the governance page from GitHub Markdown."""

    template_name = "main/pages/policies/governance.html"
    page_heading = "DIRECT Governance"
    unavailable_message = "Governance document is temporarily unavailable."

    github_raw_url = (
        "https://raw.githubusercontent.com/direct-framework/.github/main/GOVERNANCE.md"
    )


# @method_decorator(cache_page(60 * 60), name="dispatch")  # cache 1 hour
class LicensingPageView(GitHubMarkdownPageView):
    """View that renders the licensing page from GitHub Markdown."""

    template_name = "main/pages/policies/licensing.html"
    page_heading = "DIRECT Licensing"
    unavailable_message = "Licensing document is temporarily unavailable."

    github_raw_url = (
        "https://raw.githubusercontent.com/direct-framework/.github/main/LICENSING.md"
    )
