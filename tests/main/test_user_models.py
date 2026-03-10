"""Tests for the User related models in the main app."""

import pytest
from django.core.exceptions import ValidationError

from main.models import Skill, SkillLevel, UserSkill


@pytest.fixture
def user_skill(user, skill: Skill, skill_level: SkillLevel) -> UserSkill:
    """Fixture for creating a UserSkill instance."""
    return UserSkill.objects.create(user=user, skill=skill, skill_level=skill_level)


@pytest.mark.django_db
def test_user_skill_model(
    user_skill: UserSkill, user, skill: Skill, skill_level: SkillLevel
) -> None:
    """Test the UserSkill model."""
    assert user_skill.user == user
    assert user_skill.skill == skill
    assert user_skill.skill_level == skill_level

    new_skill_level = SkillLevel.objects.create(
        level=2, name="Intermediate", description="Intermediate level"
    )

    new_user_skill = UserSkill(user=user, skill=skill, skill_level=new_skill_level)
    with pytest.raises(
        ValidationError, match=r"User skill with this User and Skill already exists."
    ):
        new_user_skill.full_clean()
