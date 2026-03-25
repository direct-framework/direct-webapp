"""Tests for the User related models in the main app."""

import pytest
from django.core.exceptions import ValidationError

from main.models import Skill, SkillLevel, UserSkill


@pytest.mark.django_db
def test_user_skill_model(
    user_skill: UserSkill, user, skill: Skill, skill_level: SkillLevel
) -> None:
    """Test the UserSkill model."""
    assert user_skill.user == user
    assert user_skill.skill == skill
    assert user_skill.skill_level == skill_level

    new_skill_level = SkillLevel.objects.create(
        name="Intermediate",
        description="Intermediate level",
        level=2,
        short_description="Intermediate",
    )

    new_user_skill = UserSkill(user=user, skill=skill, skill_level=new_skill_level)
    with pytest.raises(
        ValidationError, match=r"User skill with this User and Skill already exists."
    ):
        new_user_skill.full_clean()
