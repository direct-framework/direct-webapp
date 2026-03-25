"""Utility module for view tests."""

from abc import ABC, abstractmethod
from http import HTTPStatus

import pytest
from bs4 import BeautifulSoup, Tag
from django.conf import settings
from pytest_django.asserts import assertTemplateUsed


class TemplateOkMixin(ABC):
    """Mixin for tests that verify the correct template usage.

    Note: Using this requires the test class to define:
        - A `_get_url` method
        - A `_template_name` variable
    """

    _template_name: str

    def test_template_used(self, admin_client):
        """Test the correct template is used by the GET request."""
        with assertTemplateUsed(template_name=self._template_name):
            response = admin_client.get(self._get_url())
        assert response.status_code == HTTPStatus.OK


class LoginRequiredMixin(ABC):
    """Mixin for tests that require a user to be logged in.

    Note: Using this requires the test class to define:
        - A `_get_url` method
    """

    _template_name: str

    @abstractmethod
    def _get_url(self) -> str:
        return NotImplemented

    def test_login_required(self, client):
        """Test for redirect to the login page if the user is not logged in."""
        response = client.get(self._get_url())
        assert response.status_code == HTTPStatus.FOUND
        assert response.url == settings.LOGIN_URL + "?next=" + self._get_url()


class BS4Mixin(ABC):
    """Mixin for tests that use BeautifulSoup4. It makes the `soup` fixture available.

    Note: Using this requires the test class to define:
        - A `_get_url` method
    """

    @abstractmethod
    def _get_url(self) -> str:
        return NotImplemented

    @pytest.fixture
    def soup(self, client) -> BeautifulSoup:
        """A fixture of the BeautifulSoup4 object of the requested page."""
        response = client.get(self._get_url())
        return BeautifulSoup(response.content, "html.parser")

    @pytest.fixture
    def auth_soup(self, client, user) -> BeautifulSoup:
        """A BeautifulSoup4 object of the requested page viewed by a logged-in user."""
        client.force_login(user)
        response = client.get(self._get_url())
        return BeautifulSoup(response.content, "html.parser")

    @pytest.fixture
    def admin_soup(self, admin_client) -> BeautifulSoup:
        """A BeautifulSoup4 object of the requested page viewed by an admin user."""
        response = admin_client.get(self._get_url())
        return BeautifulSoup(response.content, "html.parser")


def tag_with_text_filter(tag_name: str, text: str):
    """Return a filter function for BeautifulSoup to match a tag containing text.

    Example:
        To find a level one heading with the text "Heading Title", run
        soup.find(tag_with_text_filter("h1", "Heading Title"))
    """

    def _match(tag: Tag) -> bool:
        return tag.name == tag_name and text in tag.text

    return _match
