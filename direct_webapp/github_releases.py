"""Helpers for retrieving GitHub release metadata."""

from __future__ import annotations

import json
from dataclasses import dataclass
from typing import TypedDict
from urllib.error import HTTPError, URLError
from urllib.parse import quote
from urllib.request import Request, urlopen

from django.conf import settings
from django.core.cache import cache


class ReleaseRepository(TypedDict):
    """Configuration for a footer release link."""

    label: str
    repository: str
    fallback_tag: str


@dataclass(frozen=True, slots=True)
class ReleaseLink:
    """Release metadata rendered in the footer."""

    label: str
    tag_name: str
    url: str


def get_footer_release_links() -> list[ReleaseLink]:
    """Return cached release metadata for the configured footer repositories."""
    repositories = getattr(settings, "GITHUB_RELEASE_REPOSITORIES", ())
    return [get_latest_release_link(repository) for repository in repositories]


def get_latest_release_link(repository: ReleaseRepository) -> ReleaseLink:
    """Return the latest release metadata for a repository."""
    cache_key = f"github-release:{repository['repository']}"
    cached_release = cache.get(cache_key)
    if cached_release is not None:
        return ReleaseLink(**cached_release)

    release_link = _fetch_release_link(repository)
    cache_timeout = getattr(settings, "GITHUB_RELEASE_CACHE_TIMEOUT", 21600)
    cache.set(
        cache_key,
        {
            "label": release_link.label,
            "tag_name": release_link.tag_name,
            "url": release_link.url,
        },
        timeout=cache_timeout,
    )
    return release_link


def _fetch_release_link(repository: ReleaseRepository) -> ReleaseLink:
    """Fetch release metadata from the GitHub releases API."""
    request = Request(
        url=f"https://api.github.com/repos/{repository['repository']}/releases/latest",
        headers=_build_headers(),
    )

    try:
        with urlopen(
            request, timeout=getattr(settings, "GITHUB_RELEASE_TIMEOUT", 2.0)
        ) as response:
            payload = json.load(response)
    except (HTTPError, URLError, TimeoutError, ValueError):
        return _build_fallback_release(repository)

    tag_name = payload.get("tag_name")
    if not isinstance(tag_name, str) or not tag_name:
        return _build_fallback_release(repository)

    html_url = payload.get("html_url")
    if not isinstance(html_url, str) or not html_url:
        html_url = _build_release_url(repository["repository"], tag_name)

    return ReleaseLink(
        label=repository["label"],
        tag_name=tag_name,
        url=html_url,
    )


def _build_headers() -> dict[str, str]:
    """Build HTTP headers for GitHub API requests."""
    headers = {
        "Accept": "application/vnd.github+json",
        "User-Agent": "direct-webapp-footer-release-check",
    }
    github_token = getattr(settings, "GITHUB_TOKEN", "")
    if github_token:
        headers["Authorization"] = f"Bearer {github_token}"
    return headers


def _build_fallback_release(repository: ReleaseRepository) -> ReleaseLink:
    """Build a stable fallback release link when GitHub is unavailable."""
    fallback_tag = repository["fallback_tag"]
    return ReleaseLink(
        label=repository["label"],
        tag_name=fallback_tag,
        url=_build_release_url(repository["repository"], fallback_tag),
    )


def _build_release_url(repository: str, tag_name: str) -> str:
    """Build the public URL for a tagged GitHub release."""
    return f"https://github.com/{repository}/releases/tag/{quote(tag_name, safe='')}"
