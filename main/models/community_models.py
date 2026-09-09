"""Models for community-facing content, kept separate from the core framework."""

from django.db import models


class Event(models.Model):
    """Model for community events the DIRECT project has contributed to."""

    class Meta:
        """Meta options for Event model."""

        ordering = ("-start_date", "title")
        unique_together = ("title", "start_date")

    title = models.CharField(max_length=255)
    start_date = models.DateField()
    end_date = models.DateField(blank=True, null=True)
    location = models.CharField(max_length=255, blank=True)
    description = models.TextField(blank=True)
    event_link = models.URLField(max_length=500, blank=True, null=True)
    blog = models.URLField(max_length=500, blank=True, null=True)
    contributors = models.TextField(blank=True)
    # Placeholder until image storage (static path vs. uploaded file) is decided.
    image = models.CharField(max_length=500, blank=True)

    def __str__(self) -> str:
        """Return the event title and start date."""
        return f"{self.title} ({self.start_date})"
