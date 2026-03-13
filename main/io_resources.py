"""Django import / export Resource classes for facillitating DB Import and Export."""

from collections.abc import Mapping
from typing import Any

from django.core.exceptions import ObjectDoesNotExist, ValidationError
from django.utils.encoding import force_str
from django.utils.translation import gettext_lazy as _
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

    def __init__(
        self, model: type[SluggedModel], column_name: str, **kwargs: Any
    ) -> None:
        """Override the constructor to set the field to slug."""
        self.column_name = column_name
        super().__init__(model, field="slug", **kwargs)

    def clean(
        self, value: str, row: Mapping[str, Any] | None = None, **kwargs: Any
    ) -> Any:
        """Overwrite the clean method so that it raises and error on missing objects."""
        try:
            return super().clean(value, row=row, **kwargs)
        except ObjectDoesNotExist as e:
            raise ValidationError({self.column_name: _(force_str(e))})


class SluggedM2MWidget(ManyToManyWidget):
    """A ManyToManyWidget that always uses `slug` as the field, separated by `|`."""

    def __init__(
        self, model: type[SluggedModel], column_name: str, **kwargs: Any
    ) -> None:
        """Override the constructor to set the field to slug and the separator to |."""
        self.column_name = column_name
        super().__init__(model, field="slug", separator="|", **kwargs)

    def clean(
        self, value: str, row: Mapping[str, Any] | None = None, **kwargs: Any
    ) -> Any:
        """Overwrite the clean method so that it raises and error on missing objects.

        This does not prevent the instance from being saved if dry_run=False on import!
        """
        queryset = super().clean(value, row=row, **kwargs)
        slugs = set(filter(None, value.split(self.separator)))
        if queryset.count() == len(slugs):
            return queryset

        missing = slugs.symmetric_difference(
            queryset.values_list(self.field, flat=True)
        )
        raise ValidationError(
            {
                self.column_name: _(
                    f"The following slugs do not exist: {', '.join(missing)}"
                )
            }
        )


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
        "competency_domain",
        widget=SluggedFKWidget(CompetencyDomain, "competency_domain"),
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

    provider = fields.Field("provider", widget=SluggedFKWidget(Provider, "provider"))

    class Meta:
        """Meta options for LearningResourceResource."""

        model = LearningResource
        skip_unchanged = True
        import_id_fields = ("slug",)
        exclude = ("id",)


class ToolResource(resources.ModelResource):
    """A ModelResource to facilitate importing and exporting Tools."""

    learning_resources = fields.Field(
        "learning_resources",
        widget=SluggedM2MWidget(LearningResource, "learning_resources"),
    )

    class Meta:
        """Meta options for ToolResource."""

        model = Tool
        skip_unchanged = True
        import_id_fields = ("slug",)
        exclude = ("id",)


class SkillResource(resources.ModelResource):
    """A ModelResource to facilitate importing and exporting Skills."""

    competency = fields.Field(
        "competency", widget=SluggedFKWidget(Competency, "competency")
    )
    tools = fields.Field(
        "tools",
        column_name="tools_languages_methodologies",
        widget=SluggedM2MWidget(Tool, "tools_languages_methodologies"),
    )
    learning_resources = fields.Field(
        "learning_resources",
        widget=SluggedM2MWidget(LearningResource, "learning_resources"),
    )
    related_skills = fields.Field(
        "related_skills", widget=SluggedM2MWidget(Skill, "related_skills")
    )

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
