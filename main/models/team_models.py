"""Models for the team and collaboration elements of the app."""

from django.conf import settings
from django.db import models

from .framework_models import SluggedModel


class Team(SluggedModel):
    """Model representing a team of users working together."""

    class Meta:
        """Meta options for the Team model."""

        permissions = (
            ("view_team_member_profiles", "Can view team member profiles"),
            ("manage_team_members", "Can manage team members"),
        )


class TeamMembership(models.Model):
    """Map users to teams and keep their team permissions synchronized.

    Membership changes must use model save/delete operations; queryset updates
    and bulk operations bypass permission synchronization.
    """

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name="teams", on_delete=models.CASCADE
    )
    team = models.ForeignKey(Team, related_name="members", on_delete=models.CASCADE)
    manager = models.BooleanField(blank=True, default=False)

    class Meta:
        """Meta options for the TeamMembership model."""

        constraints = (
            models.UniqueConstraint(fields=["user", "team"], name="unique_user_team"),
        )

    def __str__(self) -> str:
        """Return the name of the model instance."""
        return f"{self.user.username} membership of {self.team.name}"
