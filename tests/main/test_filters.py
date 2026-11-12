"""Tests for framework search filters."""

import pytest
from django_filters import FilterSet

from main.filters import (
    LearningProviderFilter,
    LearningProviderResourceFilter,
    LearningResourceFilter,
    ToolLanguageMethodologyFilter,
)
from main.models import LearningResource, Provider, Skill, ToolLanguageMethodology

pytestmark = pytest.mark.django_db


class SearchFilterTestMixin:
    """Share behavior tests across the framework search filters."""

    filterset_class: type[FilterSet]

    @pytest.fixture
    def model_objects(self):
        """Return the existing objects for this filter's model."""
        raise NotImplementedError

    @pytest.mark.parametrize("data", [{}, {"q": ""}, {"q": " "}])
    def test_empty_search_returns_all_objects(self, data, model_objects):
        """Empty and whitespace-only filters leave the queryset unchanged."""
        search_filter = self.filterset_class(data)

        assert search_filter.is_valid()
        assert list(search_filter.qs) == model_objects

    def test_search_with_no_matches(self, model_objects):
        """A nonmatching search returns no objects."""
        search_filter = self.filterset_class({"q": "missing"})

        assert search_filter.is_valid()
        assert not search_filter.qs.exists()

    def test_filter_has_only_one_search_field(self):
        """Only the single cross-field search is exposed."""
        assert list(self.filterset_class().form.fields) == ["q"]


class TestLearningResourceFilter(SearchFilterTestMixin):
    """Tests for searching learning resources."""

    filterset_class = LearningResourceFilter

    @pytest.fixture
    def model_objects(self, learning_resource):
        """Return the existing learning resource."""
        return [learning_resource]

    @pytest.mark.parametrize(
        "field",
        ["name", "description", "language", "provider__name", "skill__name"],
    )
    def test_search_matches_each_field(self, field, learning_resource, provider, skill):
        """Search each supported field case-insensitively and trim whitespace."""
        LearningResource.objects.create(name="Unrelated course")
        instance = learning_resource
        attribute = field
        value = "Needle"
        if field == "provider__name":
            instance, attribute = provider, "name"
        elif field == "skill__name":
            instance, attribute = skill, "name"
        elif field == "language":
            value = "fr"
        setattr(instance, attribute, value)
        instance.save()

        search_filter = self.filterset_class({"q": f"  {value.upper()}  "})

        assert search_filter.is_valid()
        assert list(search_filter.qs) == [learning_resource]

    def test_search_does_not_duplicate_resources(
        self, learning_resource, skill, competency
    ):
        """Matching multiple related skills still returns each resource once."""
        second_skill = Skill.objects.create(
            name="Another Skill", description="Another skill", competency=competency
        )
        second_skill.learning_resources.add(learning_resource)
        search_filter = self.filterset_class({"q": "Skill"})

        assert list(search_filter.qs) == [learning_resource]


class TestLearningProviderFilter(SearchFilterTestMixin):
    """Tests for searching the learning-provider list."""

    filterset_class = LearningProviderFilter

    @pytest.fixture
    def model_objects(self, provider):
        """Return the existing provider."""
        return [provider]

    @pytest.mark.parametrize("field", ["name", "description"])
    def test_search_matches_provider_fields(self, field, provider):
        """Search provider names and descriptions."""
        Provider.objects.create(name="Unrelated provider")
        setattr(provider, field, "Needle")
        provider.save()
        search_filter = self.filterset_class({"q": "needle"})

        assert search_filter.is_valid()
        assert list(search_filter.qs) == [provider]


class TestLearningProviderResourceFilter(SearchFilterTestMixin):
    """Tests for searching resources on a provider detail page."""

    filterset_class = LearningProviderResourceFilter

    @pytest.fixture
    def model_objects(self, learning_resource):
        """Return the existing provider's learning resource."""
        return [learning_resource]

    @pytest.mark.parametrize(
        "query", ["Learning Resource", "A learning resource", "en", "Skill"]
    )
    def test_search_matches_resource_details(
        self, query, learning_resource, provider, skill
    ):
        """Search matches resource details and related skills."""
        search_filter = self.filterset_class(
            {"q": query},
            queryset=LearningResource.objects.filter(provider=provider),
        )

        assert search_filter.is_valid()
        assert list(search_filter.qs) == [learning_resource]

    def test_search_does_not_match_provider_name(self, learning_resource, provider):
        """A provider name does not match each resource on its detail page."""
        search_filter = self.filterset_class(
            {"q": provider.name},
            queryset=LearningResource.objects.filter(provider=provider),
        )

        assert search_filter.is_valid()
        assert not search_filter.qs.exists()


class TestToolLanguageMethodologyFilter(SearchFilterTestMixin):
    """Tests for searching tools, languages, and methodologies."""

    filterset_class = ToolLanguageMethodologyFilter

    @pytest.fixture
    def model_objects(self, tool):
        """Return the existing tool."""
        return [tool]

    @pytest.mark.parametrize("field", ["name", "description", "kind"])
    def test_search_matches_tool_fields(self, field, tool):
        """Search tool names, descriptions, and kinds."""
        ToolLanguageMethodology.objects.create(
            name="Unrelated tool",
            description="Not a match",
            kind=ToolLanguageMethodology.Kind.LANGUAGE,
        )
        value = "Needle"
        if field == "kind":
            value = ToolLanguageMethodology.Kind.METHODOLOGY
        setattr(tool, field, value)
        tool.save()
        search_filter = self.filterset_class({"q": value.upper()})

        assert search_filter.is_valid()
        assert list(search_filter.qs) == [tool]
