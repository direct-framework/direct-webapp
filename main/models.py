"""Models module for the main app."""

from collections.abc import Collection
from typing import Any

from django.conf import settings
from django.conf.global_settings import LANGUAGES
from django.contrib.auth.models import AbstractUser
from django.core.exceptions import ValidationError
from django.db import models
from django.utils.text import slugify
from django.utils.translation import gettext_lazy as _


class User(AbstractUser):
    """Custom user model for this project."""


class NamedModel(models.Model):
    """Abstract base model with name and description fields."""

    name = models.CharField(unique=True, max_length=200)
    description = models.TextField()

    class Meta:
        """Meta options to define NamedModel as abstract."""

        abstract = True

    def __str__(self) -> str:
        """Return the name of the model instance."""
        return self.name


class SluggedModel(NamedModel):
    """Abstract base model with slug field."""

    slug = models.SlugField(unique=True, max_length=200)

    class Meta:
        """Meta options to define SluggedModel as abstract."""

        abstract = True

    def validate_unique(self, exclude: Collection[str] | None = None) -> None:
        """Validate the auto-generated slug field."""
        if not self.slug:
            self.slug = slugify(self.name)
        try:
            super().validate_unique(exclude=exclude)
        except ValidationError as e:
            message_dict = {k: "".join(v) for k, v in e.message_dict.items()}
            if "slug" in message_dict:
                message_dict["slug"] = (
                    _(message_dict["slug"])
                    + f" Auto-generated slug '{self.slug}' already exists"
                )

            raise ValidationError(message_dict) from e

    def save(self, **kwargs: Any) -> None:
        """Override save method to auto-generate slug from name if not provided."""
        if not self.slug:
            all_fields = [f.name for f in self._meta.get_fields()]
            all_fields.remove("slug")
            self.validate_unique(exclude=all_fields)
        super().save(**kwargs)


class CompetencyDomain(SluggedModel):
    """Model for competency domains."""

    rank = models.PositiveSmallIntegerField(blank=True, default=1000)

    class Meta:
        """Meta options for CompetencyDomain model."""

        ordering = ("rank", "name")


class Competency(SluggedModel):
    """Model for competencies."""

    class Meta:
        """Meta options for Competency model."""

        # verbose_name_plural = "categories"
        verbose_name_plural = "competencies"

    competency_domain = models.ForeignKey(CompetencyDomain, on_delete=models.CASCADE)


class Provider(SluggedModel):
    """Model for providers."""

    url = models.URLField(max_length=500, blank=True, null=True)
    ror = models.URLField(max_length=500, blank=True, null=True)
    # Make description non-mandatory
    description = models.TextField(blank=True, null=True)  # type: ignore[assignment]


class LearningResource(SluggedModel):
    """Model for learning resources."""

    language = models.CharField(max_length=7, choices=LANGUAGES, default="en")
    url = models.URLField(max_length=500, blank=True, null=True)
    provider = models.ForeignKey(
        Provider, on_delete=models.SET_NULL, null=True, blank=True
    )
    # Make description non-mandatory
    description = models.TextField(blank=True, null=True)  # type: ignore[assignment]


class Tool(SluggedModel):
    """Model for tools and behaviours."""

    class Meta:
        """Meta options for Tool model."""

        verbose_name = _("Tool or Behaviour")
        verbose_name_plural = _("Tools and Behaviours")

    class Kind(models.TextChoices):
        """Enumeration of Kind choices."""

        TOOL = "FR", "Tool"
        METHODOLOGY = "SO", "Methodology"
        BEHAVIOUR = "JR", "Behaviour"
        LANGUAGE = "SR", "Language"

    kind = models.CharField(max_length=2, choices=Kind, default=Kind.TOOL)
    url = models.URLField(max_length=500, blank=True, null=True)
    learning_resources = models.ManyToManyField(LearningResource, blank=True)


class Skill(SluggedModel):
    """Model for skills."""

    competency = models.ForeignKey(Competency, on_delete=models.CASCADE)
    tools = models.ManyToManyField(
        Tool,
        blank=True,
        verbose_name="tools, methodologies, behaviours and languages",
    )
    learning_resources = models.ManyToManyField(LearningResource, blank=True)
    related_skills = models.ManyToManyField("self", blank=True)

    def __str__(self) -> str:
        """Return the name of the skill and the competency."""
        return self.name + " (" + self.competency.name + ")"


class SkillLevel(NamedModel):
    """Model for skill levels."""

    level = models.PositiveSmallIntegerField(unique=True)
    short_description = models.CharField(max_length=200)
    focus = models.TextField(default="", blank=True)


class UserSkill(models.Model):
    """Model for mapping users to skills and skill levels."""

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    skill = models.ForeignKey(Skill, on_delete=models.CASCADE)
    skill_level = models.ForeignKey(SkillLevel, on_delete=models.CASCADE)

    class Meta:
        """Meta options for UserSkill model."""

        constraints = (
            models.UniqueConstraint(fields=["user", "skill"], name="unique_user_skill"),
        )
