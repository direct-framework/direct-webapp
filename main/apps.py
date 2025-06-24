"""Main app configuration."""

from django.apps import AppConfig


class MainConfig(AppConfig):
    """Main app configuration."""

    default_auto_field = "django.db.models.BigAutoField"
    name = "main"

    def ready(self) -> None:
        """Ensure custom signals are picked up."""
        import main.signals  # noqa
