"""Context processors for the Direct Webapp."""

from django.conf import settings
from django.http import HttpRequest


def site_title(request: HttpRequest) -> dict[str, str]:
    """Return the site title from settings."""
    return {"site_title": getattr(settings, "SITE_TITLE")}
