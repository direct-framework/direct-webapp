"""Test suite for account views."""

import json
from http import HTTPStatus

import pytest
from django.urls import reverse

from main.models import Skill, SkillLevel, SkillProfile

from .view_utils import (
    BS4Mixin,
    LoginRequiredMixin,
    TemplateOkMixin,
    tag_with_text_filter,
)


class TestUserUpdateView(TemplateOkMixin, LoginRequiredMixin):
    """Test suite for the UserUpdateView."""

    _template_name = "main/user-update-form.html"

    def _get_url(self):
        return reverse("profile")

    def test_post(self, client, user, django_user_model):
        """Test the view POST request updates the user and redirects correctly."""
        client.force_login(user)

        user_id = user.id
        new_email = "new@mail.com"
        new_username = "newusername"

        response = client.post(
            self._get_url(), data={"username": new_username, "email": new_email}
        )

        # Assert the user email is updated
        updated_user = django_user_model.objects.get(id=user_id)

        assert updated_user.email == new_email
        assert updated_user.username == new_username

        # Assert redirects to profile
        assert response.status_code == HTTPStatus.FOUND
        assert response.url == self._get_url()


class TestTermsAcceptanceView(TemplateOkMixin, LoginRequiredMixin):
    """Test suite for the terms acceptance view."""

    _template_name = "main/terms_acceptance.html"

    def _get_url(self):
        return reverse("terms_acceptance")

    def test_post_updates_user_and_redirects_to_overview(self, client, user):
        """Test that posting acceptance updates user fields and redirects."""
        user.agreed_to_tos = False
        user.save(update_fields=["agreed_to_tos"])
        client.force_login(user)

        response = client.post(self._get_url(), data={"tos": True})

        user.refresh_from_db()
        assert user.agreed_to_tos is True
        assert user.date_agreed is not None
        assert response.status_code == HTTPStatus.FOUND
        assert response.url == reverse("account-overview")

    def test_post_redirects_to_overview_without_next(self, client, user):
        """Test that posting acceptance without next redirects to account overview."""
        user.agreed_to_tos = False
        user.save(update_fields=["agreed_to_tos"])
        client.force_login(user)

        response = client.post(self._get_url(), data={"tos": True})

        assert response.status_code == HTTPStatus.FOUND
        assert response.url == reverse("account-overview")


class TestSelfAssessPageView(TemplateOkMixin, LoginRequiredMixin):
    """Test suite for the SelfAssessPageView."""

    _template_name = "main/user-self-assess.html"

    def _get_url(self):
        return reverse("self_assess")

    @pytest.mark.django_db
    def test_post(self, client, user, competency, skill, skill_level):
        """Test the view POST request creates new skill profiles and redirects."""
        client.force_login(user)

        skill2 = Skill.objects.create(
            name="Test Skill 2",
            description="Test skill 2 description",
            competency=competency,
        )

        # Create form data for the POST request
        form_data = {
            f"skill_{skill.id}": skill_level.id,
            f"skill_{skill2.id}": skill_level.id,
        }

        # Make POST request
        response = client.post(self._get_url(), data=form_data)

        # Assert skill profiles are created
        skill_profiles = SkillProfile.objects.filter(profile=user.profile)
        assert skill_profiles.count() == 2

        # Assert the skills are correctly associated
        skill_ids = set(us.skill.id for us in skill_profiles)
        assert skill_ids == {skill.id, skill2.id}

        # Assert all skill profiles have the correct level
        for skill_profile in skill_profiles:
            assert skill_profile.skill_level == skill_level

        # Assert redirects to self_assess (success_url)
        assert response.status_code == HTTPStatus.FOUND
        assert response.url == reverse("self_assess")


@pytest.mark.parametrize(
    "url_name",
    ["skills_profile", "self_assess", "profile", "account-overview"],
)
def test_unaccepted_users_are_redirected_to_terms_acceptance(client, user, url_name):
    """Unaccepted users should be redirected from gated account pages."""
    user.agreed_to_tos = False
    user.save(update_fields=["agreed_to_tos"])
    client.force_login(user)
    target_url = reverse(url_name)

    response = client.get(target_url)

    assert response.status_code == HTTPStatus.FOUND
    assert response.url == reverse("terms_acceptance")


class TestSkillProfile(TemplateOkMixin, BS4Mixin):
    """Test suite for the skill profile view."""

    _template_name = "main/user-skills-profile.html"

    def _get_url(self):
        return reverse("skills_profile")

    def test_provides_required_context(self, admin_client, skill_level):
        """Test that the skill profile view send the correct context data."""
        response = admin_client.get(self._get_url())
        assert response.status_code == 200
        assert "chart_data" in response.context
        assert isinstance(response.context["chart_data"], str)
        assert response.context["skill_levels"] == json.dumps(
            [{"level": skill_level.level, "name": skill_level.name}]
        )

    def test_skill_wheel_script(self, skill_profile, auth_soup):
        """Test that the skill profile view contains the correct script."""
        card = auth_soup.find("div", class_="card-body")

        assert card.find(tag_with_text_filter("h1", "Skills profile"))
        assert card.find("div", id="dataviz_root")

        skill_level_list = list(SkillLevel.objects.values("level", "name"))
        skill_profile_dict = {
            "skill": skill_profile.skill.name,
            "category": skill_profile.skill.competency.competency_domain.name,
            "subcategory": skill_profile.skill.competency.name,
            "skill_level": skill_profile.skill_level.level,
        }
        chart_data = [{"user_id": "root", "skill_profile_data": [skill_profile_dict]}]

        assert card.find(
            tag_with_text_filter(
                "script",
                f"const skillLevels = {json.dumps(skill_level_list)};",
            )
        )
        assert card.find(
            tag_with_text_filter(
                "script",
                f"const charts = {json.dumps(chart_data)};",
            )
        )
        assert card.find(
            tag_with_text_filter(
                "script",
                "renderRadialBarChart(target, charts[i].skill_profile_data, skillLevels);",  # noqa: E501
            )
        )


class TestAccountOverviewView(LoginRequiredMixin):
    """Test suite for the account_overview view."""

    def _get_url(self):
        return reverse("account-overview")

    def test_redirects_to_self_assess_when_no_skills(self, client, user):
        """Test that users with no skills are redirected to self-assess."""
        client.force_login(user)
        response = client.get(self._get_url())
        assert response.status_code == HTTPStatus.FOUND
        assert response.url == reverse("self_assess")

    @pytest.mark.django_db
    def test_redirects_to_skill_profile_when_skills_exist(self, client, skill_profile):
        """Test that users with skills are redirected to their skill profile."""
        client.force_login(skill_profile.profile.user)

        response = client.get(self._get_url())
        assert response.status_code == HTTPStatus.FOUND
        assert response.url == reverse("skills_profile")
