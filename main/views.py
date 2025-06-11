"""Views for the main app."""

import logging

from django.http import HttpRequest, HttpResponse
from django.shortcuts import render
from django.views.generic.edit import FormView

from .forms import CustomUserCreationForm

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
