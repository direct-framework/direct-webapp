"""Tables module for the main app."""

from typing import TYPE_CHECKING

import django_tables2 as tables
from django.urls import reverse
from django.utils.html import format_html
from django.utils.safestring import SafeString, mark_safe

from .models import LearningResource, Skill

if TYPE_CHECKING:  # pragma: no cover
    from django.db.models.fields.related_descriptors import ManyRelatedManager


class LearningResourcesTable(tables.Table):
    """Table class for the LearningResources model."""

    skill_set = tables.ManyToManyColumn(
        transform=lambda s: s.name, verbose_name="Related Skills"
    )

    class Meta:
        """Meta options for the LearningResourcesTable."""

        model = LearningResource
        fields = ("name", "language", "provider")
        order_by = "name"

    def render_name(self, value: str, record: LearningResource) -> SafeString:
        """Include the URL in the name."""
        return format_html(
            '<a href="{}" target="_blank" rel="noopener noreferrer">{}<a>',
            record.url,
            value,
        )

    def render_provider(self, value: str, record: LearningResource) -> SafeString:
        """Include the URL in the provider name."""
        if record.provider is None or not record.provider.url:
            return mark_safe(value)

        return format_html(
            '<a href="{}" target="_blank" rel="noopener noreferrer">{}<a>',
            record.provider.url,
            value,
        )

    def render_skill_set(self, value: "ManyRelatedManager[Skill]") -> SafeString:
        """Include the related skills as badges."""
        return mark_safe(
            "".join(
                format_html(
                    '<a href="{}" target="_blank" rel="noopener noreferrer" '
                    'class="badge bg-secondary">{}<a>',
                    reverse("skill_detail", args=(skill.slug,)),
                    skill.name,
                )
                for skill in value.all()
            )
        )
