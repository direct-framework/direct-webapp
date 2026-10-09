"""Filters for searchable learning resource and provider tables."""

from typing import ClassVar

from django.db.models import Q, QuerySet
from django_filters import CharFilter, FilterSet

from .models import LearningResource, Provider


class ProviderFilter(FilterSet):
    """Search learning providers by name or description."""

    q = CharFilter(method="filter_search", label="")

    class Meta:
        """Configure the provider model and available filters."""

        model = Provider
        fields: ClassVar[list[str]] = []

    def filter_search(
        self, queryset: QuerySet[Provider], name: str, value: str
    ) -> QuerySet[Provider]:
        """Filter providers using the search term."""
        return queryset.filter(
            Q(name__icontains=value) | Q(description__icontains=value)
        ).distinct()


class LearningResourceFilter(FilterSet):
    """Search learning resources and their related providers and skills."""

    q = CharFilter(method="filter_search", label="")

    class Meta:
        """Configure the learning resource model and available filters."""

        model = LearningResource
        fields: ClassVar[list[str]] = []

    def filter_search(
        self, queryset: QuerySet[LearningResource], name: str, value: str
    ) -> QuerySet[LearningResource]:
        """Filter resources using the search term."""
        return queryset.filter(
            Q(name__icontains=value)
            | Q(description__icontains=value)
            | Q(language__icontains=value)
            | Q(provider__name__icontains=value)
            | Q(skill__name__icontains=value)
        ).distinct()
