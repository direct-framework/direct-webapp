"""Admin module for the main app."""

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.http import HttpRequest

from .models import (
    Category,
    LearningResource,
    Provider,
    Skill,
    SkillLevel,
    Tool,
    User,
    UserSkill,
)

admin.site.register(User, UserAdmin)


class CategoryInline(admin.TabularInline[Category, Category]):
    """Inline admin class for the Category model."""

    model = Category
    extra = 0
    show_change_link = True
    exclude = ("slug",)
    verbose_name = "Sub-Category"
    verbose_name_plural = "Sub-Categories"


class SkillInline(admin.TabularInline[Skill, Category]):
    """Inline admin class for the Skill model."""

    model = Skill
    extra = 0


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin[Category]):
    """Admin class for the Category model."""

    list_display = ("name", "parent_category")
    search_fields = ("name", "description")
    list_filter = ("parent_category",)
    ordering = ("parent_category", "name")

    def get_inlines(  # type: ignore[override]
        self, request: HttpRequest, obj: Category | None = None
    ) -> list[type[CategoryInline] | type[SkillInline]]:
        """Return the inlines to use for edit views depending on Category status.

        If the Category is a Parent Category, show the Sub-Categories.
        If the Category is a Sub-Category, show the Skills.
        """
        if not obj:
            return []
        if obj.parent_category is None:
            return [CategoryInline]
        return [SkillInline]


class LearningResourceInline(admin.TabularInline[LearningResource, Provider]):
    """Inline admin class for the LearningResource model."""

    model = LearningResource
    extra = 0
    show_change_link = True
    exclude = ("slug",)


@admin.register(Provider)
class ProviderAdmin(admin.ModelAdmin[Provider]):
    """Admin class for The Provider model."""

    list_display = ("name", "url", "ror")
    search_fields = ("name",)
    inlines = (LearningResourceInline,)


class ToolInline(admin.TabularInline[Tool, LearningResource]):
    """Inline admin class for the Tool model."""

    model = Tool.learning_resources.through  # type: ignore[assignment]
    extra = 0
    verbose_name = "Tool, Methodology, Behaviour or Language"
    verbose_name_plural = "Tools, Methodologies, Behaviours and Languages"


@admin.register(LearningResource)
class LearningResourceAdmin(admin.ModelAdmin[LearningResource]):
    """Admin class for The LearningResource model."""

    list_display = ("name", "language", "url", "provider")
    search_fields = ("name",)
    inlines = (ToolInline,)


@admin.register(Tool)
class ToolAdmin(admin.ModelAdmin[Tool]):
    """Admin class for The Tool model."""

    list_display = ("name", "kind", "url")
    search_fields = ("name",)


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin[Skill]):
    """Admin class for the Skill model."""

    list_display = ("name", "category", "category__parent_category")
    search_fields = ("name", "description")
    list_filter = ("category__parent_category", "category")
    ordering = ("category__parent_category", "category", "name")


@admin.register(SkillLevel)
class SkillLevelAdmin(admin.ModelAdmin[SkillLevel]):
    """Admin class for The SkillLevel model."""

    list_display = ("name", "level")
    search_fields = ("name",)


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
        verbose_name = "User Skills"
        verbose_name_plural = "User Skills"


@admin.register(UserProxy)
class CustomUserSkillAdmin(admin.ModelAdmin[UserProxy]):
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
    )
    readonly_fields = ("username", "first_name", "last_name", "email", "is_active")
    list_display = ("username", "first_name", "last_name", "email", "is_active")
    search_fields = ("username", "first_name", "last_name", "email")
    list_filter = ("is_active",)
    inlines = (UserSkillInline,)

    def has_add_permission(self, request: HttpRequest) -> bool:
        """Do not allow adding new users from this view."""
        return False
