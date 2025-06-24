"""Views for the main app."""

import logging

from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.http import HttpRequest, HttpResponse
from django.shortcuts import redirect, render
from django.views.generic.edit import FormView

from .forms import CustomUpdateUserForm, CustomUserCreationForm

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


@login_required
def profile(request: HttpRequest) -> HttpResponse:
    """View that renders the profile page."""
    if request.method == "POST":
        user_form = CustomUpdateUserForm(request.POST, instance=request.user)

        if user_form.is_valid():
            user_form.save()
            messages.success(request, "Your profile is updated successfully")
            return redirect(to="users-profile")
    else:
        user_form = CustomUpdateUserForm(instance=request.user)

    return render(
        request,
        "users/profile.html",
        {"user_form": user_form},
    )
