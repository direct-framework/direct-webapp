"""Pytest fixtures for the main app tests."""

import pytest

from main.models import (
    Competency,
    CompetencyDomain,
    LearningResource,
    Provider,
    Skill,
    SkillLevel,
    ToolLanguageMethodology,
    UserSkill,
)


@pytest.fixture
def competency_domain() -> CompetencyDomain:
    """Fixture for creating a Competency Domain instance."""
    return CompetencyDomain.objects.create(
        name="Competency Domain", description="A competency domain", rank=1
    )


@pytest.fixture
def competency(competency_domain: CompetencyDomain) -> Competency:
    """Fixture for creating a Competency instance."""
    return Competency.objects.create(
        name="Competency",
        description="A competency",
        competency_domain=competency_domain,
        rank=1,
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
def tool(learning_resource: LearningResource) -> ToolLanguageMethodology:
    """Fixture for creating a Tool instance."""
    tool = ToolLanguageMethodology.objects.create(
        name="Tool",
        description="A tool, methodology, behaviour or language",
        kind=ToolLanguageMethodology.Kind.TOOL,
        url="https://example.com/tool",
    )
    tool.learning_resources.add(learning_resource)
    return tool


@pytest.fixture
def skill(
    competency: Competency,
    tool: ToolLanguageMethodology,
    learning_resource: LearningResource,
) -> Skill:
    """Fixture for creating a Skill instance."""
    skill = Skill.objects.create(
        name="Skill",
        description="A skill",
        competency=competency,
        rank=1,
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
