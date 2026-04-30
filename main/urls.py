"""Urls module for the main app."""

from django.urls import include, path
from django_registration.backends.one_step.views import RegistrationView

from . import views
from .forms import RegistrationForm

framework_patterns = [
    path("", views.FrameworkOverviewPageView.as_view(), name="framework"),
    path(
        "overview", views.FrameworkOverviewPageView.as_view(), name="framework_overview"
    ),
    path(
        "skills_and_competencies/",
        views.SkillsAndCompetenciesPageView.as_view(),
        name="skills_and_competencies",
    ),
    path("skill-levels/", views.SkillLevelsPageView.as_view(), name="skill_levels"),
    path(
        "learning-resources/",
        views.LearningResourcesPageView.as_view(),
        name="learning_resources",
    ),
    path("roles/", views.RolesPageView.as_view(), name="roles"),
    path("skills/<slug:slug>/", views.SkillPageView.as_view(), name="skill_detail"),
]

accounts_patterns = [
    path("self-assess/", views.SelfAssessPageView.as_view(), name="self_assess"),
    path("skills-profile/", views.SkillProfileView.as_view(), name="skills_profile"),
    path("profile/", views.UserUpdateView.as_view(), name="profile"),
    path("overview/", views.AccountOverviewView.as_view(), name="account-overview"),
]

policies_patterns = [
    path("privacy/", views.PrivacyPageView.as_view(), name="privacy"),
    path("terms/", views.TermsPageView.as_view(), name="terms"),
    path("governance/", views.GovernancePageView.as_view(), name="governance"),
    path("licensing/", views.LicensingPageView.as_view(), name="licensing"),
]

urlpatterns = [
    path("", views.IndexPageView.as_view(), name="index"),
    path(
        "accounts/register/",
        RegistrationView.as_view(form_class=RegistrationForm),
        name="django_registration_register",
    ),
    path("accounts/", include("django_registration.backends.one_step.urls")),
    path("accounts/", include("django.contrib.auth.urls")),
    path("accounts/", include(accounts_patterns)),
    path("about/", views.AboutPageView.as_view(), name="about"),
    path(
        "terms-acceptance/",
        views.TermsAcceptanceView.as_view(),
        name="terms_acceptance",
    ),
    path("framework/", include(framework_patterns)),
    path("policies/", include(policies_patterns)),
    path("get-involved/", views.GetInvolvedPageView.as_view(), name="get_involved"),
    path("events/", views.EventsPageView.as_view(), name="events"),
    path("framework-json/", views.FrameworkView.as_view(), name="framework_json"),
    path("my-teams/", views.MyTeamPageView.as_view(), name="my-teams"),
    path("create-team/", views.CreateTeamPageView.as_view(), name="create-team"),
]
