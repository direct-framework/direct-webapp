"""Filters for browsing learning resources."""

from django import forms
from django.db.models import Q, QuerySet
from django_filters import CharFilter, FilterSet

from .models import LearningResource


class LearningResourceFilter(FilterSet):
    """Search learning resources through a single cross-field search box."""

    q = CharFilter(
        method="filter_search",
        label="Search learning resources",
        widget=forms.SearchInput(
            attrs={
                "id": "resource-filter",
                "placeholder": "Filter learning resources",
            }
        ),
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
