"""Urls module for the main app."""

from django.conf import settings
from django.conf.urls.static import static
from django.urls import include, path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("privacy/", views.privacy, name="privacy"),
    path("accounts/", include("django.contrib.auth.urls")),
    path("register/", views.CreateUserView.as_view(), name="create_user"),
    path("profile/", views.profile, name="users-profile"),
    *static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT),
]
