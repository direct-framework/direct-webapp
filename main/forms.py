"""Forms module for the main app."""

from typing import TYPE_CHECKING, Any

from crispy_forms.helper import FormHelper
from crispy_forms.layout import HTML, Div, Layout, Submit
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
                label="Skill Level",
                widget=forms.Select(attrs={"class": "form-select form-select-sm"}),
            )

        # Set up crispy forms helper
        self.helper = FormHelper()
        self.helper.form_method = "post"

        # Build the layout structure
        layout_elements = []

        for parent_category, subcategories in skill_organization.items():
            # Add parent category heading
            parent_heading = (
                f'<h2 class="card-title text-primary mt-5">{parent_category}</h2>'
            )
            parent_div = Div(HTML(parent_heading), css_class="mb-5")

            subcategory_elements = []
            for subcategory, skills_list in subcategories.items():
                # Add subcategory heading
                subcategory_heading = f"<h4>{subcategory}</h4>"

                # Outer card div
                subcategory_div = Div(css_class="mt-5 card rounded-1")

                # Card body div with heading and table
                card_body_div = Div(css_class="card-body")

                # Add subcategory heading inside card body
                card_body_div.append(HTML(subcategory_heading))

                # Build the table for skills
                table_html = """
                <table class="table mt-2">
                    <thead>
                        <tr>
                            <th scope="col">Skill</th>
                            <th scope="col">Description</th>
                            <th scope="col">Your Level</th>
                        </tr>
                    </thead>
                    <tbody>
                """
                for skill in skills_list:
                    table_html += f"""
                        <tr>
                            <td class="fw-semibold">{skill.name}</td>
                            <td>{skill.description}</td>
                            <td>{{{{ form.skill_{skill.id} }}}}</td>
                        </tr>
                    """
                table_html += """
                    </tbody>
                </table>
                """

                # Append table to card body
                card_body_div.append(HTML(table_html))

                # Add a submit button for this subcategory
                subcategory_submit = Div(
                    Submit(
                        f"submit_{subcategory.replace(' ', '_')}",
                        "Save",
                        css_class="btn btn-primary mt-3",
                    ),
                    css_class="mt-3",
                )
                card_body_div.append(subcategory_submit)

                # Append card body to the card
                subcategory_div.append(card_body_div)

                # Add the subcategory div to elements
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
