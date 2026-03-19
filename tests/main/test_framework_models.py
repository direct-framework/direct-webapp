"""Test suite for the framework related models."""

import pytest
from django.core.exceptions import ValidationError
from django.db import models

from main.models import (
    Competency,
    CompetencyDomain,
    LearningResource,
    NamedModel,
    Provider,
    Skill,
    SkillLevel,
    SluggedModel,
    Tool,
)


def test_named_model(mocker) -> None:
    """Test the abstract NamedModel provides correct behaviour to children."""

    class TestModel(NamedModel):
        class Meta:
            app_label = "test_abstract_model"

    instance = TestModel(name="Test Name", description="Test Description")
    assert instance.name == str(instance) == "Test Name"
    assert instance.description == "Test Description"

    # Test save method calls clean_fields to validate the data
    mock_save = mocker.patch.object(models.Model, "save", autospec=True)
    mock_full_clean = mocker.patch.object(models.Model, "full_clean", autospec=True)
    instance.save()
    mock_save.assert_called_once()
    mock_full_clean.assert_called_once_with(instance)


def test_slugged_model(mocker) -> None:
    """Test the abstract SluggedModel provides correct behaviour to children."""

    class TestModel(SluggedModel):
        class Meta:
            app_label = "test_abstract_model"

    instance = TestModel(name="Test Name", description="Test Description")
    assert instance.name == str(instance) == "Test Name"
    assert instance.description == "Test Description"
    assert instance.slug == ""

    # Test save method calls validate_unique to auto-generate slug
    mock_save = mocker.patch.object(NamedModel, "save", autospec=True)
    mock_val_unique = mocker.patch.object(NamedModel, "validate_unique", autospec=True)
    instance.save()
    assert instance.slug == "test-name"
    mock_save.assert_called_once()
    mock_val_unique.assert_called_once_with(
        instance, exclude=["id", "name", "description"]
    )


@pytest.mark.django_db
def test_slug_collision(competency_domain: CompetencyDomain) -> None:
    """Test that slug collision edge cases are handled by validate_unique."""
    with pytest.raises(
        ValidationError, match=r"Auto-generated slug 'competency-domain' already exists"
    ):
        CompetencyDomain(
            name="Competency-Domain", description="Description"
        ).validate_unique()


@pytest.mark.django_db
def test_competency_model(
    competency_domain: CompetencyDomain, competency: Competency
) -> None:
    """Test the Competency model."""
    assert isinstance(competency_domain, SluggedModel)
    assert competency_domain.name == str(competency_domain) == "Competency Domain"
    assert competency_domain.description == "A competency domain"
    assert competency_domain.slug == "competency-domain"

    assert isinstance(competency, SluggedModel)
    assert competency.name == str(competency) == "Competency"
    assert competency.description == "A competency"
    assert competency.slug == "competency"
    assert competency.competency_domain == competency_domain


@pytest.mark.django_db
def test_skill_model(
    skill: Skill,
    competency: Competency,
    tool: Tool,
    learning_resource: LearningResource,
) -> None:
    """Test the Skill model."""
    assert isinstance(skill, SluggedModel)
    assert skill.name == "Skill"
    assert str(skill) == "Skill (Competency)"
    assert skill.description == "A skill"
    assert skill.slug == "skill"
    assert skill.competency is competency
    assert tool in skill.tools.all()
    assert learning_resource in skill.learning_resources.all()


@pytest.mark.django_db
def test_skill_level_model(skill_level: SkillLevel) -> None:
    """Test the SkillLevel model."""
    assert skill_level.level == 1
    assert skill_level.name == "Beginner"
    assert skill_level.description == "Beginner level"
    assert skill_level.short_description == "Beginner"
    assert skill_level.focus == "Beginner focus"

    # Test validation for unique level
    skill_level = SkillLevel(
        level=1,
        name="Beginner",
        description="Beginner level",
        short_description="Beginner",
        focus="Beginner focus",
    )
    with pytest.raises(
        ValidationError, match=r"Skill level with this Level already exists."
    ):
        skill_level.full_clean()


@pytest.mark.django_db
def test_provider_model(provider: Provider) -> None:
    """Test the Provider model."""
    assert isinstance(provider, SluggedModel)
    assert provider.name == "Provider"
    assert provider.description == "A provider"
    assert provider.url == "https://example.com"
    assert provider.ror == "https://ror.org/12345"


@pytest.mark.django_db
def test_learning_resource_model(
    learning_resource: LearningResource, provider: Provider
) -> None:
    """Test the LearningResource model."""
    assert isinstance(learning_resource, SluggedModel)
    assert learning_resource.name == str(learning_resource) == "Learning Resource"
    assert learning_resource.description == "A learning resource"
    assert learning_resource.slug == "learning-resource"
    assert learning_resource.language == ["en"]
    assert learning_resource.url == "https://example.com/resource"
    assert learning_resource.provider == provider

    learning_resource.language = "invalid-lang"
    with pytest.raises(ValidationError, match=r"invalid-lang"):
        learning_resource.save()


@pytest.mark.django_db
def test_tool_model(tool: Tool, learning_resource: LearningResource) -> None:
    """Test the Tool model."""
    assert isinstance(tool, SluggedModel)
    assert tool.name == str(tool) == "Tool"
    assert tool.description == "A tool, methodology, behaviour or language"
    assert tool.slug == "tool"
    assert tool.kind == Tool.Kind.TOOL
    assert tool.url == "https://example.com/tool"
    assert learning_resource in tool.learning_resources.all()

    tool.kind = "invalid-kind"
    with pytest.raises(
        ValidationError, match=r"Value 'invalid-kind' is not a valid choice."
    ):
        tool.save()
