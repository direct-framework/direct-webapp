"""Pytest configuration file."""

import pytest


@pytest.fixture
def user(django_user_model):
    """Provides a Django user with predefined attributes."""
    return django_user_model.objects.create_user(
        first_name="test",
        last_name="user",
        email="test.user@mail.com",
        password="1234",
        username="testuser",
        agreed_to_tos=True,
    )


@pytest.fixture
def admin_user(admin_user):
    """Override admin_user fixture to keep admin-client access to gated pages."""
    admin_user.agreed_to_tos = True
    admin_user.save()
    return admin_user
