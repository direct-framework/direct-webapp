"""Test suite for the main app models."""

import pytest
from django.core.exceptions import ValidationError

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
    UserSkill,
)


@pytest.fixture
def competency_domain() -> CompetencyDomain:
    """Fixture for creating a Competency Domain instance."""
    return CompetencyDomain.objects.create(
        name="Competency Domain", description="A competency domain"
    )


@pytest.fixture
def competency(competency_domain: CompetencyDomain) -> Competency:
    """Fixture for creating a Competency instance."""
    return Competency.objects.create(
        name="Competency",
        description="A competency",
        competency_domain=competency_domain,
    )


@pytest.fixture
def provider() -> Provider:
    """Fixture for creating a Provider instance."""
    return Provider.objects.create(
        name="Provider",
        description="A provider",
        url="https://example.com",
        ror="https://ror.org/12345",
    )


@pytest.fixture
def learning_resource(provider: Provider) -> LearningResource:
    """Fixture for creating a LearningResource instance."""
    return LearningResource.objects.create(
        name="Learning Resource",
        description="A learning resource",
        language="en",
        url="https://example.com/resource",
        provider=provider,
    )


@pytest.fixture
def tool(learning_resource: LearningResource) -> Tool:
    """Fixture for creating a Tool instance."""
    tool = Tool.objects.create(
        name="Tool",
        description="A tool, methodology, behaviour or language",
        kind=Tool.Kind.TOOL,
        url="https://example.com/tool",
    )
    tool.learning_resources.add(learning_resource)
    return tool


@pytest.fixture
def skill(
    competency: Competency, tool: Tool, learning_resource: LearningResource
) -> Skill:
    """Fixture for creating a Skill instance."""
    skill = Skill.objects.create(
        name="Skill",
        description="A skill",
        competency=competency,
    )
    skill.tools.add(tool)
    skill.learning_resources.add(learning_resource)
    return skill


@pytest.fixture
def skill_level() -> SkillLevel:
    """Fixture for creating a SkillLevel instance."""
    return SkillLevel.objects.create(
        level=1,
        name="Beginner",
        description="Beginner level",
        short_description="Beginner",
        focus="Beginner focus",
    )


@pytest.fixture
def user_skill(user, skill: Skill, skill_level: SkillLevel) -> UserSkill:
    """Fixture for creating a UserSkill instance."""
    return UserSkill.objects.create(user=user, skill=skill, skill_level=skill_level)


def test_named_model() -> None:
    """Test the abstract NamedModel provides correct behaviour to children."""

    class TestModel(NamedModel):
        class Meta:
            app_label = "test_abstract_model"

    instance = TestModel(name="Test Name", description="Test Description")
    assert instance.name == str(instance) == "Test Name"
    assert instance.description == "Test Description"


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
def test_user_skill_model(
    user_skill: UserSkill, user, skill: Skill, skill_level: SkillLevel
) -> None:
    """Test the UserSkill model."""
    assert user_skill.user == user
    assert user_skill.skill == skill
    assert user_skill.skill_level == skill_level

    new_skill_level = SkillLevel.objects.create(
        level=2, name="Intermediate", description="Intermediate level"
    )

    new_user_skill = UserSkill(user=user, skill=skill, skill_level=new_skill_level)
    with pytest.raises(
        ValidationError, match=r"User skill with this User and Skill already exists."
    ):
        new_user_skill.full_clean()


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
    assert learning_resource.language == "en"
    assert learning_resource.url == "https://example.com/resource"
    assert learning_resource.provider == provider


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
