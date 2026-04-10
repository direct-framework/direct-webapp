"""Tests for GitHub release metadata helpers."""

import io
import json
from urllib.error import URLError

import pytest
from django.core.cache import cache

from direct_webapp.github_releases import get_latest_release_link


@pytest.fixture(autouse=True)
def clear_release_cache():
    """Ensure release metadata tests do not share cached values."""
    cache.clear()


def test_get_latest_release_link_uses_github_response(settings, mocker):
    """Test the helper returns the latest GitHub tag and caches it."""
    repository = {
        "label": "Webapp",
        "repository": "direct-framework/direct-webapp",
        "fallback_tag": "v0.0.0",
    }
    payload = {
        "tag_name": "v9.9.9",
        "html_url": "https://github.com/direct-framework/direct-webapp/releases/tag/v9.9.9",
    }
    response = io.BytesIO(json.dumps(payload).encode("utf-8"))
    mocked_urlopen = mocker.patch(
        "direct_webapp.github_releases.urlopen",
        return_value=mocker.MagicMock(
            __enter__=mocker.Mock(return_value=response),
            __exit__=mocker.Mock(return_value=False),
        ),
    )

    first_release = get_latest_release_link(repository)
    second_release = get_latest_release_link(repository)

    assert first_release.label == "Webapp"
    assert first_release.tag_name == "v9.9.9"
    assert (
        first_release.url
        == "https://github.com/direct-framework/direct-webapp/releases/tag/v9.9.9"
    )
    assert second_release == first_release
    assert mocked_urlopen.call_count == 1


def test_get_latest_release_link_falls_back_on_error(mocker):
    """Test the helper falls back to the configured tag if GitHub is unavailable."""
    repository = {
        "label": "Competency framework",
        "repository": "direct-framework/digital-research-competencies-framework",
        "fallback_tag": "v2.0.0",
    }
    mocker.patch(
        "direct_webapp.github_releases.urlopen",
        side_effect=URLError("GitHub unavailable"),
    )

    release = get_latest_release_link(repository)

    assert release.label == "Competency framework"
    assert release.tag_name == "v2.0.0"
    assert (
        release.url
        == "https://github.com/direct-framework/digital-research-competencies-framework/releases/tag/v2.0.0"
    )
