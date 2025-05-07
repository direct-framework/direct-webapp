"""Views for the main app."""

from json import dumps

from django.http import HttpRequest, HttpResponse
from django.shortcuts import render

from .models import UserSkill


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
    # TODO: Filter by user
    userskills = UserSkill.objects.all()
    userSkillData = [
        {
            "skill": userSkill.skill.name,
            "category": userSkill.skill.category.name,
            "skill_level": userSkill.skill_level.name,
        }
        for userSkill in userskills
    ]
    # TODO: Do we show skills with 0 level?
    # NOTE: skills do not need to be in any order.
    context = {"data": dumps(userSkillData)}
    return render(request=request, template_name="main/demo.html", context=context)
