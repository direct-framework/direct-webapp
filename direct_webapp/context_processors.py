"""Context processors for the Direct Webapp."""

from django.conf import settings
from django.http import HttpRequest

from direct_webapp.github_releases import get_footer_release_links


def site_title(request: HttpRequest) -> dict[str, str]:
    """Return the site title from settings."""
    return {"site_title": getattr(settings, "SITE_TITLE")}


def footer_release_links(request: HttpRequest) -> dict[str, object]:
    """Return footer release metadata for the configured GitHub repositories."""
    return {"footer_release_links": get_footer_release_links()}
