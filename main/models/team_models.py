"""Models for the team and collaboration elements of the app."""

from __future__ import annotations

from collections.abc import Iterable
from typing import TYPE_CHECKING

from django.conf import settings
from django.core.exceptions import ValidationError
from django.db import models, transaction
from django.db.models.base import ModelBase

from .framework_models import SluggedModel

if TYPE_CHECKING:
    from .user_models import User


class TeamManager(models.Manager["Team"]):
    """Create teams with their initial team manager."""

    @transaction.atomic
    def create_for_user(self, *, user: User, name: str, description: str) -> Team:
        """Create a team and its creator's first team membership atomically."""
        team = self.create(name=name, description=description)
        TeamMembership.objects.create(user=user, team=team, manager=True)
        return team


class Team(SluggedModel):
    """Model representing a team of users working together."""

    objects = TeamManager()

    @transaction.atomic
    def invite_user(self, *, invited_by: User, invitee: User) -> TeamInvitation:
        """Create a pending invitation from a team manager to a registered user."""
        Team.objects.select_for_update().get(pk=self.pk)
        if not invited_by.has_perm("main.manage_team_members", self):
            raise ValidationError("Only a team manager can invite users.")
        if TeamMembership.objects.filter(team=self, user=invitee).exists():
            raise ValidationError("A team member cannot be invited.")
        if TeamInvitation.objects.filter(
            team=self, invitee=invitee, status=TeamInvitation.Status.PENDING
        ).exists():
            raise ValidationError("A pending invitation already exists.")
        return TeamInvitation.objects.create(
            team=self, invitee=invitee, invited_by=invited_by
        )

    @transaction.atomic
    def change_member_role(
        self, *, actor: User, member: User, is_manager: bool
    ) -> TeamMembership:
        """Promote or demote a team member when called by a team manager."""
        Team.objects.select_for_update().get(pk=self.pk)
        self._require_manager(actor)
        membership = TeamMembership.objects.select_for_update().get(
            team=self, user=member
        )
        membership.manager = is_manager
        membership.save()
        return membership

    @transaction.atomic
    def remove_member(self, *, actor: User, member: User) -> None:
        """Remove a team member when called by a team manager."""
        Team.objects.select_for_update().get(pk=self.pk)
        self._require_manager(actor)
        membership = TeamMembership.objects.select_for_update().get(
            team=self, user=member
        )
        membership.delete()

    @transaction.atomic
    def leave(self, *, user: User) -> None:
        """End the caller's membership, unless they are the last team manager."""
        Team.objects.select_for_update().get(pk=self.pk)
        membership = TeamMembership.objects.select_for_update().get(
            team=self, user=user
        )
        membership.delete()

    def _require_manager(self, user: User) -> None:
        """Require team-management permission for an administrative operation."""
        if not user.has_perm("main.manage_team_members", self):
            raise ValidationError("Only a team manager can manage team membership.")

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

    _previous_membership: tuple[int, int] | None = None

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

            if existing is not None and existing.team_id != self.team_id:
                raise ValidationError(
                    "Move a member by removing the old membership and adding a new one."
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


class TeamInvitation(models.Model):
    """Offer for a registered user to join a team."""

    _allow_status_transition = False

    class Status(models.TextChoices):
        """Available states of a team invitation."""

        PENDING = "pending", "Pending"
        ACCEPTED = "accepted", "Accepted"
        DECLINED = "declined", "Declined"
        WITHDRAWN = "withdrawn", "Withdrawn"

    team = models.ForeignKey(Team, related_name="invitations", on_delete=models.CASCADE)
    invitee = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name="team_invitations",
        on_delete=models.CASCADE,
    )
    invited_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name="sent_team_invitations",
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
    )
    pending_invitee = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name="pending_team_invitations",
        on_delete=models.CASCADE,
        blank=True,
        null=True,
    )
    status = models.CharField(
        max_length=10, choices=Status.choices, default=Status.PENDING
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        """Meta options for the TeamInvitation model."""

        constraints = (
            models.UniqueConstraint(
                fields=["team", "pending_invitee"],
                name="unique_pending_team_invitation",
            ),
            models.CheckConstraint(
                condition=models.Q(
                    status__in=["pending", "accepted", "declined", "withdrawn"]
                ),
                name="team_invitation_status_valid",
            ),
            models.CheckConstraint(
                condition=(
                    models.Q(
                        status="pending",
                        pending_invitee__isnull=False,
                        pending_invitee=models.F("invitee"),
                    )
                    | (
                        ~models.Q(status="pending")
                        & models.Q(pending_invitee__isnull=True)
                    )
                ),
                name="team_invitation_pending_key_valid",
            ),
        )

    def save(
        self,
        *,
        force_insert: bool | tuple[ModelBase, ...] = False,
        force_update: bool = False,
        using: str | None = None,
        update_fields: Iterable[str] | None = None,
    ) -> None:
        """Maintain a nullable uniqueness key for pending invitations."""
        if self.pk is not None and (update_fields is None or "status" in update_fields):
            previous_status = (
                TeamInvitation.objects.filter(pk=self.pk)
                .values_list("status", flat=True)
                .first()
            )
            if (
                previous_status is not None
                and self.status != previous_status
                and not self._allow_status_transition
            ):
                raise ValidationError(
                    "Use an invitation operation to change its status."
                )

        self.pending_invitee_id = (
            self.invitee_id if self.status == self.Status.PENDING else None
        )
        if update_fields is not None:
            update_fields = {*update_fields, "pending_invitee"}
        super().save(
            force_insert=force_insert,
            force_update=force_update,
            using=using,
            update_fields=update_fields,
        )

    def _transition_to(self, status: Status) -> None:
        """Persist a state transition initiated by a validated invitation action."""
        self.status = status
        self._allow_status_transition = True
        try:
            self.save(update_fields=["status", "updated_at"])
        finally:
            self._allow_status_transition = False

    @transaction.atomic
    def accept(self, *, user: User) -> None:
        """Accept this pending invitation and create a non-manager membership."""
        Team.objects.select_for_update().get(pk=self.team_id)
        invitation = TeamInvitation.objects.select_for_update().get(pk=self.pk)
        invitation._ensure_pending()
        if invitation.invitee_id != user.pk:
            raise ValidationError("Only the invited user can accept this invitation.")
        if TeamMembership.objects.filter(team=invitation.team, user=user).exists():
            raise ValidationError("The invited user is already a team member.")
        TeamMembership.objects.create(team=invitation.team, user=user, manager=False)
        invitation._transition_to(self.Status.ACCEPTED)
        self.status = invitation.status
        self.pending_invitee_id = invitation.pending_invitee_id
        self.updated_at = invitation.updated_at

    @transaction.atomic
    def decline(self, *, user: User) -> None:
        """Decline this pending invitation without creating a membership."""
        Team.objects.select_for_update().get(pk=self.team_id)
        invitation = TeamInvitation.objects.select_for_update().get(pk=self.pk)
        invitation._ensure_pending()
        if invitation.invitee_id != user.pk:
            raise ValidationError("Only the invited user can decline this invitation.")
        invitation._transition_to(self.Status.DECLINED)
        self.status = invitation.status
        self.pending_invitee_id = invitation.pending_invitee_id
        self.updated_at = invitation.updated_at

    @transaction.atomic
    def withdraw(self, *, user: User) -> None:
        """Withdraw this pending invitation as a team manager."""
        Team.objects.select_for_update().get(pk=self.team_id)
        invitation = TeamInvitation.objects.select_for_update().get(pk=self.pk)
        invitation._ensure_pending()
        if not user.has_perm("main.manage_team_members", invitation.team):
            raise ValidationError("Only a team manager can withdraw an invitation.")
        invitation._transition_to(self.Status.WITHDRAWN)
        self.status = invitation.status
        self.pending_invitee_id = invitation.pending_invitee_id
        self.updated_at = invitation.updated_at

    def _ensure_pending(self) -> None:
        """Reject state changes after an invitation stops being pending."""
        if self.status != self.Status.PENDING:
            raise ValidationError("Only a pending invitation can change state.")
