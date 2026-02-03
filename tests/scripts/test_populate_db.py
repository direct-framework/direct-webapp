"""Unit tests for the populate_db.py script."""

import json
import logging
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
def test_populate_skill_levels(caplog) -> None:
    """Test the populate_skill_levels function."""
    from main.models import SkillLevel

    data: list[dict[str, str | int]] = [
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
        {
            "Level": 1,  # Duplicate level
            "Name": "Name of Level 1",
            "Description": "Description of Level 1",
        },
        {
            "Level": "one",  # Invalid level
            "Name": "Name of Level 1",
            "Description": "Description of Level 1",
        },
        {
            "Level": 2,
            "Name": "Name of Level 2" * 200,  # Name too long
            "Description": "Description of Level 2",
        },
    ]

    assert SkillLevel.objects.all().count() == 0

    with caplog.at_level("INFO"):
        populate_db.populate_skill_levels(data)

    assert SkillLevel.objects.all().count() == 2
    assert caplog.record_tuples[-1] == (
        "django",
        logging.INFO,
        "SkillLevel with invalid fields skipped: {'name': ['Ensure this value has at "
        "most 200 characters (it has 3000).']}",
    )
    assert caplog.record_tuples[-2] == (
        "django",
        logging.INFO,
        "SkillLevel with invalid fields skipped: {'level': ['“one” value must be an "
        "integer.']}",
    )
    assert caplog.record_tuples[-3] == (
        "django",
        logging.INFO,
        "SkillLevel already exists, skipping: Name of Level 1",
    )


@pytest.mark.django_db
def test_add_object_to_db(caplog) -> None:
    """Test the add_object_to_db function."""
    from main.models import Category

    assert Category.objects.all().count() == 0

    instance = populate_db.add_object_to_db(
        Category, name="Test Category", description="Test Description"
    )

    assert instance.pk is not None  # type: ignore[union-attr]
    assert instance.name == "Test Category"  # type: ignore[union-attr]
    assert instance.description == "Test Description"  # type: ignore[union-attr]
    assert Category.objects.all().count() == 1

    # Test adding the same object again
    with caplog.at_level("INFO"):
        instance2 = populate_db.add_object_to_db(
            Category, name="Test Category", description="Test Description"
        )
    assert instance2 == instance
    assert caplog.record_tuples[-1] == (
        "django",
        logging.INFO,
        "Category already exists, skipping: Test Category",
    )
    assert Category.objects.all().count() == 1

    # Test adding an object with invalid fields
    with caplog.at_level("INFO"):
        instance3 = populate_db.add_object_to_db(Category, name="Invalid Category")
    assert instance3 is None
    assert caplog.record_tuples[-1] == (
        "django",
        logging.INFO,
        "Category with invalid fields skipped: {'description': ['This field cannot be "
        "blank.']}",
    )
    assert Category.objects.all().count() == 1
