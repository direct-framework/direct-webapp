"""CLI tool to allow populating the database with Category and Skill data."""

import argparse
import logging
import pathlib
from contextlib import suppress
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


def add_object_to_db(
    model: type[models.Model], slug: str | None, **kwargs: Any
) -> models.Model | None:
    """Add an object to the database if it is valid.

    If the object already exists with the same name or slug it will be overwritten! This
    is done in a way that preserves the existing primary key and therefore any
    relationships to the object.

    If the object is invalid it will be skipped and a message will be logged.

    Args:
        model: The model class to add the object to.
        slug: The slug to use for the object, or None to auto-generate from name.
        **kwargs: The fields to set on the model instance.
    """
    instance = model(**kwargs)
    try:
        instance.clean_fields()
    except ValidationError as e:
        logger.warning(
            f"{model.__name__} with invalid fields skipped: {instance} {e.message_dict}"
        )
        return None

    success_message = f"{model.__name__} added to database: {instance}"

    with suppress(model.DoesNotExist):  # type: ignore[attr-defined]
        if slug:
            instance.slug = slug  # type: ignore[attr-defined]
            existing = model.objects.get(slug=slug)  # type: ignore[attr-defined]
        else:
            existing = model.objects.get(name=kwargs["name"])  # type: ignore[attr-defined]
        instance.pk = existing.pk
        success_message += f" - existing object '{existing}' overwritten"

    try:
        instance.full_clean(validate_unique=False)
    except ValidationError as e:
        logger.warning(
            f"{model.__name__} with invalid data skipped: {instance} {e.message_dict}"
        )
        return None

    instance.save()
    logger.info(success_message)
    return instance


def populate_categories_and_skills(data: dict) -> None:  # type: ignore[type-arg]
    """Populate the database with categories and skills from a dictionary."""
    from main.models import Category, Skill

    # Loop over categories and add to db
    for category in data["categories"]:
        parent_cat = add_object_to_db(
            Category,
            slug=category.get("slug"),
            name=category["title"],
            description=category["description"],
        )
        if parent_cat is None:
            logger.warning(f"Any subcategories under {category['title']} skipped!")
            continue

        # Loop over sub-categories and add to db
        for subcategory in category["subcategories"]:
            sub_cat = add_object_to_db(
                Category,
                slug=subcategory.get("slug"),
                name=subcategory["title"],
                description=subcategory["description"],
                parent_category=parent_cat,
            )
            if sub_cat is None:
                logger.warning(f"Any skills under {subcategory['title']} skipped!")
                continue

            # Loop over skills and add to db
            for skill in subcategory["skills"]:
                add_object_to_db(
                    Skill,
                    slug=skill.get("slug"),
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
            slug=None,
            level=lvl["level"],
            name=lvl["name"],
            description=lvl["description"],
            short_description=lvl["short_description"],
            focus=lvl["focus"],
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
