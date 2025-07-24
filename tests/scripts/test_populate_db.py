"""Unit tests for the populate_db.py script."""

import json
from pathlib import Path

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

    data_path = Path(__file__).parent.parent / "data" / "framework.json"

    with open(data_path) as f:
        data = json.load(f)

    assert Category.objects.all().count() == 0
    assert Skill.objects.all().count() == 0

    populate_db.populate_categories_and_skills(data)

    assert Category.objects.all().count() == 5
    all_parent_categories = Category.objects.filter(parent_category=None)
    all_subcategories = Category.objects.filter(
        parent_category__in=all_parent_categories
    )
    assert all_parent_categories.count() == 2
    assert all_subcategories.count() == 3
    assert (
        Category.objects.filter(
            parent_category__name="Category 1",
            parent_category__description="Description of Category 1",
        ).count()
        == 2
    )

    assert Skill.objects.all().count() == 4
    assert Skill.objects.filter(category__parent_category=None).count() == 0
    assert (
        Skill.objects.filter(
            category__name="Subcategory 1",
            category__description="Description of Subcategory 1",
        ).count()
        == 2
    )


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

    assert SkillLevel.objects.all().count() == 0

    populate_db.populate_skill_levels(data)

    assert SkillLevel.objects.all().count() == 2
