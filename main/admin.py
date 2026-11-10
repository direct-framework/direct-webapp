"""Admin module for the main app."""

from collections.abc import Sequence
from typing import Any

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.core.exceptions import ValidationError
from django.db import transaction
from django.db.models import QuerySet
from django.forms import ModelForm
from django.forms.models import BaseInlineFormSet
from django.http import HttpRequest
from guardian.admin import GuardedModelAdmin
from import_export.admin import ImportExportModelAdmin

from .io_resources import (
    CompetencyDomainResource,
    CompetencyResource,
    EventResource,
    LearningResourceResource,
    ProviderResource,
    SkillLevelResource,
    SkillResource,
    ToolLanguageMethodologyResource,
)
from .models import (
    Competency,
    CompetencyDomain,
    Event,
    LearningResource,
    Profile,
    Provider,
    Skill,
    SkillLevel,
    SkillProfile,
    Team,
    TeamMembership,
    ToolLanguageMethodology,
    User,
)


@admin.register(User)
class CustomUserAdmin(UserAdmin[User]):
    """Override the UserAdmin to display extra fields."""

    list_display = (*UserAdmin.list_display, "is_active", "agreed_to_tos")  # type: ignore[misc]
    list_filter = (*UserAdmin.list_filter, "agreed_to_tos")
    fieldsets = (  # type: ignore[misc]
        *UserAdmin.fieldsets,
        (("Terms and Conditions"), {"fields": ("agreed_to_tos", "date_agreed")}),
    )
    readonly_fields = ("agreed_to_tos", "date_agreed")

    def get_deleted_objects(
        self, objs: Sequence[User] | QuerySet[User], request: HttpRequest
    ) -> tuple[list[str], dict[str, int], set[str], list[str]]:
        """Show protected team memberships when deleting a last manager."""
        deleted_objects, model_count, perms_needed, protected = (
            super().get_deleted_objects(objs, request)
        )
        deleting_user_ids = [user.pk for user in objs]
        for membership in (
            TeamMembership.objects.filter(user_id__in=deleting_user_ids, manager=True)
            .select_related("team")
            .only("pk", "team__name", "team_id")
        ):
            has_other_manager = (
                TeamMembership.objects.filter(team_id=membership.team_id, manager=True)
                .exclude(user_id__in=deleting_user_ids)
                .exists()
            )
            if not has_other_manager:
                protected.append(f"{membership.team} must retain at least one manager.")
        return deleted_objects, model_count, perms_needed, protected


class CompetencyInline(admin.TabularInline[Competency, CompetencyDomain]):
    """Inline admin class for the Competency model."""

    model = Competency
    extra = 0
    show_change_link = True
    exclude = ("slug",)
    verbose_name = "Competency"
    verbose_name_plural = "Competencies"


class SkillInline(admin.TabularInline[Skill, Competency]):
    """Inline admin class for the Skill model."""

    model = Skill
    extra = 0


@admin.register(Competency)
class CompetencyAdmin(ImportExportModelAdmin[Competency]):
    """Admin class for the Competency model."""

    list_display = ("name", "competency_domain")
    search_fields = ("name", "description")
    list_filter = ("competency_domain",)
    ordering = ("competency_domain", "name")
    inlines = (SkillInline,)
    resource_classes = (CompetencyResource,)


@admin.register(CompetencyDomain)
class CompetencyDomainAdmin(ImportExportModelAdmin[CompetencyDomain]):
    """Admin class for the CompetencyDomain model."""

    list_display = ("name",)
    search_fields = ("name", "description")
    inlines = (CompetencyInline,)
    resource_classes = (CompetencyDomainResource,)


class LearningResourceInline(admin.TabularInline[LearningResource, Provider]):
    """Inline admin class for the LearningResource model."""

    model = LearningResource
    extra = 0
    show_change_link = True
    exclude = ("slug",)


@admin.register(Provider)
class ProviderAdmin(ImportExportModelAdmin[Provider]):
    """Admin class for The Provider model."""

    list_display = ("name", "url", "ror")
    search_fields = ("name",)
    inlines = (LearningResourceInline,)
    resource_classes = (ProviderResource,)


class ToolInline(admin.TabularInline[ToolLanguageMethodology, LearningResource]):
    """Inline admin class for the Tool model."""

    model = ToolLanguageMethodology.learning_resources.through  # type: ignore[assignment]
    extra = 0
    verbose_name = "Tool, Methodology, Behaviour or Language"
    verbose_name_plural = "Tools, Methodologies, Behaviours and Languages"


@admin.register(LearningResource)
class LearningResourceAdmin(ImportExportModelAdmin[LearningResource]):
    """Admin class for The LearningResource model."""

    list_display = ("name", "get_language_display", "url", "provider")
    search_fields = ("name",)
    inlines = (ToolInline,)
    resource_classes = (LearningResourceResource,)

    @admin.display(description="language", ordering="language")
    def get_language_display(self, obj: LearningResource) -> Any:
        """Enable displaying multiple languages in the list display."""
        return obj.get_language_display()


@admin.register(ToolLanguageMethodology)
class ToolAdmin(ImportExportModelAdmin[ToolLanguageMethodology]):
    """Admin class for The Tool model."""

    list_display = ("name", "kind", "url")
    search_fields = ("name",)
    list_filter = ("kind",)
    resource_classes = (ToolLanguageMethodologyResource,)


@admin.register(Skill)
class SkillAdmin(ImportExportModelAdmin[Skill]):
    """Admin class for the Skill model."""

    list_display = ("name", "competency", "competency__competency_domain")
    search_fields = ("name", "description")
    list_filter = ("competency__competency_domain", "competency")
    ordering = ("competency__competency_domain", "competency", "name")
    resource_classes = (SkillResource,)


@admin.register(SkillLevel)
class SkillLevelAdmin(ImportExportModelAdmin[SkillLevel]):
    """Admin class for The SkillLevel model."""

    list_display = ("name", "level")
    search_fields = ("name",)
    resource_classes = (SkillLevelResource,)


@admin.register(Event)
class EventAdmin(ImportExportModelAdmin[Event]):
    """Admin class for the Event model."""

    list_display = ("title", "start_date", "end_date", "location")
    search_fields = ("title", "description", "contributors")
    ordering = ("-start_date",)
    resource_classes = (EventResource,)


class SkillProfileInline(admin.TabularInline[SkillProfile, Profile]):
    """Inline admin class for the SkillProfile model."""

    model = SkillProfile
    extra = 1


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin[Profile]):
    """Admin class for the Profile model."""

    fields = (
        "user",
        "user_first_name",
        "user_last_name",
        "user_email",
        "user_is_active",
    )
    list_display = (
        "user",
        "user__first_name",
        "user__last_name",
        "user__email",
        "user__is_active",
    )
    search_fields = (
        "user__username",
        "user__first_name",
        "user__last_name",
        "user__email",
        "user__is_active",
    )
    list_filter = ("user__is_active",)
    readonly_fields = fields
    inlines = (SkillProfileInline,)

    @admin.display(description="First name", ordering="user__first_name")
    def user_first_name(self, obj: Profile) -> str:
        """Render user first name in the detail/edit view."""
        if obj.user is None:
            return ""
        return obj.user.first_name

    @admin.display(description="Last name", ordering="user__last_name")
    def user_last_name(self, obj: Profile) -> str:
        """Render user last name in the detail/edit view."""
        if obj.user is None:
            return ""
        return obj.user.last_name

    @admin.display(description="Email", ordering="user__email")
    def user_email(self, obj: Profile) -> str:
        """Render user email in the detail/edit view."""
        if obj.user is None:
            return ""
        return obj.user.email

    @admin.display(description="Active", boolean=True, ordering="user__is_active")
    def user_is_active(self, obj: Profile) -> bool:
        """Render user is_active status in the detail/edit view."""
        if obj.user is None:
            return False
        return obj.user.is_active

    def has_delete_permission(
        self, request: HttpRequest, obj: Profile | None = None
    ) -> bool:
        """Prevent direct deletion of Profiles with associated users."""
        # Show checkboxes for bulk-deletion
        if obj is None:
            return True
        # Allow deletion via the User admin page and when there is no related user
        if "user" in request.path or obj.user is None:
            return True
        return False


class TeamMembershipInlineFormSet(
    BaseInlineFormSet[TeamMembership, Team, ModelForm[TeamMembership]]
):
    """Keep each team manager-editable through admin membership changes."""

    def clean(self) -> None:
        """Reject inline edits that would leave a team without a manager."""
        super().clean()
        if any(self.errors):
            return
        if not any(
            form.cleaned_data.get("manager")
            for form in self.forms
            if form.cleaned_data and not form.cleaned_data.get("DELETE", False)
        ):
            raise ValidationError("A team must retain at least one manager.")


class TeamMembershipInline(admin.TabularInline[TeamMembership, Team]):
    """Inline admin class for the Competency model."""

    model = TeamMembership
    formset = TeamMembershipInlineFormSet
    extra = 0
    show_change_link = False
    verbose_name = "Team Member"


@admin.register(Team)
class TeamAdmin(GuardedModelAdmin):
    """Admin class for the Team model."""

    list_display = ("name", "description")
    search_fields = ("name", "description")
    inlines = (TeamMembershipInline,)

    @transaction.atomic
    def save_formset(
        self,
        request: HttpRequest,
        form: ModelForm[Team],
        formset: BaseInlineFormSet[TeamMembership, Team, ModelForm[TeamMembership]],
        change: bool,
    ) -> None:
        """Apply new or promoted managers before demotions and removals."""
        memberships = formset.save(commit=False)
        for membership in memberships:
            if membership.manager:
                membership.save()
        for membership in memberships:
            if not membership.manager:
                membership.save()
        for membership in formset.deleted_objects:
            membership.delete()
        formset.save_m2m()
