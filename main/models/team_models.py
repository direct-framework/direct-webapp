"""Models for the team and collaboration elements of the app."""

from __future__ import annotations

from collections.abc import Iterable

from django.conf import settings
from django.core.exceptions import ValidationError
from django.db import models, transaction
from django.db.models.base import ModelBase

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

    def save(
        self,
        *,
        force_insert: bool | tuple[ModelBase, ...] = False,
        force_update: bool = False,
        using: str | None = None,
        update_fields: Iterable[str] | None = None,
    ) -> None:
        """Save membership only when its team retains at least one manager."""
        with transaction.atomic():
            Team.objects.select_for_update().get(pk=self.team_id)
            existing = None
            if self.pk is not None:
                existing = (
                    TeamMembership.objects.select_for_update()
                    .filter(pk=self.pk)
                    .first()
                )

            if existing is not None and (
                existing.user_id != self.user_id or existing.team_id != self.team_id
            ):
                raise ValidationError(
                    "Change a member's user or team by removing the existing "
                    "membership and adding a new one."
                )

            if existing is not None and existing.manager and not self.manager:
                other_managers = TeamMembership.objects.filter(
                    team_id=existing.team_id, manager=True
                ).exclude(pk=existing.pk)
                if not other_managers.exists():
                    raise ValidationError("A team must retain at least one manager.")
            elif existing is None and not self.manager:
                if not TeamMembership.objects.filter(
                    team_id=self.team_id, manager=True
                ).exists():
                    raise ValidationError("A team must have at least one manager.")

            super().save(
                force_insert=force_insert,
                force_update=force_update,
                using=using,
                update_fields=update_fields,
            )

    def delete(
        self, using: str | None = None, keep_parents: bool = False
    ) -> tuple[int, dict[str, int]]:
        """Delete membership only when its team retains at least one manager."""
        with transaction.atomic():
            Team.objects.select_for_update().get(pk=self.team_id)
            current = (
                TeamMembership.objects.select_for_update().filter(pk=self.pk).first()
            )
            if current is not None and current.manager:
                other_managers = TeamMembership.objects.filter(
                    team_id=current.team_id, manager=True
                ).exclude(pk=current.pk)
                if not other_managers.exists():
                    raise ValidationError("A team must retain at least one manager.")
            return super().delete(using=using, keep_parents=keep_parents)

    def __str__(self) -> str:
        """Return the name of the model instance."""
        return f"{self.user.username} membership of {self.team.name}"
