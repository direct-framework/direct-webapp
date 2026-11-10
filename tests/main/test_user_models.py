"""Tests for the User related models in the main app."""

import pytest
from django.core.exceptions import ValidationError

from main.models import Profile, Skill, SkillLevel, SkillProfile


@pytest.mark.django_db
def test_skill_profile_model(
    skill_profile: SkillProfile, user, skill: Skill, skill_level: SkillLevel
) -> None:
    """Test the SkillProfile model."""
    assert skill_profile.profile == user.profile
    assert skill_profile.skill == skill
    assert skill_profile.skill_level == skill_level

    new_skill_level = SkillLevel.objects.create(
        name="Intermediate",
        description="Intermediate level",
        level=2,
        short_description="Intermediate",
    )

    new_skill_profile = SkillProfile(
        profile=user.profile, skill=skill, skill_level=new_skill_level
    )
    with pytest.raises(
        ValidationError,
        match=r"Skill profile with this Profile and Skill already exists.",
    ):
        new_skill_profile.full_clean()


@pytest.mark.django_db
def test_creating_a_user_creates_their_profile(django_user_model) -> None:
    """Test that a newly created user has exactly one profile."""
    user = django_user_model.objects.create_user(username="new-user")

    assert Profile.objects.filter(user=user).count() == 1
    assert user.profile.user == user


@pytest.mark.django_db
def test_creating_a_superuser_creates_their_profile(django_user_model) -> None:
    """Test that a newly created superuser has exactly one profile."""
    user = django_user_model.objects.create_superuser(
        username="new-admin", email="admin@example.com", password="password"
    )

    assert Profile.objects.filter(user=user).count() == 1


@pytest.mark.django_db
def test_saving_an_existing_user_keeps_their_profile(user) -> None:
    """Test that saving an existing user does not create another profile."""
    profile = user.profile

    user.first_name = "Updated"
    user.save()

    assert list(Profile.objects.filter(user=user)) == [profile]


@pytest.mark.django_db
def test_deleting_a_user_deletes_their_profile_and_skill_profiles(
    skill_profile: SkillProfile, user
) -> None:
    """Test that deleting a user deletes their profile and assessments."""
    profile = user.profile

    user.delete()

    assert not Profile.objects.filter(pk=profile.pk).exists()
    assert not SkillProfile.objects.filter(pk=skill_profile.pk).exists()


@pytest.mark.django_db
def test_profile_can_exist_without_a_user() -> None:
    """Test that an anonymous profile can be saved without a user."""
    profile = Profile.objects.create()

    profile.full_clean()
    assert profile.user is None
