"""Unit tests for the populate_db.py script."""

import json
import logging
from pathlib import Path

import pytest

import scripts.populate_db as populate_db
from main.models import Competency, Skill, SkillLevel


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


@pytest.mark.xfail(
    reason="This functionality will be completely overhauled in the future and is not "
    "worth testing in its current state."
)
@pytest.mark.django_db
def test_populate_competencies_and_skills() -> None:
    """Test the populate_competencies_and_skills function."""
    data_path = Path(__file__).parent.parent / "data" / "framework.json"

    with open(data_path) as f:
        data = json.load(f)

    assert Competency.objects.all().count() == 0
    assert Skill.objects.all().count() == 0

    populate_db.populate_categories_and_skills(data)

    assert Competency.objects.all().count() == 5
    all_competency_domains = Competency.objects.filter(competency_domain=None)
    all_competencies = Competency.objects.filter(
        competency_domain__in=all_competency_domains
    )
    assert all_competency_domains.count() == 2
    assert all_competencies.count() == 3
    assert (
        Competency.objects.filter(
            competency_domain__name="Competency 1",
            competency_domain__description="Description of Competency 1",
        ).count()
        == 2
    )

    assert Skill.objects.all().count() == 4
    assert Skill.objects.filter(competency__competency_domain=None).count() == 0
    assert (
        Skill.objects.filter(
            competency__name="Competency 1",
            competency__description="Description of Competency 1",
        ).count()
        == 2
    )


@pytest.mark.xfail(
    reason="This functionality will be completely overhauled in the future and is not "
    "worth testing in its current state."
)
@pytest.mark.django_db
def test_populate_competencies_and_skills_invalid_data(caplog) -> None:
    """Test the loop skips invalid competencies and skills and logs a warning."""
    data = {
        "categories": [
            {
                "title": "Competency 1",
                "description": "Description of Competency 1",
                "subcategories": [{"title": "Competency 1", "description": None}],
            },
            {
                "title": "Competency 2",
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
        "Any competencies under Competency 2 skipped!",
    )
    assert caplog.record_tuples[-3] == (
        "django",
        logging.WARNING,
        "Any skills under Competency 1 skipped!",
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


@pytest.mark.xfail(
    reason="This functionality will be completely overhauled in the future and is not "
    "worth testing in its current state."
)
@pytest.mark.django_db
def test_add_object_to_db(caplog) -> None:
    """Test the add_object_to_db function."""
    assert Competency.objects.all().count() == 0

    instance = populate_db.add_object_to_db(
        Competency, slug="cat", name="Test Competency", description="Test Description"
    )

    assert instance.pk is not None  # type: ignore[union-attr]
    assert instance.name == "Test Competency"  # type: ignore[union-attr]
    assert instance.description == "Test Description"  # type: ignore[union-attr]
    assert Competency.objects.all().count() == 1

    # Test adding the same object again
    with caplog.at_level("INFO"):
        instance2 = populate_db.add_object_to_db(
            Competency,
            slug="cat",
            name="Test Competency",
            description="Test Description",
        )
    assert instance2 == instance
    assert caplog.record_tuples[-1] == (
        "django",
        logging.INFO,
        "Competency added to database: Test Competency - "
        "existing object 'Test Competency' overwritten",
    )
    assert Competency.objects.all().count() == 1

    # Test adding an object with invalid fields
    with caplog.at_level("INFO"):
        instance3 = populate_db.add_object_to_db(
            Competency, slug=None, name="Invalid Competency"
        )
    assert instance3 is None
    assert caplog.record_tuples[-1] == (
        "django",
        logging.WARNING,
        "Competency with invalid fields skipped: Invalid Competency "
        "{'description': ['This field cannot be blank.']}",
    )
    assert Competency.objects.all().count() == 1

    # Test changing an object with the same slug
    with caplog.at_level("INFO"):
        instance4 = populate_db.add_object_to_db(
            Competency,
            slug="cat",
            name="Updated Competency",
            description="Updated Description",
        )
    assert instance4.pk == instance.pk  # type: ignore[union-attr]
    assert instance4.name == "Updated Competency"  # type: ignore[union-attr]
    assert instance4.description == "Updated Description"  # type: ignore[union-attr]
    assert caplog.record_tuples[-1] == (
        "django",
        logging.INFO,
        "Competency added to database: Updated Competency - "
        "existing object 'Test Competency' overwritten",
    )
    assert Competency.objects.all().count() == 1  # No new object created

    # Test adding an object with invalid data
    Competency.objects.create(  # type: ignore[misc]
        name="Sub Competency",
        description="Description",
        competency_domain=instance,
    )  # Create a sub-competency to make instance a competency domain
    with caplog.at_level("INFO"):
        instance5 = populate_db.add_object_to_db(
            Skill,
            slug="skill",
            name="Skill",
            description="Description",
            competency=instance,  # Can't have a competency domain as a skill competency
        )
    assert instance5 is None
    assert caplog.record_tuples[-1] == (
        "django",
        logging.WARNING,
        "Skill with invalid data skipped: Skill (Test Competency) "
        "{'competency': ['The competency cannot be a top-level competency.']}",
    )
    assert Skill.objects.all().count() == 0
