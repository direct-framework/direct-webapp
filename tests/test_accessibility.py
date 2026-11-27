"""Scan the application's HTML pages with Playwright and axe-core."""

from collections.abc import Iterable, Iterator
from json import dumps
from pprint import pformat
from urllib.parse import urlencode

import pytest
from django.conf import settings
from django.contrib.auth.mixins import AccessMixin
from django.core.management import call_command
from django.test import Client
from django.urls import URLPattern, URLResolver, get_resolver, reverse
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

# Argument-free routes that are not scanned by the discovered-page tests.
EXCLUDED_URL_NAMES = {
    # Non-HTML responses or POST-only endpoints.
    "logout",
    "framework_json",
    "framework_csv",
    "download-csv-data-link",
    "download-json-data-link",
    # Redirects to self_assess or skills_profile.
    "account-overview",
    # Scanned with representative query data in test_shared_skill_profile.
    "view_skill_profile",
}

# Django auth views protected by the login_required decorator, not AccessMixin.
LOGIN_REQUIRED_URL_NAMES = {"password_change", "password_change_done"}


def _url_patterns(
    patterns: Iterable[URLPattern | URLResolver],
) -> Iterator[URLPattern]:
    """Yield non-namespaced URL patterns, skipping namespaced apps like admin."""
    for pattern in patterns:
        if isinstance(pattern, URLResolver):
            if not pattern.namespace:
                yield from _url_patterns(pattern.url_patterns)
        elif isinstance(pattern, URLPattern):
            yield pattern


def _discover_page_names() -> tuple[list[str], list[str]]:
    """Split named, argument-free routes into public and login-required pages."""
    public: set[str] = set()
    login_required: set[str] = set()
    for pattern in _url_patterns(get_resolver().url_patterns):
        if (
            not pattern.name
            or pattern.name in EXCLUDED_URL_NAMES
            or pattern.pattern.regex.groups
        ):
            continue
        view_class = getattr(pattern.callback, "view_class", None)
        requires_login = pattern.name in LOGIN_REQUIRED_URL_NAMES or (
            view_class is not None and issubclass(view_class, AccessMixin)
        )
        (login_required if requires_login else public).add(pattern.name)
    return sorted(public), sorted(login_required)


PUBLIC_PAGES, ACCOUNT_PAGES = _discover_page_names()


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
@pytest.mark.parametrize("page_url", PUBLIC_PAGES)
def test_public_pages(live_server, page: Page, page_url):
    """Scan public pages discovered from the URL configuration."""
    check_accessibility(page, live_server.url + reverse(page_url), page_url)


@known_violations
@pytest.mark.parametrize("page_url", ACCOUNT_PAGES)
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
