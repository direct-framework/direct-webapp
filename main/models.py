"""Models module for the main app."""

from collections.abc import Collection
from typing import Any

from django.conf import settings
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

    slug = models.SlugField(unique=True, null=True, blank=True, max_length=200)

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


class Category(SluggedModel):
    """Model for categories."""

    class Meta:
        """Meta options for Category model."""

        verbose_name_plural = "categories"

    parent_category = models.ForeignKey(
        "self",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        limit_choices_to={"parent_category": None},
    )

    def clean(self) -> None:
        """Validate the category instance."""
        if self.parent_category == self:
            raise ValidationError(
                {"parent_category": _("A category cannot be its own parent.")}
            )
        if self.parent_category and self.pk and self.category_set.all().exists():
            raise ValidationError(
                {
                    "parent_category": _(
                        "This is a parent category so can't be made into a subcategory."
                    )
                }
            )


class Skill(SluggedModel):
    """Model for skills."""

    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    def clean(self) -> None:
        """Validate the skill instance."""
        if self.category.parent_category is None:
            raise ValidationError(
                {"category": _("The category cannot be a top-level category.")}
            )


class SkillLevel(NamedModel):
    """Model for skill levels."""

    level = models.PositiveSmallIntegerField(unique=True)


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
