"""Models for the team and collaboration elements of the app."""

from django.conf import settings
from django.db import models

from .framework_models import SluggedModel


class Team(SluggedModel):
    """Model representing a team of users working together."""


class TeamMembership(models.Model):
    """Model for mapping Users to Teams and including a manager flag."""

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    team = models.ForeignKey(Team, on_delete=models.CASCADE)
    manager = models.BooleanField(blank=True, default=False)

    class Meta:
        """Meta options for the TeamMembership model."""

        constraints = (
            models.UniqueConstraint(fields=["user", "team"], name="unique_user_team"),
        )
