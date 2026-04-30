from django.db import models
from django.conf import settings
from .framework_models import SluggedModel

class Team(SluggedModel):
    pass

class TeamMembership(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    team = models.ForeignKey(Team, on_delete=models.CASCADE)
    manager = models.BooleanField(blank=True, default=False)