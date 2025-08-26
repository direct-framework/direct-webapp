"""Admin module for the main app."""

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import (
    Category,
    ExampleUser,
    ExampleUserSkill,
    Skill,
    SkillLevel,
    User,
    UserSkill,
)

admin.site.register(User, UserAdmin)


@admin.register(ExampleUser)
class ExampleUserAdmin(admin.ModelAdmin[ExampleUser]):
    """Admin class for the ExampleUser model."""

    list_display = ("name",)
    search_fields = ("name",)
    ordering = ("name",)


@admin.register(ExampleUserSkill)
class ExampleUserSkillAdmin(admin.ModelAdmin[ExampleUserSkill]):
    """Admin class for the ExampleUserSkill model."""

    list_display = ("example_user", "skill", "skill_level")
    search_fields = ("example_user", "skill")


class CategoryAdmin(admin.ModelAdmin[Category]):
    """Admin class for the Category model."""

    list_display = ("name", "description", "parent_category")
    search_fields = ("name", "description")
    list_filter = ("parent_category",)
    ordering = ("name",)


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin[Skill]):
    """Admin class for the Skill model."""

    list_display = ("name", "description", "category")
    search_fields = ("name", "description")
    list_filter = ("category",)
    ordering = ("name",)


@admin.register(SkillLevel)
class SkillLevelAdmin(admin.ModelAdmin[SkillLevel]):
    """Admin class for The SkillLevel model."""

    list_display = ("name", "level")
    search_fields = ("name",)


@admin.register(UserSkill)
class UserSkillAdmin(admin.ModelAdmin[UserSkill]):
    """Admin class for The UserSkill model."""

    list_display = ("user", "skill", "skill_level")
    search_fields = ("user", "skill")
