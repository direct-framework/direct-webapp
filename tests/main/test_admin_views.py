"""Test suite for the main app admin views."""

from http import HTTPStatus
from typing import Any, ClassVar

import pytest
from django.contrib.auth import get_user_model
from django.db.models import Model

from main.admin import UserProxy
from main.models import (
    Category,
    LearningResource,
    Provider,
    Skill,
    SkillLevel,
    Tool,
)


class AdminMixin:
    """Mixin for testing models that have a visible admin view.

    Note: Using this requires the test class to define:
        - A `_model` variable that is the model being tested
        - A `_data` dict  with the kwargs needed to create an instance of the model
    """

    _model: type[Model]
    _data: ClassVar[dict[str, Any]] = {}

    def test_list_view(self, admin_client):
        """Test the list view of the admin model."""
        response = admin_client.get(f"/admin/main/{self._model._meta.model_name}/")
        assert response.status_code == HTTPStatus.OK

    def test_add_get(self, admin_client):
        """Test the GET request is successful."""
        response = admin_client.get(f"/admin/main/{self._model._meta.model_name}/add/")
        assert response.status_code == HTTPStatus.OK

    def _create_object(self):
        """Create the object being changed."""
        return self._model.objects.create(**self._data)

    @pytest.mark.django_db
    def test_change_get(self, admin_client):
        """Test the GET request to the change view is successful."""
        obj = self._create_object()
        response = admin_client.get(
            f"/admin/main/{self._model._meta.model_name}/{obj.pk}/change/"
        )
        assert response.status_code == HTTPStatus.OK


class TestUserAdmin(AdminMixin):
    """Test suite for the User admin views."""

    _model = get_user_model()
    _data: ClassVar[dict[str, Any]] = {
        "username": "TestUser",
        "password": "testpassword",
    }


class TestCategoryAdmin(AdminMixin):
    """Test suite for the Category admin views."""

    _model = Category
    _data: ClassVar[dict[str, Any]] = {
        "name": "Test Category",
        "description": "Test Description",
    }


class TestProviderAdmin(AdminMixin):
    """Test suite for the Provider admin views."""

    _model = Provider
    _data: ClassVar[dict[str, Any]] = {
        "name": "Test Provider",
        "description": "Test Description",
        "url": "https://example.com",
        "ror": "https://ror.org/12345",
    }


class TestLearningResourceAdmin(AdminMixin):
    """Test suite for the LearningResource admin views."""

    _model = LearningResource
    _data: ClassVar[dict[str, Any]] = {
        "name": "Test LearningResource",
        "description": "Test Description",
        "language": "en",
        "url": "https://example.com/resource",
        "provider": None,
    }


class TestToolAdmin(AdminMixin):
    """Test suite for the Tool admin views."""

    _model = Tool
    _data: ClassVar[dict[str, Any]] = {
        "name": "Test Tool",
        "description": "Test Description",
    }


class TestSkillAdmin(AdminMixin):
    """Test suite for the Skill admin views."""

    _model = Skill
    _data: ClassVar[dict[str, Any]] = {
        "name": "Test Skill",
        "description": "Test Description",
    }

    def _create_object(self):
        """Overwrite to also create the Category for the Skill being changed."""
        category = Category.objects.create(name="Test Category", description="Test")
        return Skill.objects.create(category=category, **self._data)


class TestSkillLevelAdmin(AdminMixin):
    """Test suite for the SkillLevel admin views."""

    _model = SkillLevel
    _data: ClassVar[dict[str, Any]] = {
        "name": "Test SkillLevel",
        "description": "Test Description",
        "level": 1,
    }


class TestCustomUserSkillAdmin(AdminMixin):
    """Test suite for the CustomUserSkill admin views.

    This Model should not have an add view.
    """

    _model = UserProxy
    _data: ClassVar[dict[str, Any]] = {
        "username": "TestUser",
        "password": "testpassword",
    }

    def test_add_get(self, admin_client):
        """Overwrite to test the GET request to add an object is forbidden."""
        response = admin_client.get(f"/admin/main/{self._model._meta.model_name}/add/")
        assert response.status_code == HTTPStatus.FORBIDDEN
