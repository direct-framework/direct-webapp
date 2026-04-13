"""Urls module for the main app."""

from django.urls import include, path
from django_registration.backends.one_step.views import RegistrationView

from . import views
from .forms import RegistrationForm

urlpatterns = [
    path("", views.IndexPageView.as_view(), name="index"),
    path("privacy/", views.PrivacyPageView.as_view(), name="privacy"),
    path(
        "accounts/register/",
        RegistrationView.as_view(form_class=RegistrationForm),
        name="django_registration_register",
    ),
    path("accounts/", include("django_registration.backends.one_step.urls")),
    path("accounts/", include("django.contrib.auth.urls")),
    path("about/", views.AboutPageView.as_view(), name="about"),
    path("terms/", views.TermsPageView.as_view(), name="terms"),
    path("skill-levels/", views.SkillLevelsPageView.as_view(), name="skill_levels"),
    path("training/", views.TrainingPageView.as_view(), name="training"),
    path("roles/", views.RolesPageView.as_view(), name="roles"),
    path("get-involved/", views.GetInvolvedPageView.as_view(), name="get_involved"),
    path("events/", views.EventsPageView.as_view(), name="events"),
    path("self-assess/", views.SelfAssessPageView.as_view(), name="self_assess"),
    path("skills/", views.SkillProfileView.as_view(), name="skill_profile"),
    path("account/profile/", views.UserUpdateView.as_view(), name="profile"),
    path(
        "account/overview/",
        views.AccountOverviewView.as_view(),
        name="account-overview",
    ),
    path(
        "competencies/",
        views.CompetenciesPageView.as_view(),
        name="competencies",
    ),
    path("skills/<slug:slug>/", views.SkillPageView.as_view(), name="skill_detail"),
    path(
        "framework-json/",
        views.FrameworkView.as_view(),
        name="framework_json",
    ),
]
