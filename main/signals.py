"""Signal receivers for the main app."""

from typing import Any

from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver

from .models import Profile, User


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_user_profile(
    sender: type[User], instance: User, created: bool, raw: bool, **kwargs: Any
) -> None:
    """Create a profile for each newly created user.

    Raw saves from fixture loading are skipped, so fixtures that contain users
    must also contain their profiles.
    """
    if created and not raw:
        Profile.objects.create(user=instance)
