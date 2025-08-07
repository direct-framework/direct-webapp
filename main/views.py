"""Views for the main app."""

import logging
from typing import TYPE_CHECKING

from django.contrib.auth import get_user_model
from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import HttpRequest, HttpResponse
from django.shortcuts import render
from django.urls import reverse
from django.views.generic.base import TemplateView
from django.views.generic.edit import UpdateView

logger = logging.getLogger(__name__)

if TYPE_CHECKING:  # pragma: no cover
    from .models import User as UserType

User = get_user_model()


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


class UserUpdateView(LoginRequiredMixin, UpdateView):  # type: ignore
    """View that renders the user update form page."""

    model = User
    fields = ["username", "email"]  # noqa
    template_name_suffix = "_update_form"

    def get_object(self, queryset=None) -> "UserType":  # type: ignore
        """Remove the need for url args by returning the current user."""
        return self.request.user  # type: ignore

    def get_success_url(self) -> str:
        """Ensure submitting the form redirects to the same page."""
        return reverse("profile")


class AboutPageView(TemplateView):
    """View that renders the about page."""

    template_name = "main/about.html"
