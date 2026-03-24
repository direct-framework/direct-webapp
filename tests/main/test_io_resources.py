"""Test suite for the main app import/export resources."""

import pytest
from tablib import Dataset

from main.io_resources import (
    CompetencyDomainResource,
    CompetencyResource,
    LearningResourceResource,
    ProviderResource,
    SkillLevelResource,
    SkillResource,
    ToolResource,
)
from main.models import (
    Competency,
    CompetencyDomain,
    LearningResource,
    Provider,
    Skill,
    SkillLevel,
    Tool,
)


@pytest.mark.django_db
class TestCompetencyDomainResource:
    """Test suite for CompetencyDomainResource."""

    def test_export_competency_domain(self, competency_domain: CompetencyDomain):
        """Test exporting a competency domain."""
        resource = CompetencyDomainResource()
        dataset = resource.export(CompetencyDomain.objects.all())

        assert len(dataset) == 1
        assert dataset["name"][0] == "Competency Domain"
        assert dataset["description"][0] == "A competency domain"
        assert dataset["slug"][0] == "competency-domain"
        assert "id" not in dataset.headers

    def test_import_competency_domain(self):
        """Test importing a new competency domain."""
        resource = CompetencyDomainResource()
        dataset = Dataset()
        dataset.headers = ["slug", "name", "description", "rank"]
        dataset.append(["imported-domain", "Imported Domain", "An imported domain", 10])

        result = resource.import_data(dataset, dry_run=False)

        assert not result.has_errors()
        assert CompetencyDomain.objects.filter(slug="imported-domain").exists()
        domain = CompetencyDomain.objects.get(slug="imported-domain")
        assert domain.name == "Imported Domain"
        assert domain.description == "An imported domain"
        assert domain.rank == 10

    def test_import_competency_domain_update_existing(
        self, competency_domain: CompetencyDomain
    ):
        """Test updating an existing competency domain via import."""
        resource = CompetencyDomainResource()
        dataset = Dataset()
        dataset.headers = ["slug", "name", "description", "rank"]
        dataset.append(
            ["competency-domain", "Updated Domain", "Updated description", 5]
        )

        result = resource.import_data(dataset, dry_run=False)

        assert not result.has_errors()
        competency_domain.refresh_from_db()
        assert competency_domain.name == "Updated Domain"
        assert competency_domain.description == "Updated description"
        assert competency_domain.rank == 5


@pytest.mark.django_db
class TestCompetencyResource:
    """Test suite for CompetencyResource."""

    def test_export_competency(
        self, competency: Competency, competency_domain: CompetencyDomain
    ):
        """Test exporting a competency."""
        resource = CompetencyResource()
        dataset = resource.export(Competency.objects.all())

        assert len(dataset) == 1
        assert dataset["name"][0] == "Competency"
        assert dataset["description"][0] == "A competency"
        assert dataset["slug"][0] == "competency"
        assert dataset["competency_domain"][0] == "competency-domain"
        assert "id" not in dataset.headers

    def test_import_competency(self, competency_domain: CompetencyDomain):
        """Test importing a new competency."""
        resource = CompetencyResource()
        dataset = Dataset()
        dataset.headers = ["slug", "name", "description", "competency_domain"]
        dataset.append(
            [
                "imported-competency",
                "Imported Competency",
                "An imported competency",
                "competency-domain",
            ]
        )

        result = resource.import_data(dataset, dry_run=False)

        assert not result.has_errors()
        assert Competency.objects.filter(slug="imported-competency").exists()
        competency = Competency.objects.get(slug="imported-competency")
        assert competency.name == "Imported Competency"
        assert competency.competency_domain == competency_domain

    def test_import_competency_update_existing(
        self, competency: Competency, competency_domain: CompetencyDomain
    ):
        """Test updating an existing competency via import."""
        resource = CompetencyResource()
        dataset = Dataset()
        dataset.headers = ["slug", "name", "description", "competency_domain"]
        dataset.append(
            [
                "competency",
                "Updated Competency",
                "Updated description",
                "competency-domain",
            ]
        )

        result = resource.import_data(dataset, dry_run=False)

        assert not result.has_errors()
        competency.refresh_from_db()
        assert competency.name == "Updated Competency"
        assert competency.description == "Updated description"


@pytest.mark.django_db
class TestProviderResource:
    """Test suite for ProviderResource."""

    def test_export_provider(self, provider: Provider):
        """Test exporting a provider."""
        resource = ProviderResource()
        dataset = resource.export(Provider.objects.all())

        assert len(dataset) == 1
        assert dataset["name"][0] == "Provider"
        assert dataset["description"][0] == "A provider"
        assert dataset["slug"][0] == "provider"
        assert dataset["url"][0] == "https://example.com"
        assert dataset["ror"][0] == "https://ror.org/12345"
        assert "id" not in dataset.headers

    def test_import_provider(self):
        """Test importing a new provider."""
        resource = ProviderResource()
        dataset = Dataset()
        dataset.headers = ["slug", "name", "description", "url", "ror"]
        dataset.append(
            [
                "imported-provider",
                "Imported Provider",
                "An imported provider",
                "https://example.org",
                "https://ror.org/67890",
            ]
        )

        result = resource.import_data(dataset, dry_run=False)

        assert not result.has_errors()
        assert Provider.objects.filter(slug="imported-provider").exists()
        provider = Provider.objects.get(slug="imported-provider")
        assert provider.name == "Imported Provider"
        assert provider.url == "https://example.org"

    def test_import_provider_update_existing(self, provider: Provider):
        """Test updating an existing provider via import."""
        resource = ProviderResource()
        dataset = Dataset()
        dataset.headers = ["slug", "name", "description", "url", "ror"]
        dataset.append(
            [
                "provider",
                "Updated Provider",
                "Updated description",
                "https://updated.com",
                "https://ror.org/99999",
            ]
        )

        result = resource.import_data(dataset, dry_run=False)

        assert not result.has_errors()
        provider.refresh_from_db()
        assert provider.name == "Updated Provider"
        assert provider.url == "https://updated.com"


@pytest.mark.django_db
class TestLearningResourceResource:
    """Test suite for LearningResourceResource."""

    def test_export_learning_resource(
        self, learning_resource: LearningResource, provider: Provider
    ):
        """Test exporting a learning resource."""
        resource = LearningResourceResource()
        dataset = resource.export(LearningResource.objects.all())

        assert len(dataset) == 1
        assert dataset["name"][0] == "Learning Resource"
        assert dataset["description"][0] == "A learning resource"
        assert dataset["slug"][0] == "learning-resource"
        assert dataset["provider"][0] == "provider"
        assert dataset["language"][0] == "en"
        assert dataset["url"][0] == "https://example.com/resource"
        assert "id" not in dataset.headers

    def test_import_learning_resource(self, provider: Provider):
        """Test importing a new learning resource."""
        resource = LearningResourceResource()
        dataset = Dataset()
        dataset.headers = ["slug", "name", "description", "provider", "language", "url"]
        dataset.append(
            [
                "imported-resource",
                "Imported Resource",
                "An imported resource",
                "provider",
                "en",
                "https://example.com/imported",
            ]
        )

        result = resource.import_data(dataset, dry_run=False)

        assert not result.has_errors()
        assert LearningResource.objects.filter(slug="imported-resource").exists()
        lr = LearningResource.objects.get(slug="imported-resource")
        assert lr.name == "Imported Resource"
        assert lr.provider == provider

    def test_import_learning_resource_update_existing(
        self, learning_resource: LearningResource, provider: Provider
    ):
        """Test updating an existing learning resource via import."""
        resource = LearningResourceResource()
        dataset = Dataset()
        dataset.headers = ["slug", "name", "description", "provider", "language", "url"]
        dataset.append(
            [
                "learning-resource",
                "Updated Resource",
                "Updated description",
                "provider",
                "fr",
                "https://example.com/updated",
            ]
        )

        result = resource.import_data(dataset, dry_run=False)

        assert not result.has_errors()
        learning_resource.refresh_from_db()
        assert learning_resource.name == "Updated Resource"
        assert learning_resource.language == "fr"
        assert learning_resource.url == "https://example.com/updated"


@pytest.mark.django_db
class TestToolResource:
    """Test suite for ToolResource."""

    def test_export_tool(self, tool: Tool, learning_resource: LearningResource):
        """Test exporting a tool."""
        resource = ToolResource()
        dataset = resource.export(Tool.objects.all())

        assert len(dataset) == 1
        assert dataset["name"][0] == "Tool"
        assert dataset["description"][0] == "A tool, methodology, behaviour or language"
        assert dataset["slug"][0] == "tool"
        assert dataset["kind"][0] == "tool"
        assert dataset["url"][0] == "https://example.com/tool"
        assert dataset["learning_resources"][0] == "learning-resource"
        assert "id" not in dataset.headers

    def test_export_tool_with_multiple_learning_resources(
        self, tool: Tool, learning_resource: LearningResource, provider: Provider
    ):
        """Test exporting a tool with multiple learning resources."""
        lr2 = LearningResource.objects.create(
            name="Second Resource",
            description="Second resource",
            slug="second-resource",
            language="en",
            provider=provider,
        )
        tool.learning_resources.add(lr2)

        resource = ToolResource()
        dataset = resource.export(Tool.objects.all())

        assert len(dataset) == 1
        # The widget uses "|" as separator for many-to-many fields
        learning_resources = dataset["learning_resources"][0].split("|")
        assert len(learning_resources) == 2
        assert "learning-resource" in learning_resources
        assert "second-resource" in learning_resources

    def test_import_tool(self, learning_resource: LearningResource):
        """Test importing a new tool."""
        resource = ToolResource()
        dataset = Dataset()
        dataset.headers = [
            "slug",
            "name",
            "description",
            "kind",
            "url",
            "learning_resources",
        ]
        dataset.append(
            [
                "imported-tool",
                "Imported Tool",
                "An imported tool",
                "methodology",
                "https://example.com/imported",
                "learning-resource",
            ]
        )

        result = resource.import_data(dataset, dry_run=False)

        assert not result.has_errors()
        assert Tool.objects.filter(slug="imported-tool").exists()
        tool = Tool.objects.get(slug="imported-tool")
        assert tool.name == "Imported Tool"
        assert tool.kind == "methodology"
        assert tool.learning_resources.count() == 1
        assert tool.learning_resources.first() == learning_resource

    def test_import_tool_with_multiple_learning_resources(
        self, learning_resource: LearningResource, provider: Provider
    ):
        """Test importing a tool with multiple learning resources."""
        lr2 = LearningResource.objects.create(
            name="Second Resource",
            description="Second resource",
            slug="second-resource",
            language="en",
            provider=provider,
        )

        resource = ToolResource()
        dataset = Dataset()
        dataset.headers = [
            "slug",
            "name",
            "description",
            "kind",
            "url",
            "learning_resources",
        ]
        dataset.append(
            [
                "imported-tool",
                "Imported Tool",
                "An imported tool",
                "tool",
                "https://example.com/imported",
                "learning-resource|second-resource",
            ]
        )

        result = resource.import_data(dataset, dry_run=False)

        assert not result.has_errors()
        tool = Tool.objects.get(slug="imported-tool")
        assert tool.learning_resources.count() == 2
        assert learning_resource in tool.learning_resources.all()
        assert lr2 in tool.learning_resources.all()

    def test_import_tool_update_existing(
        self, tool: Tool, learning_resource: LearningResource
    ):
        """Test updating an existing tool via import."""
        resource = ToolResource()
        dataset = Dataset()
        dataset.headers = [
            "slug",
            "name",
            "description",
            "kind",
            "url",
            "learning_resources",
        ]
        dataset.append(
            [
                "tool",
                "Updated Tool",
                "Updated description",
                "methodology",
                "https://example.com/updated",
                "learning-resource",
            ]
        )

        result = resource.import_data(dataset, dry_run=False)

        assert not result.has_errors()
        tool.refresh_from_db()
        assert tool.name == "Updated Tool"
        assert tool.kind == "methodology"


@pytest.mark.django_db
class TestSkillResource:
    """Test suite for SkillResource."""

    def test_export_skill(
        self,
        skill: Skill,
        competency: Competency,
        tool: Tool,
        learning_resource: LearningResource,
    ):
        """Test exporting a skill."""
        resource = SkillResource()
        dataset = resource.export(Skill.objects.all())

        assert len(dataset) == 1
        assert dataset["name"][0] == "Skill"
        assert dataset["description"][0] == "A skill"
        assert dataset["slug"][0] == "skill"
        assert dataset["competency"][0] == "competency"
        assert dataset["tools_languages_methodologies"][0] == "tool"
        assert dataset["learning_resources"][0] == "learning-resource"
        assert "id" not in dataset.headers

    def test_export_skill_with_related_skills(
        self, skill: Skill, competency: Competency
    ):
        """Test exporting a skill with related skills."""
        related_skill = Skill.objects.create(
            name="Related Skill",
            description="A related skill",
            slug="related-skill",
            competency=competency,
        )
        skill.related_skills.add(related_skill)

        resource = SkillResource()
        dataset = resource.export(Skill.objects.filter(slug="skill"))

        assert len(dataset) == 1
        assert dataset["related_skills"][0] == "related-skill"

    def test_export_skill_with_multiple_tools(
        self, skill: Skill, tool: Tool, learning_resource: LearningResource
    ):
        """Test exporting a skill with multiple tools."""
        tool2 = Tool.objects.create(
            name="Second Tool",
            description="Second tool",
            slug="second-tool",
            kind=Tool.Kind.LANGUAGE,
        )
        skill.tools.add(tool2)

        resource = SkillResource()
        dataset = resource.export(Skill.objects.all())

        assert len(dataset) == 1
        tools = dataset["tools_languages_methodologies"][0].split("|")
        assert len(tools) == 2
        assert "tool" in tools
        assert "second-tool" in tools

    def test_import_skill(
        self, competency: Competency, tool: Tool, learning_resource: LearningResource
    ):
        """Test importing a new skill."""
        resource = SkillResource()
        dataset = Dataset()
        dataset.headers = [
            "slug",
            "name",
            "description",
            "competency",
            "tools_languages_methodologies",
            "learning_resources",
            "related_skills",
        ]
        dataset.append(
            [
                "imported-skill",
                "Imported Skill",
                "An imported skill",
                "competency",
                "tool",
                "learning-resource",
                "",
            ]
        )

        result = resource.import_data(dataset, dry_run=False)

        assert not result.has_errors()
        assert Skill.objects.filter(slug="imported-skill").exists()
        skill = Skill.objects.get(slug="imported-skill")
        assert skill.name == "Imported Skill"
        assert skill.competency == competency
        assert skill.tools.count() == 1
        assert skill.tools.first() == tool
        assert skill.learning_resources.count() == 1
        assert skill.learning_resources.first() == learning_resource

    def test_import_skill_with_multiple_relations(
        self,
        competency: Competency,
        tool: Tool,
        learning_resource: LearningResource,
        provider: Provider,
    ):
        """Test importing a skill with multiple tools and learning resources."""
        tool2 = Tool.objects.create(
            name="Second Tool",
            description="Second tool",
            slug="second-tool",
            kind=Tool.Kind.LANGUAGE,
        )
        lr2 = LearningResource.objects.create(
            name="Second Resource",
            description="Second resource",
            slug="second-resource",
            language="en",
            provider=provider,
        )

        resource = SkillResource()
        dataset = Dataset()
        dataset.headers = [
            "slug",
            "name",
            "description",
            "competency",
            "tools_languages_methodologies",
            "learning_resources",
            "related_skills",
        ]
        dataset.append(
            [
                "imported-skill",
                "Imported Skill",
                "An imported skill",
                "competency",
                "tool|second-tool",
                "learning-resource|second-resource",
                "",
            ]
        )

        result = resource.import_data(dataset, dry_run=False)

        assert not result.has_errors()
        skill = Skill.objects.get(slug="imported-skill")
        assert skill.tools.count() == 2
        assert tool in skill.tools.all()
        assert tool2 in skill.tools.all()
        assert skill.learning_resources.count() == 2
        assert learning_resource in skill.learning_resources.all()
        assert lr2 in skill.learning_resources.all()

    def test_import_skill_with_related_skills(
        self, skill: Skill, competency: Competency
    ):
        """Test importing a skill with related skills."""
        resource = SkillResource()
        dataset = Dataset()
        dataset.headers = [
            "slug",
            "name",
            "description",
            "competency",
            "tools_languages_methodologies",
            "learning_resources",
            "related_skills",
        ]
        dataset.append(
            [
                "imported-skill",
                "Imported Skill",
                "An imported skill",
                "competency",
                "",
                "",
                "skill|another-skill",
            ]
        )
        dataset.append(
            [
                "another-skill",
                "Another Skill",
                "Another skill",
                "competency",
                "",
                "",
                "",
            ]
        )

        result = resource.import_data(dataset, dry_run=False)

        assert not result.has_validation_errors()
        imported_skill = Skill.objects.get(slug="imported-skill")
        assert imported_skill.related_skills.count() == 2
        assert imported_skill.related_skills.first() == skill

        dataset.append(
            [
                "another-skill",
                "Another Skill",
                "Another skill",
                "competency",
                "",
                "",
                "nope",
            ]
        )
        result = resource.import_data(dataset, dry_run=False)
        assert result.has_validation_errors()

    def test_import_skill_update_existing(
        self,
        skill: Skill,
        competency: Competency,
        tool: Tool,
        learning_resource: LearningResource,
    ):
        """Test updating an existing skill via import."""
        resource = SkillResource()
        dataset = Dataset()
        dataset.headers = [
            "slug",
            "name",
            "description",
            "competency",
            "tools_languages_methodologies",
            "learning_resources",
            "related_skills",
        ]
        dataset.append(
            [
                "skill",
                "Updated Skill",
                "Updated description",
                "competency",
                "tool",
                "learning-resource",
                "",
            ]
        )

        result = resource.import_data(dataset, dry_run=False)

        assert not result.has_errors()
        skill.refresh_from_db()
        assert skill.name == "Updated Skill"
        assert skill.description == "Updated description"


@pytest.mark.django_db
class TestSkillLevelResource:
    """Test suite for SkillLevelResource."""

    def test_export_skill_level(self, skill_level: SkillLevel):
        """Test exporting a skill level."""
        resource = SkillLevelResource()
        dataset = resource.export(SkillLevel.objects.all())

        assert len(dataset) == 1
        assert int(dataset["level"][0]) == 1
        assert dataset["name"][0] == "Beginner"
        assert dataset["description"][0] == "Beginner level"
        assert dataset["short_description"][0] == "Beginner"
        assert dataset["focus"][0] == "Beginner focus"
        assert "id" not in dataset.headers

    def test_import_skill_level(self):
        """Test importing a new skill level."""
        resource = SkillLevelResource()
        dataset = Dataset()
        dataset.headers = ["level", "name", "description", "short_description", "focus"]
        dataset.append(
            [
                2,
                "Intermediate",
                "Intermediate level",
                "Intermediate",
                "Intermediate focus",
            ]
        )

        result = resource.import_data(dataset, dry_run=False)

        assert not result.has_errors()
        assert SkillLevel.objects.filter(level=2).exists()
        skill_level = SkillLevel.objects.get(level=2)
        assert skill_level.name == "Intermediate"
        assert skill_level.short_description == "Intermediate"

    def test_import_skill_level_update_existing(self, skill_level: SkillLevel):
        """Test updating an existing skill level via import."""
        resource = SkillLevelResource()
        dataset = Dataset()
        dataset.headers = ["level", "name", "description", "short_description", "focus"]
        dataset.append(
            [1, "Updated Beginner", "Updated level", "Updated", "Updated focus"]
        )

        result = resource.import_data(dataset, dry_run=False)

        assert not result.has_errors()
        skill_level.refresh_from_db()
        assert skill_level.name == "Updated Beginner"
        assert skill_level.description == "Updated level"
        assert skill_level.short_description == "Updated"
        assert skill_level.focus == "Updated focus"


@pytest.mark.django_db
class TestResourceWidgets:
    """Test suite for custom widget classes."""

    def test_slugged_fk_widget(self, competency_domain: CompetencyDomain):
        """Test that SluggedFKWidget uses slug field correctly."""
        resource = CompetencyResource()
        dataset = Dataset()
        dataset.headers = ["slug", "name", "description", "competency_domain"]
        dataset.append(["test-comp", "Test", "Test description", "competency-domain"])

        result = resource.import_data(dataset, dry_run=False)

        assert not result.has_errors()
        competency = Competency.objects.get(slug="test-comp")
        assert competency.competency_domain == competency_domain

        # Test with invalid slug
        dataset.append(["invalid-comp", "Invalid", "Test description", "not-a-slug"])

        result = resource.import_data(dataset, dry_run=False)

        assert result.has_validation_errors()
        assert not Competency.objects.filter(slug="invalid-comp").exists()

    def test_slugged_m2m_widget(
        self, tool: Tool, learning_resource: LearningResource, provider: Provider
    ):
        """Test that SluggedM2MWidget uses slug field and pipe separator correctly."""
        LearningResource.objects.create(
            name="Second Resource",
            description="Second resource",
            slug="second-resource",
            language="en",
            provider=provider,
        )

        resource = ToolResource()
        dataset = Dataset()
        dataset.headers = [
            "slug",
            "name",
            "description",
            "kind",
            "url",
            "learning_resources",
        ]
        dataset.append(
            [
                "multi-tool",
                "Multi Tool",
                "Tool with multiple resources",
                "tool",
                "",
                "learning-resource|second-resource",
            ]
        )

        result = resource.import_data(dataset, dry_run=False)

        assert not result.has_errors()
        tool = Tool.objects.get(slug="multi-tool")
        assert tool.learning_resources.count() == 2
        slugs = [lr.slug for lr in tool.learning_resources.all()]
        assert "learning-resource" in slugs
        assert "second-resource" in slugs

        # Test with invalid slug
        dataset.append(
            [
                "invalid-tool",
                "Invalid Tool",
                "Tool description",
                "tool",
                "",
                "learning-resource|not-a-slug",
            ]
        )

        result = resource.import_data(dataset, dry_run=False)

        assert result.has_validation_errors()

        # The Tool object is still saved! We can get around this
        assert Tool.objects.filter(slug="invalid-tool").exists()
