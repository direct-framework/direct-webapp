"""Utility module for view tests."""

from abc import ABC
from http import HTTPStatus

import pytest
from bs4 import BeautifulSoup, Tag
from django.conf import settings
from pytest_django.asserts import assertTemplateUsed


class TemplateOkMixin(ABC):
    """Mixin for tests that verify the correct template usage.

    Note: Using this requires the test class to define:
        - A `url` fixture
        - A `_template_name` variable
    """

    _template_name: str

    def test_template_used(self, admin_client, url):
        """Test the correct template is used by the GET request."""
        with assertTemplateUsed(template_name=self._template_name):
            response = admin_client.get(url)
        assert response.status_code == HTTPStatus.OK


class LoginRequiredMixin(ABC):
    """Mixin for tests that require a user to be logged in.

    Note: Using this requires the test class to define:
        - A `url` fixture
    """

    _template_name: str

    def test_login_required(self, client, url):
        """Test for redirect to the login page if the user is not logged in."""
        response = client.get(url)
        assert response.status_code == HTTPStatus.FOUND
        assert response.url == settings.LOGIN_URL + "?next=" + url


class BS4Mixin(ABC):
    """Mixin for tests that use BeautifulSoup4. It makes the `soup` fixture available.

    Note: Using this requires the test class to define:
        - A `url` fixture
    """

    @pytest.fixture
    def soup(self, client, url) -> BeautifulSoup:
        """A fixture of the BeautifulSoup4 object of the requested page."""
        response = client.get(url)
        return BeautifulSoup(response.content, "html.parser")

    @pytest.fixture
    def auth_soup(self, client, user, url) -> BeautifulSoup:
        """A BeautifulSoup4 object of the requested page viewed by a logged-in user."""
        client.force_login(user)
        response = client.get(url)
        return BeautifulSoup(response.content, "html.parser")

    @pytest.fixture
    def admin_soup(self, admin_client, url) -> BeautifulSoup:
        """A BeautifulSoup4 object of the requested page viewed by an admin user."""
        response = admin_client.get(url)
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
