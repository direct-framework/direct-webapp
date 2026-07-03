"""Models module for the main app."""

from django.conf import settings
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _

from .framework_models import Skill, SkillLevel


class User(AbstractUser):
    """Custom user model for this project."""

    agreed_to_tos = models.BooleanField(
        _("agreed to terms and conditions"), default=False
    )
    date_agreed = models.DateTimeField(_("date agreed"), blank=True, null=True)


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


class Team(models.Model):
    """Model for representing a team of users working together."""

    name = models.CharField(max_length=255)
    manager = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="managed_teams"
    )
    members = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name="teams")

    def __str__(self) -> str:
        """Return the string representation of the team."""
        return self.name
