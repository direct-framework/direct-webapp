"""Test suite for domain driven testing.

This file contains tests for testing the user experience and requirements based
on user stories.

"""

import re
from http import HTTPStatus

import pytest
from bs4 import BeautifulSoup
from django.urls import reverse

# == Utils ==


def go_to_homepage(client):
    """Helper function to navigate to the homepage."""
    url = reverse("index")
    response = client.get(url)
    assert response.status_code == HTTPStatus.OK
    return response


def go_to_registration_page(client):
    """Helper function to navigate to the registration page."""
    response = go_to_homepage(client)
    soup = BeautifulSoup(response.content, "lxml")
    register_link = soup.find("a", text="Register")
    assert register_link is not None
    register_url = register_link["href"]
    register_response = client.get(register_url)
    assert register_response.status_code == HTTPStatus.OK
    return register_response


def go_to_self_assessment_page(client):
    """Helper function to navigate to the self assessment page."""
    response = client.get(reverse("self_assess"))
    assert response.status_code == HTTPStatus.OK
    return response


def find_stripped_text(doc, tag, text):
    """Helper function to find the stripped text of a tag."""
    return next(
        a
        for a in doc.find_all(tag)
        if re.search(rf"{text}", a.get_text(" ", strip=True))
    )


def modify_skill_level(soup, skill_name, new_level):
    """Helper function to modify the skill level in the self assessment form."""
    # TODO: Ideally we would search by label rather than input name, but the form is
    # currently structured in a way that makes this difficult.
    # We should consider restructuring the form to make it easier to test and modify.
    skill_input = soup.find("input", {"name": f"skill_{skill_name}"})
    assert skill_input is not None
    skill_input["value"] = str(new_level)
    return soup


# == Tests ==


class TestNewUser:
    """Test suite for a new user visiting the homepage."""

    def test_should_see_welcome_message(self, admin_client):
        """Test that a new user sees a welcome message on the homepage."""
        response = go_to_homepage(admin_client)
        soup = BeautifulSoup(response.content, "lxml")
        assert soup.find("h1").text == "Digital Research Competencies Framework"

    @pytest.mark.skip(
        reason="admin is already logged in, need to use a different client fixture"
    )
    def test_should_be_able_to_register_account(self, admin_client):
        """Test that a new user can navigate to the registration page."""
        response = go_to_registration_page(admin_client)
        soup = BeautifulSoup(response.content, "lxml")
        assert soup.find("h2").text == "Register"


class TestRSEUser:
    """Test suite for an RSE user stories."""

    # TODO: We should have a RSE client fixture.

    def test_should_see_welcome_message(self, admin_client):
        """Test that an existing user sees a welcome message on the homepage."""
        response = go_to_homepage(admin_client)
        soup = BeautifulSoup(response.content, "lxml")
        assert soup.find("h1").text == "Digital Research Competencies Framework"

    def test_should_be_directed_towards_the_self_assessment_questionnaire(
        self, admin_client
    ):
        """Test user is directed towards the self assessment questionnaire."""
        response = go_to_homepage(admin_client)
        soup = BeautifulSoup(response.content, "lxml")
        self_assess_link = find_stripped_text(soup.find("nav"), "a", "Start Using")
        self_assess_response = admin_client.get(self_assess_link["href"])
        assert self_assess_response.status_code == HTTPStatus.OK
        soup_self_assess = BeautifulSoup(self_assess_response.content, "lxml")
        assert soup_self_assess.find("h1").text == "Self Assessment Questionnaire"

    def test_should_be_able_to_navigate_directly_to_self_assessment_questionnaire(
        self, admin_client
    ):
        """Test user can navigate directly to the self assessment questionnaire."""
        response = go_to_self_assessment_page(admin_client)
        soup = BeautifulSoup(response.content, "lxml")
        assert soup.find("h1").text == "Self Assessment Questionnaire"

    @pytest.mark.skip(
        reason="May need to add skills to db first and mock the form submission."
    )
    def test_should_be_able_to_complete_the_self_assessment_questionnaire(
        self, admin_client
    ):
        """Test user can complete the self assessment questionnaire."""
        response = go_to_self_assessment_page(admin_client)
        soup = BeautifulSoup(response.content, "lxml")
        modify_skill_level(soup, "test_skill_1", 3)
        modify_skill_level(soup, "test_skill_2", 4)
        save_button = soup.find("button", {"type": "submit"})
        assert save_button is not None
        # TODO: Assert that the button saves the form correctly.
        save_response = admin_client.post(
            save_button["formaction"], data=soup.find("form").encode_contents()
        )
        assert save_response.status_code == HTTPStatus.FOUND
        assert save_response.url == reverse("account-overview")
