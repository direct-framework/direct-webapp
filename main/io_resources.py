"""Django import / export Resource classes for facillitating DB Import and Export."""

from collections.abc import Mapping
from typing import Any

from django.core.exceptions import ObjectDoesNotExist, ValidationError
from django.db.models import Model
from django.utils.encoding import force_str
from django.utils.translation import gettext_lazy as _
from import_export import fields, resources
from import_export.results import Result
from import_export.widgets import CharWidget, ForeignKeyWidget, ManyToManyWidget
from tablib import Dataset

from .models import (
    Competency,
    CompetencyDomain,
    LearningResource,
    Provider,
    Skill,
    SkillLevel,
    SluggedModel,
    ToolLanguageMethodology,
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
        self,
        model: type[SluggedModel],
        column_name: str,
        ignore_missing: bool = False,
        **kwargs: Any,
    ) -> None:
        """Override the constructor to set the field to slug and the separator to |."""
        self.column_name = column_name
        self.ignore_missing = ignore_missing
        super().__init__(model, field="slug", separator="|", **kwargs)

    def clean(
        self, value: str, row: Mapping[str, Any] | None = None, **kwargs: Any
    ) -> Any:
        """Overwrite the clean method so that it raises and error on missing objects.

        This does not prevent the instance from being saved if dry_run=False on import!
        """
        queryset = super().clean(value, row=row, **kwargs)
        slugs = set(filter(None, value.split(self.separator)))
        if queryset.count() == len(slugs) or self.ignore_missing:
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


class MultipleChoiceWidget(CharWidget):
    """A CharWidget that allows for multiple values to work with MultiSelectField."""

    def __init__(self, separator: str = "|", **kwargs: Any) -> None:
        """Override the constructor to set a separator, defaults to `|`."""
        self.separator = separator
        super().__init__(**kwargs)

    def clean(
        self, value: str, row: Mapping[str, Any] | None = None, **kwargs: Any
    ) -> str | None:
        """Override the clean method to make the choices comma-separated.

        This is required for the MultiSelectField to work.
        """
        return super().clean(value.replace(self.separator, ","), row, **kwargs)

    def render(self, value: list, obj: Model | None = None, **kwargs: Any) -> Any:
        """Override the render method so the correct separator is used on export."""
        return super().render(self.separator.join(value), obj, **kwargs)


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
    language = fields.Field("language", widget=MultipleChoiceWidget(separator="|"))

    class Meta:
        """Meta options for LearningResourceResource."""

        model = LearningResource
        skip_unchanged = True
        import_id_fields = ("slug",)
        exclude = ("id",)


class ToolLanguageMethodologyResource(resources.ModelResource):
    """A ModelResource to facilitate importing and exporting Tools."""

    learning_resources = fields.Field(
        "learning_resources",
        widget=SluggedM2MWidget(LearningResource, "learning_resources"),
    )

    class Meta:
        """Meta options for ToolLanguageMethodologyResource."""

        model = ToolLanguageMethodology
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
        widget=SluggedM2MWidget(
            ToolLanguageMethodology, "tools_languages_methodologies"
        ),
    )
    learning_resources = fields.Field(
        "learning_resources",
        widget=SluggedM2MWidget(LearningResource, "learning_resources"),
    )
    related_skills = fields.Field(
        "related_skills",
        widget=SluggedM2MWidget(Skill, "related_skills", ignore_missing=True),
    )

    class Meta:
        """Meta options for SkillResource."""

        model = Skill
        skip_unchanged = True
        import_id_fields = ("slug",)
        exclude = ("id",)

    def after_import(self, dataset: Dataset, result: Result, **kwargs: Any) -> None:
        """Override the after_import method to ensure that related_skills are linked.

        This approach was inspired by
        https://github.com/django-import-export/django-import-export/issues/397#issuecomment-1034928530
        """
        for i, skill_dict in enumerate(dataset.dict, 1):
            skill = Skill.objects.get(slug=skill_dict["slug"])
            related_skills = filter(
                None, skill_dict.get("related_skills", "").split("|")
            )
            for related_skill_slug in related_skills:
                try:
                    related_skill = Skill.objects.get(slug=related_skill_slug)
                except Skill.DoesNotExist:
                    result.append_invalid_row(
                        i,
                        skill_dict,
                        ValidationError(
                            {
                                "related_skills": _(
                                    f"The skill does not exist: {related_skill_slug}"
                                )
                            }
                        ),
                    )
                skill.related_skills.add(related_skill)

                if result.rows[i - 1].import_type == "new":
                    # Update the diff display in the admin page
                    diff = self.get_diff_class()(self, Skill(), True)  # type: ignore[arg-type]
                    diff.compare_with(self, skill)
                    col_idx = result.diff_headers.index("related_skills")
                    result.rows[i - 1].diff[col_idx] = diff.as_html()[col_idx]  # type: ignore[index]

        super().after_import(dataset, result, **kwargs)


class SkillLevelResource(resources.ModelResource):
    """A ModelResource to facilitate importing and exporting SkillLevels."""

    class Meta:
        """Meta options for SkillLevelResource."""

        model = SkillLevel
        skip_unchanged = True
        import_id_fields = ("level",)
        exclude = ("id",)


def export_framework() -> dict[str, list[dict[str, str]]]:
    """Exports the core framework into one dictionary with each model as a key.

    Returns:
        A dictionary containing the entire framework. Each model is labelled by a key
            and is a list of dictionaries. This is JSON compatible.
    """
    return dict(
        competency_domains=CompetencyDomainResource().export().dict,
        competencies=CompetencyResource().export().dict,
        skills=SkillResource().export().dict,
        skill_levels=SkillLevelResource().export().dict,
    )
