"""Main app configuration."""

from django.apps import AppConfig


class MainConfig(AppConfig):
    """Main app configuration."""

    default_auto_field = "django.db.models.BigAutoField"
    name = "main"

    def ready(self) -> None:
        """Connect the app's signal receivers."""
        from . import signals  # noqa: F401
