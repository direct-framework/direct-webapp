"""Filters for browsing framework resources."""

from django import forms
from django.db.models import Q, QuerySet
from django_filters import CharFilter, FilterSet

from .models import LearningResource, Provider, ToolLanguageMethodology


def _search_filter(*, label: str, input_id: str, placeholder: str) -> CharFilter:
    """Create the shared single-field search control."""
    return CharFilter(
        method="filter_search",
        label=label,
        widget=forms.SearchInput(
            attrs={
                "class": "form-control",
                "id": input_id,
                "placeholder": placeholder,
                "size": 25,
            }
        ),
    )


class LearningResourceFilter(FilterSet):
    """Search learning resources through a single cross-field search box."""

    q = _search_filter(
        label="Search learning resources",
        input_id="resource-filter",
        placeholder="Filter learning resources",
    )

    class Meta:
        """Limit filtering to the explicitly supported query parameters."""

        model = LearningResource
        fields = ("q",)

    def filter_search(
        self,
        queryset: QuerySet[LearningResource],
        name: str,
        value: str,
    ) -> QuerySet[LearningResource]:
        """Search resource details and related names without duplicate rows."""
        return queryset.filter(
            Q(name__icontains=value)
            | Q(description__icontains=value)
            | Q(language__icontains=value)
            | Q(provider__name__icontains=value)
            | Q(skill__name__icontains=value)
        ).distinct()


class LearningProviderFilter(FilterSet):
    """Search providers by name and description."""

    q = _search_filter(
        label="Search learning providers",
        input_id="provider-filter",
        placeholder="Filter providers",
    )

    class Meta:
        """Limit filtering to the explicitly supported query parameters."""

        model = Provider
        fields = ("q",)

    def filter_search(
        self,
        queryset: QuerySet[Provider],
        name: str,
        value: str,
    ) -> QuerySet[Provider]:
        """Search provider names and descriptions."""
        return queryset.filter(
            Q(name__icontains=value) | Q(description__icontains=value)
        )


class LearningProviderResourceFilter(FilterSet):
    """Search the learning resources listed on a provider detail page."""

    q = _search_filter(
        label="Search learning resources",
        input_id="provider-resource-filter",
        placeholder="Filter learning resources",
    )

    class Meta:
        """Limit filtering to the explicitly supported query parameters."""

        model = LearningResource
        fields = ("q",)

    def filter_search(
        self,
        queryset: QuerySet[LearningResource],
        name: str,
        value: str,
    ) -> QuerySet[LearningResource]:
        """Search resource details and skills without matching the provider name."""
        return queryset.filter(
            Q(name__icontains=value)
            | Q(description__icontains=value)
            | Q(language__icontains=value)
            | Q(skill__name__icontains=value)
        ).distinct()


class ToolLanguageMethodologyFilter(FilterSet):
    """Search tools, languages, and methodologies by their displayed details."""

    q = _search_filter(
        label="Search tools, languages and methodologies",
        input_id="tool-filter",
        placeholder="Filter tools, languages and methodologies",
    )

    class Meta:
        """Limit filtering to the explicitly supported query parameters."""

        model = ToolLanguageMethodology
        fields = ("q",)

    def filter_search(
        self,
        queryset: QuerySet[ToolLanguageMethodology],
        name: str,
        value: str,
    ) -> QuerySet[ToolLanguageMethodology]:
        """Search tool names, descriptions, and kinds."""
        return queryset.filter(
            Q(name__icontains=value)
            | Q(description__icontains=value)
            | Q(kind__icontains=value)
        )
