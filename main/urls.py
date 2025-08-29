"""Urls module for the main app."""

from django.urls import include, path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("privacy/", views.privacy, name="privacy"),
    path("accounts/", include("django_registration.backends.one_step.urls")),
    path("accounts/", include("django.contrib.auth.urls")),
    path("about/", views.AboutPageView.as_view(), name="about"),
    path("terms/", views.TermsPageView.as_view(), name="terms"),
    path("contact/", views.ContactPageView.as_view(), name="contact"),
    path("skill-levels/", views.SkillLevelsPageView.as_view(), name="skill-levels"),
    path("training/", views.TrainingPageView.as_view(), name="training"),
    path("roles/", views.RolesPageView.as_view(), name="roles"),
    path("get-involved/", views.GetInvolvedPageView.as_view(), name="get-involved"),
    path("events/", views.EventsPageView.as_view(), name="events"),
    path("self-assess/", views.SelfAssessPageView.as_view(), name="self-assess"),
    path("skills/", views.skill_profile, name="skill_profile"),
    path("account/profile/", views.UserUpdateView.as_view(), name="profile"),
    path(
        "account/overview/",
        views.AccountOverviewPageView.as_view(),
        name="account-overview",
    ),
    path(
        "competencies/",
        views.CompetenciesPageView.as_view(),
        name="competencies",
    ),
]
