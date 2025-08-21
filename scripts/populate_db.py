"""CLI tool to allow populating the database with Category and Skill data."""

import argparse
import pathlib


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


def populate_categories_and_skills(data: dict) -> None:  # type: ignore[type-arg]
    """Populate the database with categories and skills from a dictionary."""
    from main.models import Category, Skill

    # Loop over categories and add to db
    for category in data["categories"]:
        cat_name = category["title"]
        cat_description = category["description"]

        # Check if category already exists
        parent_cat = None
        try:
            parent_cat = Category.objects.get(name=cat_name)
        except Category.DoesNotExist:
            parent_cat = Category.objects.create(
                name=cat_name,
                description=cat_description,
            )
            parent_cat.save()

        # Loop over sub-categorys and add to db
        for subcategory in category["subcategories"]:
            sub_cat_name = subcategory["title"]
            sub_cat_description = subcategory["description"]

            # Check if sub-category already exists
            sub_cat = None
            try:
                sub_cat = Category.objects.get(name=sub_cat_name)
            except Category.DoesNotExist:
                sub_cat = Category.objects.create(
                    name=sub_cat_name,
                    description=sub_cat_description,
                    parent_category=parent_cat,
                )
                sub_cat.save()

            # Loop over skills and add to db
            for skill in subcategory["skills"]:
                skill_name = skill["title"]
                skill_description = skill["description"]
                # Check if skill already exists
                skill = None
                try:
                    skill = Skill.objects.get(name=skill_name)
                except Skill.DoesNotExist:
                    skill = Skill.objects.create(
                        name=skill_name,
                        description=skill_description,
                        category=sub_cat,
                    )
                    skill.save()


def populate_skill_levels(levels: list[dict]) -> None:  # type: ignore[type-arg]
    """Populate the database with skill levels from a dictionary."""
    from main.models import SkillLevel

    # Loop over skill levels and add to db
    for lvl in levels:
        # Check if skill level already exists
        level = lvl["Level"]
        name = lvl["Name"]
        description = lvl["Description"]
        try:
            skill_level = SkillLevel.objects.get(level=level)
        except SkillLevel.DoesNotExist:
            skill_level = SkillLevel.objects.create(
                level=level,
                name=name,
                description=description,
            )
            skill_level.save()


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
