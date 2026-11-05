"""Tests for learning resource filters."""

import pytest

from main.filters import LearningResourceFilter
from main.models import LearningResource, Skill

pytestmark = pytest.mark.django_db


@pytest.mark.parametrize(
    "field",
    ["name", "description", "language", "provider__name", "skill__name"],
)
def test_search_matches_each_field(field, learning_resource, provider, skill):
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

    resource_filter = LearningResourceFilter({"q": f"  {value.upper()}  "})

    assert resource_filter.is_valid()
    assert list(resource_filter.qs) == [learning_resource]


@pytest.mark.parametrize("data", [{}, {"q": ""}, {"q": " "}])
def test_empty_filters_return_all_resources(data, learning_resource):
    """Empty and whitespace-only filters leave the queryset unchanged."""
    resource_filter = LearningResourceFilter(data)

    assert resource_filter.is_valid()
    assert list(resource_filter.qs) == [learning_resource]


def test_search_with_no_matches(learning_resource):
    """A nonmatching search returns no resources."""
    resource_filter = LearningResourceFilter({"q": "missing"})

    assert resource_filter.is_valid()
    assert not resource_filter.qs.exists()


def test_filter_has_only_one_search_field():
    """Only the single cross-field search is exposed by django-filter."""
    assert list(LearningResourceFilter().form.fields) == ["q"]


def test_search_does_not_duplicate_resources(learning_resource, skill, competency):
    """Matching multiple related skills still returns each resource once."""
    second_skill = Skill.objects.create(
        name="Another Skill", description="Another skill", competency=competency
    )
    second_skill.learning_resources.add(learning_resource)
    resource_filter = LearningResourceFilter({"q": "Skill"})

    assert list(resource_filter.qs) == [learning_resource]
