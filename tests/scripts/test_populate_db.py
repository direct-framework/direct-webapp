"""Unit tests for the populate_db.py script."""

import json
import logging
from pathlib import Path

import pytest

import scripts.populate_db as populate_db
from main.models import Category, Skill, SkillLevel


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
def test_populate_categories_and_skills_invalid_data(caplog) -> None:
    """Test the loop skips categories and skills that are invalid and logs a warning."""
    data = {
        "categories": [
            {
                "title": "Category 1",
                "description": "Description of Category 1",
                "subcategories": [{"title": "Subcategory 1", "description": None}],
            },
            {
                "title": "Category 2",
                "description": None,
                "subcategories": [],
            },
        ],
    }

    with caplog.at_level("WARNING"):
        populate_db.populate_categories_and_skills(data)
    assert caplog.record_tuples[-1] == (
        "django",
        logging.WARNING,
        "Any subcategories under Category 2 skipped!",
    )
    assert caplog.record_tuples[-3] == (
        "django",
        logging.WARNING,
        "Any skills under Subcategory 1 skipped!",
    )


@pytest.mark.django_db
def test_populate_skill_levels(caplog) -> None:
    """Test the populate_skill_levels function."""
    data: list[dict[str, str | int]] = [
        {
            "level": 0,
            "name": "Name of Level 0",
            "description": "Description of Level 0",
            "short_description": "Short description of Level 0",
            "focus": "Focus of Level 0",
        },
        {
            "level": 1,
            "name": "Name of Level 1",
            "description": "Description of Level 1",
            "short_description": "Short description of Level 1",
            "focus": "Focus of Level 1",
        },
        {
            "level": 1,  # Duplicate level - will overwrite previous
            "name": "Name of Level 1",
            "description": "Description of Level 1",
            "short_description": "Short description of Level 1",
            "focus": "Focus of Level 1",
        },
        {
            "level": "one",  # Invalid level
            "name": "Name of Level 1",
            "description": "Description of Level 1",
            "short_description": "Short description of Level 1",
            "focus": "Focus of Level 1",
        },
        {
            "level": 2,
            "name": "Name of Level 2" * 200,  # Name too long
            "description": "Description of Level 2",
            "short_description": "Short description of Level 2",
            "focus": "Focus of Level 2",
        },
    ]

    assert SkillLevel.objects.all().count() == 0

    with caplog.at_level("INFO"):
        populate_db.populate_skill_levels(data)

    assert SkillLevel.objects.all().count() == 2
    assert caplog.record_tuples[-1] == (
        "django",
        logging.WARNING,
        f"SkillLevel with invalid fields skipped: {'Name of Level 2' * 200} "
        "{'name': ['Ensure this value has at most 200 characters (it has 3000).']}",
    )
    assert caplog.record_tuples[-2] == (
        "django",
        logging.WARNING,
        "SkillLevel with invalid fields skipped: Name of Level 1 "
        "{'level': ['“one” value must be an integer.']}",
    )
    assert caplog.record_tuples[-3] == (
        "django",
        logging.INFO,
        "SkillLevel added to database: Name of Level 1 - "
        "existing object 'Name of Level 1' overwritten",
    )


@pytest.mark.django_db
def test_add_object_to_db(caplog) -> None:
    """Test the add_object_to_db function."""
    assert Category.objects.all().count() == 0

    instance = populate_db.add_object_to_db(
        Category, slug="cat", name="Test Category", description="Test Description"
    )

    assert instance.pk is not None  # type: ignore[union-attr]
    assert instance.name == "Test Category"  # type: ignore[union-attr]
    assert instance.description == "Test Description"  # type: ignore[union-attr]
    assert Category.objects.all().count() == 1

    # Test adding the same object again
    with caplog.at_level("INFO"):
        instance2 = populate_db.add_object_to_db(
            Category, slug="cat", name="Test Category", description="Test Description"
        )
    assert instance2 == instance
    assert caplog.record_tuples[-1] == (
        "django",
        logging.INFO,
        "Category added to database: Test Category - "
        "existing object 'Test Category' overwritten",
    )
    assert Category.objects.all().count() == 1

    # Test adding an object with invalid fields
    with caplog.at_level("INFO"):
        instance3 = populate_db.add_object_to_db(
            Category, slug=None, name="Invalid Category"
        )
    assert instance3 is None
    assert caplog.record_tuples[-1] == (
        "django",
        logging.WARNING,
        "Category with invalid fields skipped: Invalid Category "
        "{'description': ['This field cannot be blank.']}",
    )
    assert Category.objects.all().count() == 1

    # Test changing an object with the same slug
    with caplog.at_level("INFO"):
        instance4 = populate_db.add_object_to_db(
            Category,
            slug="cat",
            name="Updated Category",
            description="Updated Description",
        )
    assert instance4.pk == instance.pk  # type: ignore[union-attr]
    assert instance4.name == "Updated Category"  # type: ignore[union-attr]
    assert instance4.description == "Updated Description"  # type: ignore[union-attr]
    assert caplog.record_tuples[-1] == (
        "django",
        logging.INFO,
        "Category added to database: Updated Category - "
        "existing object 'Test Category' overwritten",
    )
    assert Category.objects.all().count() == 1  # No new object created

    # Test adding an object with invalid data
    Category.objects.create(  # type: ignore[misc]
        name="Sub Category",
        description="Description",
        parent_category=instance,
    )  # Create a sub-category to make instance a parent category
    with caplog.at_level("INFO"):
        instance5 = populate_db.add_object_to_db(
            Skill,
            slug="skill",
            name="Skill",
            description="Description",
            category=instance,  # Cannot have a parent category as a skill category
        )
    assert instance5 is None
    assert caplog.record_tuples[-1] == (
        "django",
        logging.WARNING,
        "Skill with invalid data skipped: Skill (Test Category) "
        "{'category': ['The category cannot be a top-level category.']}",
    )
    assert Skill.objects.all().count() == 0
