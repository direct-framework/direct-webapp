"""Utility function to generate random user skill data."""

from math import floor
from random import random


def generateRandomData(n: int, categoryCount: int) -> list[dict[str, str | int]]:
    """Generate random user skill data.

    Args:
        n: The number of skills to generate.
        categoryCount: The number of categories to use.

    Returns:
        A list of dictionaries containing the skill data.
    """
    return [
        {
            "skill": f"skill-{i}",
            "category": f"category-{floor(random() * categoryCount)}",
            "skill_level": floor(random() * 10),
        }
        for i in range(n)
    ]
