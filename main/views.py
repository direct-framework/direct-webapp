"""Views for the main app."""

from json import dumps
from math import floor
from random import random

from django.http import HttpRequest, HttpResponse
from django.shortcuts import render


def index(request: HttpRequest) -> HttpResponse:
    """View that renders the index/home page.

    Args:
      request: A GET request.
    """
    return render(request=request, template_name="main/index.html")


def privacy(request: HttpRequest) -> HttpResponse:
    """View that renders the privacy page.

    Args:
      request: A GET request.
    """
    return render(request=request, template_name="main/privacy.html")


def demo(request: HttpRequest) -> HttpResponse:
    """View that renders a demo of the logged in app.

    Args:
      request: A GET request.
    """

    # TODO: Get this from database instead
    def generateRandomData(n: int, categoryCount: int) -> list[dict[str, str | int]]:
        return [
            {
                "skill": f"skill-{i}",
                "category": f"category-{floor(random() * categoryCount)}",
                "lvl": floor(random() * 10),
            }
            for i in range(n)
        ]

    context = {"data": dumps(generateRandomData(20, 5))}
    return render(request=request, template_name="main/demo.html", context=context)
