"""Urls module for the main app."""

from django.urls import include, path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("privacy/", views.privacy, name="privacy"),
    path("accounts/", include("django_registration.backends.one_step.urls")),
    path("accounts/", include("django.contrib.auth.urls")),
    path("profile/", views.UserUpdateView.as_view(), name="profile"),
    path("about/", views.AboutPageView.as_view(), name="about"),
    path("terms/", views.TermsPageView.as_view(), name="terms"),
    path("contact/", views.ContactPageView.as_view(), name="contact"),
    path("self-assess/", views.SelfAssessPageView.as_view(), name="self-assess"),
    path("skills/", views.skill_profile, name="skill_profile"),
    path("docs/", views.DocsPageView.as_view(), name="docs"),
    path("framework/", views.FrameworkPageView.as_view(), name="framework"),
    path("training/", views.TrainingPageView.as_view(), name="training"),
]
