"""Tests for the tables classes in the main app."""

import pytest
from django.urls import reverse

from main.models import LearningResource, Provider, Skill
from main.tables import LearningResourcesTable


@pytest.mark.django_db
def test_learning_resources_table_render_name(learning_resource: LearningResource):
    """Test the learning resource name renders as an external link."""
    table = LearningResourcesTable([])

    rendered = table.render_name(learning_resource.name, learning_resource)

    assert str(rendered) == (
        f'<a href="{learning_resource.url}" target="_blank" '
        'rel="noopener noreferrer">Learning Resource</a>'
    )


@pytest.mark.django_db
def test_learning_resources_table_render_provider(learning_resource: LearningResource):
    """Test the provider name renders as an external link when a URL exists."""
    table = LearningResourcesTable([])

    assert isinstance(learning_resource.provider, Provider)

    rendered = table.render_provider(learning_resource.provider.name, learning_resource)

    assert str(rendered) == (
        f'<a href="{learning_resource.provider.url}" target="_blank" '
        'rel="noopener noreferrer">Provider</a>'
    )


@pytest.mark.django_db
def test_learning_resources_table_render_provider_without_url(
    learning_resource: LearningResource,
):
    """Test the provider name renders as plain text when no URL exists."""
    table = LearningResourcesTable([])
    learning_resource.provider = None

    rendered = table.render_provider("Provider", learning_resource)

    assert str(rendered) == "Provider"


@pytest.mark.django_db
def test_learning_resources_table_render_skill_set(
    learning_resource: LearningResource, skill: Skill
):
    """Test related skills render as badge links."""
    table = LearningResourcesTable([])

    rendered = table.render_skill_set(learning_resource.skill_set)  # type: ignore[arg-type]

    assert str(rendered) == (
        '<a href="{}" target="_blank" rel="noopener noreferrer" '
        'class="badge bg-secondary">Skill</a>'
    ).format(reverse("skill_detail", args=(skill.slug,)))
