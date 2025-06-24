from django.db.models.signals import post_save  # noqa: D100
from django.dispatch import receiver

from .models import User, UserProfile


@receiver(post_save, sender=User)
def create_userprofile(sender, instance, created, **kwargs) -> None:
    """Receiver to ensure UserProfile is created when a user is created."""
    if created:
        UserProfile.objects.create(user=instance)


@receiver(post_save, sender=User)
def save_userprofile(sender, instance, **kwargs) -> None:
    """Receiver to ensure UserProfile is saved when a user is saved."""
    instance.userprofile.save()
