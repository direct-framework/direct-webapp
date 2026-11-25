"""Scan the application's HTML pages with Playwright and axe-core."""

from json import dumps
from pprint import pformat
from urllib.parse import urlencode

import pytest
from django.conf import settings
from django.core.management import call_command
from django.test import Client
from django.urls import reverse
from playwright.sync_api import Page, expect
from pytest_playwright_axe import Axe

from main.models import Event, Provider, Skill, SkillLevel, SkillProfile
from main.team_services import create_team, generate_invitation_token

pytestmark = pytest.mark.django_db(transaction=True)


class AccessibilityViolation(AssertionError):
    """Distinguish axe violations from navigation, setup, and scanner errors."""


known_violations = pytest.mark.xfail(
    reason="Known axe violations see report",
    raises=AccessibilityViolation,
    strict=True,
)


@pytest.fixture
def login(live_server, context):
    """Log a user into the browser using a server-side Django session."""

    def _login(user):
        client = Client()
        client.force_login(user)
        context.add_cookies(
            [
                {
                    "name": settings.SESSION_COOKIE_NAME,
                    "value": client.cookies[settings.SESSION_COOKIE_NAME].value,
                    "url": live_server.url,
                }
            ]
        )

    return _login


@pytest.fixture(autouse=True)
def accessibility_data(mocker):
    """Populate framework content and isolate remote policy Markdown requests."""
    call_command(
        "loaddata",
        settings.BASE_DIR / "direct_webapp/fixtures/framework-2-0.json",
        verbosity=0,
    )
    Event.objects.create(
        title="Framework workshop",
        start_date="2026-04-01",
        description="A workshop about the framework.",
        location="Manchester",
        event_link="https://example.com/event",
        blog="https://example.com/blog",
        contributors="Test Contributor",
    )
    for view in ("GovernancePageView", "LicensingPageView"):
        mocker.patch(
            f"main.views.page_views.{view}.get_markdown_content",
            return_value="<h2>Policy details</h2><p>Example policy content.</p>",
        )


def check_accessibility(page: Page, url: str, filename: str) -> None:
    """Check the intended, fully loaded page and report any axe violations."""
    response = page.goto(url)
    assert response is not None and response.status == 200
    expect(page).to_have_url(url)
    expect(page.locator(".page-loading")).not_to_be_visible()
    assert page.evaluate(
        """() => [...document.styleSheets].some(
            sheet => sheet.href?.endsWith('/assets/css/theme.min.css')
                && sheet.cssRules.length > 0
        )"""
    ), "The theme stylesheet must load before scanning."
    violations = Axe().run(
        page,
        filename=filename,
        report_on_violation_only=True,
        json_report_generated=False,
    )["violations"]
    if violations:
        raise AccessibilityViolation(
            f"Accessibility violations on {url}:\n{pformat(violations)}"
        )


@known_violations
@pytest.mark.parametrize(
    "page_url",
    [
        "index",
        "about",
        "framework",
        "framework_overview",
        "skills_and_competencies",
        "skill_levels",
        "learning_providers",
        "learning_resources",
        "tools_languages_methodologies",
        "roles",
        "privacy",
        "terms",
        "governance",
        "licensing",
        "our_team",
        "get_involved",
        "events",
        "django_registration_register",
        "login",
        "password_reset",
    ],
)
def test_public_pages(live_server, page: Page, page_url):
    """Scan public pages, including the custom registration form."""
    check_accessibility(page, live_server.url + reverse(page_url), page_url)


@known_violations
@pytest.mark.parametrize(
    "page_url",
    ["self_assess", "skills_profile", "profile", "terms_acceptance", "my_teams"],
)
def test_account_pages(live_server, page: Page, login, user, page_url):
    """Scan account forms, a populated skill profile, and team memberships."""
    SkillProfile.objects.create(
        profile=user.profile,
        skill=Skill.objects.order_by("pk")[0],
        skill_level=SkillLevel.objects.get(level=1),
    )
    create_team(user=user, name="Research team", description="A research team")
    login(user)
    check_accessibility(page, live_server.url + reverse(page_url), page_url)


@known_violations
@pytest.mark.parametrize(
    ("page_url", "model"),
    [("skill_detail", Skill), ("learning_provider_detail", Provider)],
)
def test_detail_pages(live_server, page: Page, page_url, model):
    """Scan populated skill and provider detail pages."""
    url = reverse(page_url, kwargs={"slug": model.objects.order_by("pk")[0].slug})
    check_accessibility(page, live_server.url + url, page_url)


@known_violations
def test_shared_skill_profile(live_server, page: Page):
    """Scan a shared competency wheel with representative profile data."""
    skill = Skill.objects.select_related("competency__competency_domain").first()
    assert skill is not None
    query = urlencode(
        {
            "chart_data": dumps(
                [
                    {
                        "user_id": "root",
                        "skill_profile_data": [
                            {
                                "skill": skill.name,
                                "category": skill.competency.competency_domain.name,
                                "subcategory": skill.competency.name,
                                "skill_level": 1,
                            }
                        ],
                    }
                ]
            ),
            "skill_levels": dumps(list(SkillLevel.objects.values("level", "name"))),
        }
    )
    url = live_server.url + reverse("view_skill_profile") + "?" + query
    check_accessibility(page, url, "view_skill_profile")


@known_violations
@pytest.mark.parametrize("page_url", ["team-invitation-link", "team-invitation-accept"])
def test_team_invitation_pages(
    live_server, page: Page, login, user, admin_user, page_url
):
    """Scan manager link generation and a non-member's invitation form."""
    team = create_team(
        user=admin_user, name="Research team", description="A research team"
    )
    kwargs = {"team_slug": team.slug}
    if page_url == "team-invitation-accept":
        kwargs["token"] = generate_invitation_token(team=team, invited_by=admin_user)
        login(user)
    else:
        login(admin_user)
    check_accessibility(
        page, live_server.url + reverse(page_url, kwargs=kwargs), page_url
    )
