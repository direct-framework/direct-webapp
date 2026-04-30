"""Tests for the tables classes in the main app."""

import pytest
from django.urls import reverse

from main.models import LearningResource, Provider, Skill, ToolLanguageMethodology
from main.tables import LearningResourceTable, ToolLanguageMethodologyTable


@pytest.mark.django_db
def test_learning_resources_table_render_name(learning_resource: LearningResource):
    """Test the learning resource name renders as an external link."""
    table = LearningResourceTable([])

    rendered = table.render_name(learning_resource.name, learning_resource)

    assert str(rendered) == (
        f'<a href="{learning_resource.url}" target="_blank" '
        'rel="noopener noreferrer" class="fs-lg">Learning Resource</a>'
    )


@pytest.mark.django_db
def test_learning_resources_table_render_provider(learning_resource: LearningResource):
    """Test the provider name renders as an external link when a URL exists."""
    table = LearningResourceTable([])

    assert isinstance(learning_resource.provider, Provider)

    rendered = table.render_provider(learning_resource.provider.name, learning_resource)

    assert str(rendered) == (
        f'<a href="{learning_resource.provider.url}" target="_blank" '
        'rel="noopener noreferrer" class="">Provider</a>'
    )


@pytest.mark.django_db
def test_learning_resources_table_render_provider_without_url(
    learning_resource: LearningResource,
):
    """Test the provider name renders as plain text when no URL exists."""
    table = LearningResourceTable([])
    learning_resource.provider = None

    rendered = table.render_provider("Provider", learning_resource)

    assert str(rendered) == "Provider"


@pytest.mark.django_db
def test_learning_resources_table_render_skill_set(
    learning_resource: LearningResource, skill: Skill
):
    """Test related skills render as badge links."""
    table = LearningResourceTable([])

    rendered = table.render_skill_set(learning_resource.skill_set)  # type: ignore[arg-type]

    assert str(rendered) == (
        '<a href="{}" target="_blank" rel="noopener noreferrer" '
        'class="btn btn-outline-primary rounded-pill btn-sm">Skill</a>'
    ).format(reverse("skill_detail", args=(skill.slug,)))


@pytest.mark.django_db
def test_tool_language_methodology_table_render_name(
    tool: ToolLanguageMethodology,
):
    """Test the tool name renders as an external link."""
    table = ToolLanguageMethodologyTable([])

    rendered = table.render_name(tool.name, tool)

    assert str(rendered) == (
        f'<a href="{tool.url}" target="_blank" '
        'rel="noopener noreferrer" class="fs-lg">Tool</a>'
    )


@pytest.mark.django_db
def test_tool_language_methodology_table_render_kind(
    tool: ToolLanguageMethodology,
):
    """Test the tool kind renders as a badge."""
    table = ToolLanguageMethodologyTable([])

    rendered = table.render_kind(tool.kind)

    assert str(rendered) == '<span class="badge bg-secondary fs-sm">tool</span>'


@pytest.mark.django_db
def test_tool_language_methodology_table_render_skill_set(
    tool: ToolLanguageMethodology, skill: Skill
):
    """Test related skills render as badge links."""
    table = ToolLanguageMethodologyTable([])

    rendered = table.render_skill_set(tool.skill_set)  # type: ignore[arg-type]

    assert str(rendered) == (
        '<a href="{}" target="_blank" rel="noopener noreferrer" '
        'class="btn btn-outline-primary rounded-pill btn-sm">Skill</a>'
    ).format(reverse("skill_detail", args=(skill.slug,)))
