"""Urls module for the main app."""

from django.urls import include, path

from main.views import account_views, page_views

urlpatterns = [
    path("", page_views.index, name="index"),
    path("privacy/", page_views.privacy, name="privacy"),
    path("accounts/", include("django_registration.backends.one_step.urls")),
    path("accounts/", include("django.contrib.auth.urls")),
    path("about/", page_views.AboutPageView.as_view(), name="about"),
    path("terms/", page_views.TermsPageView.as_view(), name="terms"),
    path(
        "skill-levels/", page_views.SkillLevelsPageView.as_view(), name="skill_levels"
    ),
    path("training/", page_views.TrainingPageView.as_view(), name="training"),
    path("roles/", page_views.RolesPageView.as_view(), name="roles"),
    path(
        "get-involved/", page_views.GetInvolvedPageView.as_view(), name="get_involved"
    ),
    path("events/", page_views.EventsPageView.as_view(), name="events"),
    path(
        "self-assess/", account_views.SelfAssessPageView.as_view(), name="self_assess"
    ),
    path("skills/", account_views.skill_profile, name="skill_profile"),
    path("account/profile/", account_views.UserUpdateView.as_view(), name="profile"),
    path(
        "account/overview/",
        account_views.account_overview,
        name="account-overview",
    ),
    path(
        "competencies/",
        page_views.CompetenciesPageView.as_view(),
        name="competencies",
    ),
]
