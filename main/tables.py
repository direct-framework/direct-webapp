"""Tables module for the main app."""

from typing import TYPE_CHECKING

import django_tables2 as tables
from django.db.models.query import QuerySet
from django.urls import reverse
from django.utils.html import format_html
from django.utils.safestring import SafeString, mark_safe

from .models import LearningResource, Provider, Skill, ToolLanguageMethodology

if TYPE_CHECKING:  # pragma: no cover
    from django.db.models.fields.related_descriptors import ManyRelatedManager

external_link_html = (
    '<a href="{}" target="_blank" rel="noopener noreferrer" class="{}">{}</a>'
)
badge_html = '<span class="badge bg-secondary fs-sm">{}</span>'


def _render_skills(qs: QuerySet[Skill]) -> SafeString:
    """Helper function for rendering a list of skills.

    Each skill is rendered as a button linking to its detail page.
    """
    skill_link_html = (
        '<a href="{}" class="btn btn-outline-primary rounded-pill btn-sm">{}</a>'
    )
    return mark_safe(
        " ".join(
            format_html(
                skill_link_html,
                reverse("skill_detail", args=(skill.slug,)),
                skill.name,
            )
            for skill in qs
        )
    )


class ProviderTable(tables.Table):
    """Table class for the Learning Provider model."""

    class Meta:
        """Meta options for the ProviderTable."""

        model = Provider
        fields = ("name", "description", "url")
        order_by = "name"

    def render_name(self, value: str, record: Provider) -> SafeString:
        """Link the provider name to its detail page."""
        return format_html(
            '<a href="{}">{}</a>',
            reverse("learning_provider_detail", args=(record.slug,)),
            value,
        )

    def render_description(self, value: str) -> SafeString:
        """Render the description field."""
        return mark_safe(value)

    def render_url(self, value: str | None) -> SafeString:
        """Render the provider URL as an external link."""
        if not value:
            return mark_safe("")

        return format_html(
            external_link_html,
            value,
            "",
            "Visit website",
        )


class LearningResourceTable(tables.Table):
    """Table class for the LearningResources model."""

    skill_set = tables.ManyToManyColumn(verbose_name="Skills")

    class Meta:
        """Meta options for the LearningResourcesTable."""

        model = LearningResource
        fields = ("name", "description", "language", "provider", "skill_set")
        order_by = "name"

    def render_name(self, value: str, record: LearningResource) -> SafeString:
        """Include the URL in the name."""
        return format_html(external_link_html, record.url, "fs-lg", value)

    def render_description(self, value: str) -> SafeString:
        """Render the description field."""
        return mark_safe(value)

    def render_language(self, value: str) -> SafeString:
        """Render the language field as a badge."""
        return mark_safe(
            " ".join(format_html(badge_html, val.strip()) for val in value.split(","))
        )

    def render_provider(
        self, value: Provider | None, record: LearningResource
    ) -> SafeString:
        """Render the provider as a link to its detail page."""
        if value is None:
            return mark_safe("")

        return format_html(
            '<a href="{}">{}</a>',
            reverse(
                "learning_provider_detail",
                kwargs={"slug": value.slug},
            ),
            value.name,
        )

    def render_skill_set(self, value: "ManyRelatedManager[Skill]") -> SafeString:
        """Include the relevant skills as button links."""
        return _render_skills(value.all())


class ToolLanguageMethodologyTable(tables.Table):
    """Table class for the ToolLanguageMethodology model."""

    skill_set = tables.ManyToManyColumn(verbose_name="Skills")

    class Meta:
        """Meta options for the ToolLanguageMethodologyTable."""

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
