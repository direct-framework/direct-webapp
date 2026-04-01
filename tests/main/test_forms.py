"""Tests for form behavior in the main app."""

from __future__ import annotations

import pytest
from django.contrib.auth import get_user_model
from django.urls import reverse

from main.forms import RegistrationForm


@pytest.fixture
def valid_registration_data() -> dict[str, str | bool]:
    """Return a minimal valid payload for RegistrationForm."""
    return {
        "username": "newuser",
        "email": "new.user@example.com",
        "password1": "l0ng-Enough-wItH-characters",
        "password2": "l0ng-Enough-wItH-characters",
        "tos": True,
    }


def test_registration_form_tos_label_includes_terms_and_privacy_links() -> None:
    """The tos label should include links to terms and privacy pages."""
    form = RegistrationForm()

    label = str(form.fields["tos"].label)
    assert reverse("terms") in label
    assert reverse("privacy") in label


@pytest.mark.django_db
def test_registration_form_requires_tos_acceptance(
    valid_registration_data: dict[str, str | bool],
) -> None:
    """Submitting without accepting terms should add a tos error."""
    data = valid_registration_data.copy()
    data["tos"] = False

    form = RegistrationForm(data=data)

    assert not form.is_valid()
    assert "tos" in form.errors


@pytest.mark.django_db
def test_registration_form_sets_date_agreed_on_valid_submission(
    valid_registration_data: dict[str, str | bool],
) -> None:
    """A valid submission should set the date_agreed field."""
    form = RegistrationForm(data=valid_registration_data)

    assert form.is_valid()
    assert not form.errors

    user = form.save()
    assert user.date_agreed is not None


@pytest.mark.django_db
def test_registration_form_creates_new_user_on_success(
    valid_registration_data: dict[str, str | bool],
) -> None:
    """A valid submission should create a new user in the database."""
    user_model = get_user_model()
    assert not user_model.objects.filter(
        email=valid_registration_data["email"]
    ).exists()

    form = RegistrationForm(data=valid_registration_data)

    assert form.is_valid()
    assert not form.errors
    created_user = form.save()
    assert user_model.objects.filter(pk=created_user.pk).exists()


@pytest.mark.django_db
def test_registration_form_rejects_duplicate_email(
    user, valid_registration_data: dict[str, str | bool]
) -> None:
    """Submitting an email that already exists should return an email error."""
    data = valid_registration_data.copy()
    data["email"] = user.email

    form = RegistrationForm(data=data)

    assert not form.is_valid()
    assert "email" in form.errors
