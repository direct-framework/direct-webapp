"""Tests for the Team and TeamMembership models."""

import pytest
from django.core.exceptions import ValidationError

from main.models import Skill, SkillLevel, SkillProfile, Team, TeamMembership, User
from main.team_services import create_team


@pytest.mark.django_db
def test_team_membership_unique(user) -> None:
    """A team has at most one membership for each person."""
    team = create_team(user=user, name="Team 1", description="The first team")
    membership = TeamMembership.objects.get(user=user, team=team)

    assert team.slug == "team-1"
    assert membership.user == user
    assert membership.team == team
    assert membership.manager

    duplicate = TeamMembership(user=user, team=team)
    with pytest.raises(
        ValidationError,
        match=r"Team membership with this User and Team already exists.",
    ):
        duplicate.full_clean()


@pytest.mark.parametrize("identity_field", ["user", "team"])
@pytest.mark.django_db
def test_team_membership_identity_cannot_change(
    user, django_user_model, identity_field
) -> None:
    """An existing membership cannot change its team or team member."""
    team = create_team(
        user=user, name="Immutable membership", description="Membership test"
    )
    membership = TeamMembership.objects.get(user=user, team=team)
    other_user = django_user_model.objects.create_user(username="other-member")
    other_team = Team.objects.create(name="Other team", description="Membership test")

    setattr(
        membership,
        identity_field,
        other_user if identity_field == "user" else other_team,
    )
    with pytest.raises(
        ValidationError,
        match="Change a member's user or team by removing the existing membership",
    ):
        membership.save()

    membership.refresh_from_db()
    assert membership.user == user
    assert membership.team == team


@pytest.mark.django_db
def test_membership_model_preserves_at_least_one_manager(user) -> None:
    """A team cannot lose its final manager through a membership save or delete."""
    team = create_team(user=user, name="Last manager", description="Model invariant")
    membership = TeamMembership.objects.get(team=team, user=user)
    membership.manager = False

    with pytest.raises(ValidationError):
        membership.save()
    with pytest.raises(ValidationError):
        membership.delete()

    membership.refresh_from_db()
    assert membership.manager


@pytest.fixture
def skill_levels() -> dict[int, SkillLevel]:
    """Create the framework's 0-4 skill level scale."""
    return {
        level: SkillLevel.objects.create(
            level=level,
            name=f"Level {level}",
            description=f"Level {level}",
            short_description=f"Level {level}",
        )
        for level in range(5)
    }


@pytest.fixture
def team_of_four(user, django_user_model) -> tuple[Team, list[User]]:
    """Create a team with a manager and three regular members."""
    team = create_team(user=user, name="Average team", description="Aggregate test")
    members = [user]
    for index in range(3):
        member = django_user_model.objects.create_user(username=f"member-{index}")
        TeamMembership.objects.create(user=member, team=team)
        members.append(member)
    return team, members


def _assess(members, skill, skill_levels, levels) -> None:
    """Record one assessment of a skill for each member and level given."""
    for member, level in zip(members, levels, strict=False):
        SkillProfile.objects.create(
            profile=member.profile, skill=skill, skill_level=skill_levels[level]
        )


@pytest.mark.django_db
def test_aggregate_skill_profile_rounds_each_average_to_a_whole_level(
    team_of_four, competency, skill_levels
) -> None:
    """Averages include level 0 and round to the nearest level, halves up."""
    team, members = team_of_four
    half = Skill.objects.create(name="Half", description="-", competency=competency)
    lower = Skill.objects.create(name="Lower", description="-", competency=competency)
    upper = Skill.objects.create(name="Upper", description="-", competency=competency)
    _assess(members, half, skill_levels, [0, 0, 1, 1])
    _assess(members, lower, skill_levels, [1, 1, 2])
    _assess(members, upper, skill_levels, [1, 2, 2])

    assert team.aggregate_skill_profile() == [
        {
            "skill": name,
            "category": competency.competency_domain.name,
            "subcategory": competency.name,
            "skill_level": level,
        }
        for name, level in (("Half", 1), ("Lower", 1), ("Upper", 2))
    ]


@pytest.mark.django_db
def test_aggregate_skill_profile_needs_three_assessments_of_a_skill(
    team_of_four, competency, skill_levels
) -> None:
    """A skill assessed by fewer than three members is left out completely."""
    team, members = team_of_four
    rare = Skill.objects.create(name="Rare", description="-", competency=competency)
    _assess(members, rare, skill_levels, [4, 4])

    assert team.aggregate_skill_profile() == []


@pytest.mark.django_db
def test_aggregate_skill_profile_uses_only_current_members_assessments(
    team_of_four, competency, skill_levels, django_user_model
) -> None:
    """Unassessed members and non-members do not affect a team's averages."""
    team, members = team_of_four
    skill = Skill.objects.create(name="Shared", description="-", competency=competency)
    _assess(members[:3], skill, skill_levels, [4, 4, 1])
    outsider = django_user_model.objects.create_user(username="outsider")
    _assess([outsider], skill, skill_levels, [0])
    former_member = members[3]
    _assess([former_member], skill, skill_levels, [0])
    TeamMembership.objects.get(team=team, user=former_member).delete()

    assert [row["skill_level"] for row in team.aggregate_skill_profile()] == [3]
