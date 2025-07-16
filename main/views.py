"""Views for the main app."""

import logging
from json import dumps

from django.http import HttpRequest, HttpResponse
from django.shortcuts import render
from django.views.generic.edit import FormView

from .forms import CustomUserCreationForm
from .models import UserSkill

logger = logging.getLogger("main")


def index(request: HttpRequest) -> HttpResponse:
    """View that renders the index/home page.

    Args:
      request: A GET request.
    """
    logger.info("Rendering index page.")
    return render(request=request, template_name="main/index.html")


def privacy(request: HttpRequest) -> HttpResponse:
    """View that renders the privacy page.

    Args:
      request: A GET request.
    """
    logger.info("Rendering privacy page.")
    return render(request=request, template_name="main/privacy.html")


def skill_profile(request: HttpRequest) -> HttpResponse:
    """View that renders the skill profile page.

    Args:
      request: A GET request.
    """
    logger.info("Rendering skill_profile page.")
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

    return render(
        request=request, template_name="app/skill_profile.html", context=context
    )


class CreateUserView(FormView[CustomUserCreationForm]):
    """View that renders the user creation form page."""

    template_name = "registration/create_user.html"
    form_class = CustomUserCreationForm
    success_url = "/accounts/login"

    def form_valid(self, form: CustomUserCreationForm) -> HttpResponse:
        """Method called when valid form data has been POSTed."""
        if form.is_valid():
            form.save()
        return super().form_valid(form)
