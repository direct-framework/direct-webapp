"""Forms module for the main app."""

from typing import TYPE_CHECKING, Any

from crispy_forms.helper import FormHelper
from crispy_forms.layout import HTML, Div, Field, Layout, Submit
from django import forms
from django.forms import ModelForm

from .models import Skill, SkillLevel, UserSkill

if TYPE_CHECKING:  # pragma: no cover
    from .models import User as UserType


class UserSkillForm(ModelForm[UserSkill]):
    """Form for user skills."""

    class Meta:  # noqa: D106
        model = UserSkill
        fields = ("skill", "skill_level")


class UserSkillsForm(forms.Form):
    """Form for creating UserSkills for all skills in the database."""

    def __init__(self, *args: Any, user: "UserType", **kwargs: Any) -> None:
        """Initialize the form with a field for each skill."""
        self.user = user
        super().__init__(*args, **kwargs)

        # Get all skills, ordered by category for better organization
        skills = Skill.objects.select_related(
            "category", "category__parent_category"
        ).order_by("category__parent_category__name", "category__name", "name")

        # Get all skill levels for the choice field
        skill_levels = SkillLevel.objects.all().order_by("level")
        skill_level_choices = [
            (level.id, f"{level.level} - {level.name}") for level in skill_levels
        ]

        # Store skill organization data for layout building
        skill_organization: dict[str, dict[str, list[Skill]]] = {}

        # Create a field for each skill
        for skill in skills:
            field_name = f"skill_{skill.id}"

            # Check if user already has this skill
            existing_user_skill = None
            if self.user:
                try:
                    existing_user_skill = UserSkill.objects.get(
                        user=self.user, skill=skill
                    )
                except UserSkill.DoesNotExist:
                    pass

            # Set initial value if user already has this skill
            initial_value = (
                existing_user_skill.skill_level.id if existing_user_skill else None
            )

            # Organize skills by category hierarchy for layout
            parent_name = (
                skill.category.parent_category.name
                if skill.category.parent_category
                else "No Parent"
            )

            if parent_name not in skill_organization:
                skill_organization[parent_name] = {}

            if skill.category.name not in skill_organization[parent_name]:
                skill_organization[parent_name][skill.category.name] = []

            skill_organization[parent_name][skill.category.name].append(skill)

            # Create form field with just the skill name as label
            self.fields[field_name] = forms.ChoiceField(
                choices=[("", "--- Select Level ---"), *skill_level_choices],
                required=False,
                initial=initial_value,
                label=skill.name,
                help_text=skill.description,
            )

        # Set up crispy forms helper
        self.helper = FormHelper()
        self.helper.form_method = "post"

        # Build the layout structure
        layout_elements = []

        for parent_category, subcategories in skill_organization.items():
            # Add parent category heading
            parent_heading = (
                f'<h3 class="h3 text-primary border-bottom">{parent_category}</h3>'
            )
            parent_div = Div(HTML(parent_heading), css_class="mb-5")

            subcategory_elements = []
            for subcategory, skills_list in subcategories.items():
                # Add subcategory heading
                subcategory_heading = f"<h4>{subcategory}</h4>"
                subcategory_div = Div(HTML(subcategory_heading), css_class="ms-3 mb-4")

                # Create skills grid
                grid_classes = "row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3 ms-3"
                skills_grid = Div(css_class=grid_classes)

                for skill in skills_list:
                    skill_card = Div(
                        Div(Field(f"skill_{skill.id}"), css_class="card-body"),
                        css_class="card h-100 bg-light border-1",
                    )
                    skills_grid.append(Div(skill_card, css_class="col"))

                subcategory_div.append(skills_grid)
                subcategory_elements.append(subcategory_div)

            parent_div.extend(subcategory_elements)
            layout_elements.append(parent_div)

        # Add submit button
        cancel_link = (
            "<a href=\"{% url 'profile' %}\" "
            'class="btn btn-secondary btn-lg ms-2">Cancel</a>'
        )
        layout_elements.append(
            Div(
                Submit(
                    "submit",
                    "Save All Skill Assessments",
                    css_class="btn btn-primary btn-lg",
                ),
                HTML(cancel_link),
                css_class="mt-4 pt-3 border-top",
            )
        )

        self.helper.layout = Layout(*layout_elements)

    def save(self, user: "UserType") -> tuple[list[UserSkill], list[UserSkill]]:
        """Save the form data as UserSkill instances."""
        created_skills = []
        updated_skills = []

        for field_name, skill_level_id in self.cleaned_data.items():
            if field_name.startswith("skill_") and skill_level_id:
                skill_id = int(field_name.replace("skill_", ""))
                skill = Skill.objects.get(id=skill_id)
                skill_level = SkillLevel.objects.get(id=skill_level_id)

                # Check if UserSkill already exists
                user_skill, created = UserSkill.objects.get_or_create(
                    user=user, skill=skill, defaults={"skill_level": skill_level}
                )

                if not created:
                    # Update existing UserSkill
                    user_skill.skill_level = skill_level
                    user_skill.save()
                    updated_skills.append(user_skill)
                else:
                    created_skills.append(user_skill)

        return created_skills, updated_skills
