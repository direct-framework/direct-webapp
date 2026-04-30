"""Admin module for the main app."""

from typing import Any

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.http import HttpRequest
from import_export.admin import ImportExportModelAdmin

from .io_resources import (
    CompetencyDomainResource,
    CompetencyResource,
    LearningResourceResource,
    ProviderResource,
    SkillLevelResource,
    SkillResource,
    ToolLanguageMethodologyResource,
)
from .models import (
    Competency,
    CompetencyDomain,
    LearningResource,
    Provider,
    Skill,
    SkillLevel,
    Team,
    TeamMembership,
    ToolLanguageMethodology,
    User,
    UserSkill,
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


class CompetencyInline(admin.TabularInline[Competency, Competency]):
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


class UserSkillInline(admin.TabularInline[UserSkill, User]):
    """Inline admin class for the UserSkill model."""

    model = UserSkill
    extra = 1


class UserProxy(User):
    """A proxy model of the User model to create a User Skills admin view.

    This is required to make a second admin view tied to the User model.
    """

    class Meta:
        """Make model a proxy and set verbose names."""

        proxy = True
        verbose_name = "User skills profile"


@admin.register(UserProxy)
class CustomUserSkillsProfilesAdmin(admin.ModelAdmin[UserProxy]):
    """Admin class for adding UserSkills in bulk to individual Users."""

    exclude = (
        "username",
        "password",
        "first_name",
        "last_name",
        "email",
        "last_login",
        "is_superuser",
        "is_staff",
        "is_active",
        "date_joined",
        "groups",
        "user_permissions",
        "agreed_to_tos",
        "date_agreed",
    )
    readonly_fields = ("username", "first_name", "last_name", "email", "is_active")
    list_display = ("username", "is_active")
    search_fields = ("username", "email")
    list_filter = ("is_active",)
    inlines = (UserSkillInline,)

    def has_add_permission(self, request: HttpRequest) -> bool:
        """Do not allow adding new users from this view."""
        return False

    def has_delete_permission(
        self, request: HttpRequest, obj: UserProxy | None = None
    ) -> bool:
        """Do not allow deleting users from this view."""
        return False


@admin.register(Team)
class TeamAdmin(admin.ModelAdmin[Team]):
    """Admin class for the Team model."""


@admin.register(TeamMembership)
class TeamMembershipAdmin(admin.ModelAdmin[TeamMembership]):
    """Admin class for the TeamMembership model."""
