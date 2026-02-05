"""CLI tool to allow populating the database with Category and Skill data."""

import argparse
import logging
import pathlib
from typing import Any

from django.core.exceptions import ValidationError
from django.db import models

logger = logging.getLogger("django")


def read_args() -> argparse.Namespace:  # pragma: no cover
    """Read args from the command line."""
    return get_parser().parse_args()


def get_parser() -> argparse.ArgumentParser:
    """Get an instance of our custom command line argument parser."""
    parser = argparse.ArgumentParser(
        description="Populate the database with Category and Skill data."
    )

    file_group = parser.add_mutually_exclusive_group(required=True)
    file_group.add_argument(
        "-y",
        "--yaml-file",
        type=pathlib.Path,
        required=False,
        help="Path to a yaml file containing the data to be loaded.",
    )
    file_group.add_argument(
        "-j",
        "--json-file",
        type=pathlib.Path,
        required=False,
        help="Path to a yaml file containing the data to be loaded.",
    )

    return parser


def add_object_to_db(model: type[models.Model], **kwargs: Any) -> models.Model | None:
    """Add an object to the database if it does not already exist and is valid.

    Args:
        model: The model class to add the object to.
        **kwargs: The fields to set on the model instance.
    """
    instance = model(**kwargs)
    try:
        instance.clean_fields()
    except ValidationError as e:
        logger.info(f"{model.__name__} with invalid fields skipped: {e.message_dict}")
        return None

    try:
        existing = model.objects.get(**kwargs)  # type: ignore[attr-defined]
        logger.info(f"{model.__name__} already exists, skipping: {instance}")
        return existing
    except model.DoesNotExist:  # type: ignore[attr-defined]
        try:
            instance.full_clean()
        except ValidationError as e:
            logger.info(f"{model.__name__} with invalid data skipped: {e.message_dict}")
            return None

        instance.save()
        return instance


def populate_categories_and_skills(data: dict) -> None:  # type: ignore[type-arg]
    """Populate the database with categories and skills from a dictionary."""
    from main.models import Category, Skill

    # Loop over categories and add to db
    for category in data["categories"]:
        parent_cat = add_object_to_db(
            Category, name=category["title"], description=category["description"]
        )
        if parent_cat is None:
            continue

        # Loop over sub-categories and add to db
        for subcategory in category["subcategories"]:
            sub_cat = add_object_to_db(
                Category,
                name=subcategory["title"],
                description=subcategory["description"],
                parent_category=parent_cat,
            )
            if sub_cat is None:
                continue

            # Loop over skills and add to db
            for skill in subcategory["skills"]:
                add_object_to_db(
                    Skill,
                    name=skill["title"],
                    description=skill["description"],
                    category=sub_cat,
                )


def populate_skill_levels(levels: list[dict]) -> None:  # type: ignore[type-arg]
    """Populate the database with skill levels from a dictionary."""
    from main.models import SkillLevel

    # Loop over skill levels and add to db
    for lvl in levels:
        add_object_to_db(
            SkillLevel,
            level=lvl["Level"],
            name=lvl["Name"],
            description=lvl["Description"],
        )


def main() -> None:
    """Main function to run the script."""
    import json
    import os
    import sys

    from django.core.wsgi import get_wsgi_application

    # Set up Django environment for standalone script
    sys.path.append(os.path.dirname(__file__))
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "direct_webapp.settings")
    get_wsgi_application()

    args = read_args()

    # Load famework from file
    skill_data = {}
    if args.yaml_file:
        import yaml

        with open(args.yaml_file) as yaml_file:
            skill_data = yaml.safe_load(yaml_file)
    elif args.json_file:
        with open(args.json_file) as json_file:
            skill_data = json.load(json_file)

    populate_categories_and_skills(skill_data)

    # Load skill levels from file
    levels = []
    with open("data/levels.json") as json_file:
        levels = json.load(json_file)

    populate_skill_levels(levels)


if __name__ == "__main__":
    main()
