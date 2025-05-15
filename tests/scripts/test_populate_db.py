"""Unit tests for the populate_db.py script."""

import pytest

import scripts.populate_db as populate_db


@pytest.mark.parametrize(
    "args",
    [
        (["-z"]),
        (["-y"]),
        (["-j"]),
        (["-y", "data.yaml", "-j", "data.json"]),
        (["-j", "data.json", "-y", "data.yaml"]),
    ],
)
def test_get_parser_invalid_args(args: list[str]) -> None:
    """Sad path unit test for the custom cli argument parser."""
    parser = populate_db.get_parser()

    with pytest.raises(SystemExit) as e_info:
        parser.parse_args(args)

    assert str(e_info.value) == "2"


@pytest.mark.django_db
def test_populate_categories_and_skills() -> None:
    """Test the populate_categories_and_skills function."""
    from main.models import Category, Skill

    data = {
        "Category 1": {
            "Sub Category 1": {
                "Skill 1": {"name": "Skill 1", "description": "Description of Skill 1"},
                "Skill 2": {"name": "Skill 2", "description": "Description of Skill 2"},
            },
            "Sub Category 2": {
                "Skill 3": {"name": "Skill 3", "description": "Description of Skill 3"}
            },
        },
        "Category 2": {
            "Sub Category 3": {
                "Skill 4": {"name": "Skill 4", "description": "Description of Skill 4"}
            },
            "Sub Category 4": {
                "Skill 5": {"name": "Skill 5", "description": "Description of Skill 5"}
            },
        },
    }

    initial_categories_count = 0
    initial_categories = Category.objects.all()
    for cat in initial_categories:
        initial_categories_count += 1
    assert initial_categories_count == 0

    initial_skills_count = 0
    initial_skills = Skill.objects.all()
    for skill in initial_skills:
        initial_skills_count += 1
    assert initial_skills_count == 0

    populate_db.populate_categories_and_skills(data)

    categories_count = 0
    categories = Category.objects.all()
    for cat in categories:
        categories_count += 1
    assert categories_count == 6

    skills_count = 0
    skills = Skill.objects.all()
    for skill in skills:
        skills_count += 1
    assert skills_count == 5


@pytest.mark.django_db
def test_populate_skill_levels() -> None:
    """Test the populate_skill_levels function."""
    from main.models import SkillLevel

    data = [
        {
            "Level": 0,
            "Name": "Name of Level 0",
            "Description": "Description of Level 0",
        },
        {
            "Level": 1,
            "Name": "Name of Level 1",
            "Description": "Description of Level 1",
        },
    ]

    initial_skill_levels_count = 0
    initial_skill_levels = SkillLevel.objects.all()
    for skill in initial_skill_levels:
        initial_skill_levels_count += 1
    assert initial_skill_levels_count == 0

    populate_db.populate_skill_levels(data)

    skill_levels_count = 0
    skill_levels = SkillLevel.objects.all()
    for skill in skill_levels:
        skill_levels_count += 1
    assert skill_levels_count == 2
