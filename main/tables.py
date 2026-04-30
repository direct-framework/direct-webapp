"""Tables module for the main app."""

from typing import TYPE_CHECKING

import django_tables2 as tables
from django.db.models.query import QuerySet
from django.urls import reverse
from django.utils.html import format_html
from django.utils.safestring import SafeString, mark_safe

from .models import LearningResource, Skill, ToolLanguageMethodology

if TYPE_CHECKING:  # pragma: no cover
    from django.db.models.fields.related_descriptors import ManyRelatedManager

external_link_html = (
    '<a href="{}" target="_blank" rel="noopener noreferrer" class="{}">{}</a>'
)
badge_html = '<span class="badge bg-secondary fs-sm">{}</span>'


def _render_skills(qs: QuerySet[Skill]) -> SafeString:
    """Helper function for rendering skills links as buttons in tables."""
    return mark_safe(
        " ".join(
            format_html(
                external_link_html,
                reverse("skill_detail", args=(skill.slug,)),
                "btn btn-outline-primary rounded-pill btn-sm",
                skill.name,
            )
            for skill in qs
        )
    )


class LearningResourceTable(tables.Table):
    """Table class for the LearningResources model."""

    skill_set = tables.ManyToManyColumn(verbose_name="Skills")

    class Meta:
        """Meta options for the LearningResourcesTable."""

        model = LearningResource
        fields = ("name", "language", "provider")
        order_by = "name"

    def render_name(self, value: str, record: LearningResource) -> SafeString:
        """Include the URL in the name."""
        return format_html(external_link_html, record.url, "fs-lg", value)

    def render_language(self, value: str) -> SafeString:
        """Render the language field as a badge."""
        return mark_safe(
            " ".join(format_html(badge_html, val) for val in value.split(","))
        )

    def render_provider(self, value: str, record: LearningResource) -> SafeString:
        """Include the URL in the provider name."""
        if record.provider is None or not record.provider.url:
            return mark_safe(value)

        return format_html(external_link_html, record.provider.url, "", value)

    def render_skill_set(self, value: "ManyRelatedManager[Skill]") -> SafeString:
        """Include the relevant skills as button links."""
        return _render_skills(value.all())


class ToolLanguageMethodologyTable(tables.Table):
    """Table class for the LearningResources model."""

    skill_set = tables.ManyToManyColumn(verbose_name="Skills")

    class Meta:
        """Meta options for the LearningResourcesTable."""

        model = ToolLanguageMethodology
        fields = ("name", "kind")
        order_by = "name"

    def render_name(self, value: str, record: ToolLanguageMethodology) -> SafeString:
        """Include the URL in the name."""
        return format_html(external_link_html, record.url, "fs-lg", value)

    def render_kind(self, value: str) -> SafeString:
        """Render the kind field as a badge."""
        return format_html(badge_html, value)

    def render_skill_set(self, value: "ManyRelatedManager[Skill]") -> SafeString:
        """Include the relevant skills as button links."""
        return _render_skills(value.all())
