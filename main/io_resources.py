"""Django import / export Resource classes for facillitating DB Import and Export."""

from typing import Any

from import_export import fields, resources
from import_export.widgets import ForeignKeyWidget, ManyToManyWidget

from .models import (
    Competency,
    CompetencyDomain,
    LearningResource,
    Provider,
    Skill,
    SkillLevel,
    SluggedModel,
    Tool,
)


class SluggedFKWidget(ForeignKeyWidget):
    """A ForeignKeyWidget that always uses `slug` as the field."""

    def __init__(self, model: type[SluggedModel], **kwargs: Any) -> None:
        """Override the constructor to set the field to slug."""
        super().__init__(model, field="slug", **kwargs)


class SluggedM2MWidget(ManyToManyWidget):
    """A ManyToManyWidget that always uses `slug` as the field, separated by `|`."""

    def __init__(self, model: type[SluggedModel], **kwargs: Any) -> None:
        """Override the constructor to set the field to slug and the separator to |."""
        super().__init__(model, field="slug", separator="|", **kwargs)


class CompetencyDomainResource(resources.ModelResource):
    """A ModelResource to facilitate importing and exporting CompetencyDomains."""

    class Meta:
        """Meta options for CompetencyDomainResource."""

        model = CompetencyDomain
        skip_unchanged = True
        import_id_fields = ("slug",)
        exclude = ("id",)


class CompetencyResource(resources.ModelResource):
    """A ModelResource to facilitate importing and exporting Competencies."""

    competency_domain = fields.Field(
        "competency_domain", widget=SluggedFKWidget(CompetencyDomain)
    )

    class Meta:
        """Meta options for CompetencyResource."""

        model = Competency
        skip_unchanged = True
        import_id_fields = ("slug",)
        exclude = ("id",)


class ProviderResource(resources.ModelResource):
    """A ModelResource to facilitate importing and exporting Provider."""

    class Meta:
        """Meta options for ProviderResource."""

        model = Provider
        skip_unchanged = True
        import_id_fields = ("slug",)
        exclude = ("id",)


class LearningResourceResource(resources.ModelResource):
    """A ModelResource to facilitate importing and exporting LearningResource."""

    provider = fields.Field("provider", widget=SluggedFKWidget(Provider))

    class Meta:
        """Meta options for LearningResourceResource."""

        model = LearningResource
        skip_unchanged = True
        import_id_fields = ("slug",)
        exclude = ("id",)


class ToolResource(resources.ModelResource):
    """A ModelResource to facilitate importing and exporting Tools."""

    learning_resources = fields.Field(
        "learning_resources", widget=SluggedM2MWidget(LearningResource)
    )

    class Meta:
        """Meta options for ToolResource."""

        model = Tool
        skip_unchanged = True
        import_id_fields = ("slug",)
        exclude = ("id",)


class SkillResource(resources.ModelResource):
    """A ModelResource to facilitate importing and exporting Skills."""

    competency = fields.Field("competency", widget=SluggedFKWidget(Competency))
    tools = fields.Field(
        "tools",
        column_name="tools_languages_methods_behaviours",
        widget=SluggedM2MWidget(Tool),
    )
    learning_resources = fields.Field(
        "learning_resources", widget=SluggedM2MWidget(LearningResource)
    )
    related_skills = fields.Field("related_skills", widget=SluggedM2MWidget(Skill))

    class Meta:
        """Meta options for SkillResource."""

        model = Skill
        skip_unchanged = True
        import_id_fields = ("slug",)
        exclude = ("id",)


class SkillLevelResource(resources.ModelResource):
    """A ModelResource to facilitate importing and exporting SkillLevels."""

    class Meta:
        """Meta options for SkillLevelResource."""

        model = SkillLevel
        skip_unchanged = True
        import_id_fields = ("level",)
        exclude = ("id",)
