"""Urls module for the main app."""

from django.urls import include, path

from . import views

urlpatterns = [
    path("", views.IndexView.as_view(), name="index"),
    path("", views.IndexView.as_view(), name="app"),
    path("privacy/", views.privacy, name="privacy"),
    path("accounts/", include("django_registration.backends.one_step.urls")),
    path("accounts/", include("django.contrib.auth.urls")),
    path("account/", views.UserUpdateView.as_view(), name="account"),
    path("about/", views.AboutPageView.as_view(), name="about"),
    path("terms/", views.TermsPageView.as_view(), name="terms"),
    path("contact/", views.ContactPageView.as_view(), name="contact"),
    path("self-assess/", views.SelfAssessPageView.as_view(), name="self-assess"),
    path("docs/", views.DocsPageView.as_view(), name="docs"),
    path("framework/", views.FrameworkPageView.as_view(), name="framework"),
    path("training/", views.TrainingPageView.as_view(), name="training"),
]
