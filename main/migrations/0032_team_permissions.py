"""Add team permissions and backfill existing memberships."""

from django.apps.registry import Apps
from django.db import migrations
from django.db.backends.base.schema import BaseDatabaseSchemaEditor

TEAM_PERMISSION_NAMES = {
    "view_team": "Can view team",
    "change_team": "Can change team",
    "delete_team": "Can delete team",
    "view_team_member_profiles": "Can view team member profiles",
    "manage_team_members": "Can manage team members",
}


def backfill_team_permissions(
    apps: Apps, schema_editor: BaseDatabaseSchemaEditor
) -> None:
    """Assign existing memberships their derived Guardian permissions."""
    TeamMembership = apps.get_model("main", "TeamMembership")
    UserObjectPermission = apps.get_model("guardian", "UserObjectPermission")
    ContentType = apps.get_model("contenttypes", "ContentType")
    Permission = apps.get_model("auth", "Permission")
    database = schema_editor.connection.alias

    content_type, _ = ContentType.objects.using(database).get_or_create(
        app_label="main", model="team"
    )
    permissions = {}
    for codename, name in TEAM_PERMISSION_NAMES.items():
        permissions[codename], _ = Permission.objects.using(database).get_or_create(
            content_type=content_type, codename=codename, defaults={"name": name}
        )

    for membership in TeamMembership.objects.using(database).all():
        codenames = (
            TEAM_PERMISSION_NAMES.keys()
            if membership.manager
            else ("view_team",)
        )
        for codename in codenames:
            UserObjectPermission.objects.using(database).get_or_create(
                user_id=membership.user_id,
                permission_id=permissions[codename].pk,
                content_type_id=content_type.pk,
                object_pk=str(membership.team_id),
            )


def remove_team_permissions(
    apps: Apps, schema_editor: BaseDatabaseSchemaEditor
) -> None:
    """Remove derived team permission assignments when reversing the migration."""
    UserObjectPermission = apps.get_model("guardian", "UserObjectPermission")
    database = schema_editor.connection.alias
    UserObjectPermission.objects.using(database).filter(
        content_type__app_label="main",
        content_type__model="team",
        permission__codename__in=TEAM_PERMISSION_NAMES,
    ).delete()


class Migration(migrations.Migration):
    dependencies = [
        (
            "guardian",
            "0003_remove_groupobjectpermission_guardian_gr_content_ae6aec_idx_and_more",
        ),
        ("auth", "0012_alter_user_first_name_max_length"),
        ("main", "0031_team_teammembership"),
    ]

    operations = [
        migrations.AlterModelOptions(
            name="team",
            options={
                "permissions": (
                    (
                        "view_team_member_profiles",
                        "Can view team member profiles",
                    ),
                    ("manage_team_members", "Can manage team members"),
                )
            },
        ),
        migrations.RunPython(backfill_team_permissions, remove_team_permissions),
    ]
