"""Tests for team permission migrations."""

import pytest
from django.db import connection
from django.db.migrations.executor import MigrationExecutor
from guardian.shortcuts import get_objects_for_user

from main.models import Team, User


@pytest.mark.django_db(transaction=True)
def test_migration_backfills_existing_team_memberships() -> None:
    """Backfill member and manager permissions for existing teams."""
    before_permissions = [("main", "0031_team_teammembership")]
    after_permissions = [("main", "0032_team_permissions")]
    executor = MigrationExecutor(connection)
    executor.migrate(before_permissions)

    old_apps = executor.loader.project_state(before_permissions).apps
    OldTeam = old_apps.get_model("main", "Team")
    OldTeamMembership = old_apps.get_model("main", "TeamMembership")
    OldUser = old_apps.get_model("main", "User")

    member = OldUser.objects.create(username="backfill-member")
    manager = OldUser.objects.create(username="backfill-manager")
    team = OldTeam.objects.create(
        name="Backfill team", description="Existing team", slug="backfill-team"
    )
    OldTeamMembership.objects.create(user=member, team=team, manager=False)
    OldTeamMembership.objects.create(user=manager, team=team, manager=True)

    executor = MigrationExecutor(connection)
    executor.migrate(after_permissions)

    member = User.objects.get(username="backfill-member")
    manager = User.objects.get(username="backfill-manager")
    team = Team.objects.get(slug="backfill-team")

    assert member.has_perm("main.view_team", team)
    assert not member.has_perm("main.change_team", team)
    assert not member.has_perm("main.view_team_member_profiles", team)
    assert team in get_objects_for_user(member, "main.view_team", klass=Team)
    assert manager.has_perm("main.view_team", team)
    assert manager.has_perm("main.change_team", team)
    assert manager.has_perm("main.delete_team", team)
    assert manager.has_perm("main.view_team_member_profiles", team)
    assert manager.has_perm("main.manage_team_members", team)

    MigrationExecutor(connection).migrate(before_permissions)

    member = User.objects.get(username="backfill-member")
    manager = User.objects.get(username="backfill-manager")
    team = Team.objects.get(slug="backfill-team")
    assert not member.has_perm("main.view_team", team)
    assert not manager.has_perm("main.view_team", team)

    MigrationExecutor(connection).migrate(after_permissions)

    member = User.objects.get(username="backfill-member")
    manager = User.objects.get(username="backfill-manager")
    team = Team.objects.get(slug="backfill-team")
    assert member.has_perm("main.view_team", team)
    assert manager.has_perm("main.view_team", team)
