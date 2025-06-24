"""Models module for the main app."""

from django.contrib.auth.models import AbstractUser
from django.core.exceptions import ValidationError
from django.db import models
from django.utils.translation import gettext_lazy as _
from PIL import Image


class User(AbstractUser):
    """Custom user model for this project."""


# Extending User Model Using a One-To-One Link
class UserProfile(models.Model):
    """Custom user profile model for this project."""

    user = models.OneToOneField(User, on_delete=models.CASCADE)

    avatar = models.ImageField(default="default.png", upload_to="profile_images")
    bio = models.TextField()

    def __str__(self) -> str:
        """Return username of user for UserProdile to string."""
        return self.user.username

    def save(self, *args, **kwargs) -> None:
        """Resize avatar image on save."""
        super().save()

        img = Image.open(self.avatar.path)

        if img.height > 100 or img.width > 100:
            new_img = (100, 100)
            img.thumbnail(new_img)
            img.save(self.avatar.path)


class Category(models.Model):
    """Model for categories."""

    name = models.CharField(max_length=50)
    description = models.CharField(max_length=200)
    parent_category = models.ForeignKey(
        "self",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        limit_choices_to={"parent_category": None},
    )

    def __str__(self) -> str:
        """Return the name of the category."""
        return self.name

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


class Skill(models.Model):
    """Model for skills."""

    name = models.CharField(max_length=50)
    description = models.CharField(max_length=100)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    def __str__(self) -> str:
        """Return the name of the skill."""
        return self.name

    def clean(self) -> None:
        """Validate the skill instance."""
        if self.category.parent_category is None:
            raise ValidationError(
                {"category": _("The category cannot be a top-level category.")}
            )


class SkillLevel(models.Model):
    """Model for skill levels."""

    level = models.PositiveSmallIntegerField()
    name = models.CharField(max_length=50)
    description = models.TextField()

    def __str__(self) -> str:
        """Return the name of the skill level."""
        return self.name


class UserSkill(models.Model):
    """Model for mapping users to skills and skill levels."""

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    skill = models.ForeignKey(Skill, on_delete=models.CASCADE)
    skill_level = models.ForeignKey(SkillLevel, on_delete=models.CASCADE)
