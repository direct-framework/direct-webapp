"""Test suite for the community related models."""

import pytest

from main.models import Event


@pytest.mark.django_db
def test_event_model(event: Event) -> None:
    """Test the Event model."""
    assert event.title == "Collaborations Workshop"
    assert str(event) == "Collaborations Workshop (2026-04-01)"
    assert event.location == "Manchester"
    assert event.description == "A workshop about the framework."
    assert event.event_link == "https://example.com/event"
    assert event.blog == "https://example.com/blog"
    assert event.contributors == "Test Contributor"
    assert event.image == ""


@pytest.mark.django_db
def test_event_ordering(event: Event) -> None:
    """Test that events are ordered by most recent start date first."""
    earlier_event = Event.objects.create(
        title="Earlier Event", start_date="2023-01-01"
    )
    assert list(Event.objects.all()) == [event, earlier_event]
