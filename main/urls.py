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
    path(
        "framework/",
        include(
            [
                path(
                    "",
                    views.FrameworkOverviewPageView.as_view(),
                    name="framework",
                ),
                path(
                    "overview",
                    views.FrameworkOverviewPageView.as_view(),
                    name="framework_overview",
                ),
                path(
                    "skills_and_competencies/",
                    views.SkillsAndCompetenciesPageView.as_view(),
                    name="skills_and_competencies",
                ),
                path(
                    "skill-levels/",
                    views.SkillLevelsPageView.as_view(),
                    name="skill_levels",
                ),
                path(
                    "learning-resources/",
                    views.LearningResourcesPageView.as_view(),
                    name="learning_resources",
                ),
                path("roles/", views.RolesPageView.as_view(), name="roles"),
                path(
                    "skills/<slug:slug>/",
                    views.SkillPageView.as_view(),
                    name="skill_detail",
                ),
            ]
        ),
    ),
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
        "framework-json/",
        views.FrameworkView.as_view(),
        name="framework_json",
    ),
]
