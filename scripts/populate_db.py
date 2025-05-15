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
    """Populate the database with categories and skills from a file."""
    from main.models import Category, Skill

    # Loop over categorys and add to db
    for cat_name in data:
        new_parent_cat = data[cat_name]
        # Check if category already exists
        parent_cat = None
        try:
            parent_cat = Category.objects.get(name=cat_name)
        except Category.DoesNotExist:
            parent_cat = Category.objects.create(
                name=cat_name,
                description=cat_name,  # Is description required?
            )
            parent_cat.save()

        # Loop over sub-categorys and add to db
        for sub_cat_name in new_parent_cat:
            new_sub_cat = new_parent_cat[sub_cat_name]
            # Check if sub-category already exists
            sub_cat = None
            try:
                sub_cat = Category.objects.get(name=sub_cat_name)
            except Category.DoesNotExist:
                sub_cat = Category.objects.create(
                    name=sub_cat_name,
                    description=sub_cat_name,
                    parent_category=parent_cat,
                )
                sub_cat.save()

            # Loop over skills and add to db
            for skill_name in new_sub_cat:
                # Check if skill already exists
                skill = None
                try:
                    skill = Skill.objects.get(name=skill_name)
                except Skill.DoesNotExist:
                    new_skill = new_sub_cat[skill_name]
                    skill = Skill.objects.create(
                        name=skill_name,
                        description=new_skill["description"],
                        category=sub_cat,
                    )
                    skill.save()


def main() -> None:
    """Main function to run the script."""
    import json
    import os
    import sys

    import yaml
    from django.core.wsgi import get_wsgi_application

    # Set up Django environment for standalone script
    sys.path.append(os.path.dirname(__file__))
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "rse_competencies_toolkit.settings")
    get_wsgi_application()

    args = read_args()

    # Load famework from file
    skill_data = {}
    if args.yaml_file:
        with open(args.yaml_file) as yaml_file:
            skill_data = yaml.safe_load(yaml_file)
    elif args.json_file:
        with open(args.json_file) as json_file:
            skill_data = json.load(json_file)

    populate_categories_and_skills(skill_data)


if __name__ == "__main__":
    main()
