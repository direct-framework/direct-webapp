"""Behaviour tests for the My Teams account page."""

from http import HTTPStatus

import pytest
from bs4 import BeautifulSoup
from django.urls import reverse

from main.models import Skill, Team, TeamMembership, UserSkill

from .view_utils import LoginRequiredMixin, tag_with_text_filter

pytestmark = pytest.mark.django_db


class TestMyTeamsSignIn(LoginRequiredMixin):
    """Require sign-in before showing the My Teams page."""

    def _get_url(self, **kwargs):
        return reverse("my_teams")


def test_account_dropdown_links_to_my_teams(client_logged_in):
    """Provide a direct My Teams link without changing the Overview link."""
    response = client_logged_in.get(reverse("index"))
    soup = BeautifulSoup(response.content, "html.parser")
    navbar = soup.find("header", class_="navbar")
    account_dropdown = navbar.find(
        tag_with_text_filter("div", "Hello,"), class_="dropdown"
    )

    assert account_dropdown.find(
        "a", attrs={"aria-label": "Account menu", "data-bs-toggle": "dropdown"}
    )
    teams_link = account_dropdown.find(tag_with_text_filter("a", "My Teams"))
    assert teams_link is not None
    assert teams_link["href"] == reverse("my_teams")
    assert all(icon.get("aria-hidden") == "true" for icon in teams_link.find_all("i"))
    assert account_dropdown.find(
        tag_with_text_filter("a", "Overview"), href=reverse("account-overview")
    )

    teams_response = client_logged_in.get(teams_link["href"])
    assert teams_response.status_code == HTTPStatus.OK
    assert BeautifulSoup(teams_response.content, "html.parser").find(
        "h1", string="My Teams"
    )


def test_theme_switch_has_an_accessible_name(client_logged_in):
    """Keep the theme switch identifiable when the mobile header is compact."""
    response = client_logged_in.get(reverse("index"))
    soup = BeautifulSoup(response.content, "html.parser")
    theme_switch = soup.find("input", id="theme-mode")

    assert theme_switch["aria-label"] == "Toggle colour theme"


@pytest.mark.parametrize(
    "page", ["profile", "my_teams", "self_assess", "skills_profile"]
)
def test_account_sidebars_link_to_my_teams(client_logged_in, page):
    """Keep My Teams available from each account menu, including on small screens."""
    response = client_logged_in.get(reverse(page))

    assert response.status_code == HTTPStatus.OK
    soup = BeautifulSoup(response.content, "html.parser")
    account_menu = soup.find("div", id="sidebarAccount")
    teams_link = account_menu.find(tag_with_text_filter("a", "My Teams"))
    assert teams_link is not None
    assert teams_link["href"] == reverse("my_teams")
    if page == "my_teams":
        assert teams_link.get("aria-current") == "page"


def test_overview_still_routes_by_skills_when_users_have_a_team(
    client, user_skill, django_user_model
):
    """Keep the existing Overview destinations for users with team memberships."""
    team = Team.objects.create(name="Shared team", description="A shared team.")
    user_without_skills = django_user_model.objects.create_user(
        username="user_without_skills", agreed_to_tos=True
    )
    TeamMembership.objects.create(user=user_skill.user, team=team)
    TeamMembership.objects.create(user=user_without_skills, team=team)

    client.force_login(user_without_skills)
    response = client.get(reverse("account-overview"))
    assert response.status_code == HTTPStatus.FOUND
    assert response.url == reverse("self_assess")

    client.force_login(user_skill.user)
    response = client.get(reverse("account-overview"))
    assert response.status_code == HTTPStatus.FOUND
    assert response.url == reverse("skills_profile")


def test_user_sees_all_and_only_their_teams(client_logged_in, user, django_user_model):
    """Show the user's team names and descriptions without other teams."""
    first_team = Team.objects.create(
        name="Imaging team", description="We analyse imaging data."
    )
    second_team = Team.objects.create(
        name="Research software team", description="We develop research software."
    )
    other_team = Team.objects.create(
        name="Astronomy team", description="We study distant galaxies."
    )
    other_user = django_user_model.objects.create_user(username="anotheruser")
    TeamMembership.objects.create(user=user, team=first_team)
    TeamMembership.objects.create(user=user, team=second_team)
    TeamMembership.objects.create(user=other_user, team=other_team)

    response = client_logged_in.get(reverse("my_teams"))

    assert response.status_code == HTTPStatus.OK
    soup = BeautifulSoup(response.content, "html.parser")
    for name, description in [
        ("Imaging team", "We analyse imaging data."),
        ("Research software team", "We develop research software."),
    ]:
        heading = soup.find("h2", string=name)
        assert heading is not None
        assert description in heading.find_parent("article").get_text(" ", strip=True)
    page_text = soup.get_text(" ", strip=True)
    assert "Astronomy team" not in page_text
    assert "We study distant galaxies." not in page_text


def test_manager_status_is_specific_to_each_membership(
    client_logged_in, user, django_user_model
):
    """Show the manager label only for teams the current user manages."""
    managed_team = Team.objects.create(
        name="Managed team", description="The user manages this team."
    )
    member_team = Team.objects.create(
        name="Member team", description="The user belongs to this team."
    )
    other_user = django_user_model.objects.create_user(username="anotheruser")
    TeamMembership.objects.create(user=user, team=managed_team, manager=True)
    TeamMembership.objects.create(user=user, team=member_team)
    TeamMembership.objects.create(user=other_user, team=member_team, manager=True)

    response = client_logged_in.get(reverse("my_teams"))

    soup = BeautifulSoup(response.content, "html.parser")
    managed_card = soup.find("h2", string="Managed team").find_parent("article")
    member_card = soup.find("h2", string="Member team").find_parent("article")
    assert "Manager" in managed_card.get_text(" ", strip=True)
    assert "Manager" not in member_card.get_text(" ", strip=True)


def test_user_without_memberships_sees_empty_state(client_logged_in, django_user_model):
    """Keep the page available and explain when the user has no teams."""
    other_user = django_user_model.objects.create_user(username="anotheruser")
    other_team = Team.objects.create(
        name="Astronomy team", description="We study distant galaxies."
    )
    TeamMembership.objects.create(user=other_user, team=other_team)

    response = client_logged_in.get(reverse("my_teams"))

    assert response.status_code == HTTPStatus.OK
    page_text = BeautifulSoup(response.content, "html.parser").get_text(" ", strip=True)
    assert "You are not a member of any teams yet." in page_text
    assert "Astronomy team" not in page_text


@pytest.mark.parametrize("manager", [False, True])
def test_shared_team_does_not_show_other_members_or_assessments(
    client_logged_in, user, django_user_model, competency, skill_level, manager
):
    """Keep other members and their assessments private, including from managers."""
    team = Team.objects.create(name="Shared team", description="A shared team.")
    other_user = django_user_model.objects.create_user(
        username="privatecolleague",
        first_name="Private",
        last_name="Colleague",
        email="private.colleague@example.com",
    )
    skill = Skill.objects.create(
        name="Confidential calibration skill",
        description="A skill belonging to another user's assessment.",
        competency=competency,
        rank=1,
    )
    TeamMembership.objects.create(user=user, team=team, manager=manager)
    TeamMembership.objects.create(user=other_user, team=team)
    UserSkill.objects.create(user=other_user, skill=skill, skill_level=skill_level)

    response = client_logged_in.get(reverse("my_teams"))

    assert response.status_code == HTTPStatus.OK
    soup = BeautifulSoup(response.content, "html.parser")
    assert len(soup.find_all("h2", string="Shared team")) == 1
    page_html = response.content.decode()
    assert "privatecolleague" not in page_html
    assert "Private Colleague" not in page_html
    assert "private.colleague@example.com" not in page_html
    assert "Confidential calibration skill" not in page_html
    assert skill_level.name not in page_html
