"""Test suite for the main app admin views."""

import json
from http import HTTPStatus
from typing import Any, ClassVar

import pytest
from bs4 import BeautifulSoup
from django.contrib.admin import site
from django.contrib.auth import get_user_model
from django.core.files.uploadedfile import SimpleUploadedFile
from django.db.models import Model
from django.urls import reverse
from import_export.formats import base_formats

from main.models import (
    Competency,
    CompetencyDomain,
    LearningResource,
    Profile,
    Provider,
    Skill,
    SkillLevel,
    Team,
    TeamMembership,
    ToolLanguageMethodology,
)
from main.team_services import create_team


class AdminMixin:
    """Mixin for testing models that have a visible admin view.

    Note: Using this requires the test class to define:
        - A `_model` variable that is the model being tested
        - A `_data` dict  with the kwargs needed to create an instance of the model
    """

    _model: type[Model]
    _data: ClassVar[dict[str, Any]] = {}

    def test_list_view(self, admin_client):
        """Test the list view of the admin model."""
        response = admin_client.get(f"/admin/main/{self._model._meta.model_name}/")
        assert response.status_code == HTTPStatus.OK

    def test_add_get(self, admin_client):
        """Test the GET request is successful."""
        response = admin_client.get(f"/admin/main/{self._model._meta.model_name}/add/")
        assert response.status_code == HTTPStatus.OK

    def _create_object(self):
        """Create the object being changed."""
        return self._model.objects.create(**self._data)

    @pytest.mark.django_db
    def test_change_get(self, admin_client):
        """Test the GET request to the change view is successful."""
        obj = self._create_object()
        response = admin_client.get(
            f"/admin/main/{self._model._meta.model_name}/{obj.pk}/change/"
        )
        assert response.status_code == HTTPStatus.OK


class TestUserAdmin(AdminMixin):
    """Test suite for the User admin views."""

    _model = get_user_model()
    _data: ClassVar[dict[str, Any]] = {
        "username": "TestUser",
        "password": "testpassword",
    }


class TestCompetencyDomainAdmin(AdminMixin):
    """Test suite for the CompetencyDomain admin views."""

    _model = CompetencyDomain
    _data: ClassVar[dict[str, Any]] = {
        "name": "Test Competency Domain",
        "description": "Test Description",
    }


class TestCompetencyAdmin(AdminMixin):
    """Test suite for the Competency admin views."""

    _model = Competency
    _data: ClassVar[dict[str, Any]] = {
        "name": "Test Competency",
        "description": "Test Description",
    }

    def _create_object(self):
        """Overwrite to also create the Category for the Skill being changed."""
        competency_domain = CompetencyDomain.objects.create(
            **TestCompetencyDomainAdmin._data
        )
        return Competency.objects.create(
            competency_domain=competency_domain, **self._data
        )


class TestProviderAdmin(AdminMixin):
    """Test suite for the Provider admin views."""

    _model = Provider
    _data: ClassVar[dict[str, Any]] = {
        "name": "Test Provider",
        "description": "Test Description",
        "url": "https://example.com",
        "ror": "https://ror.org/12345",
    }


class TestLearningResourceAdmin(AdminMixin):
    """Test suite for the LearningResource admin views."""

    _model = LearningResource
    _data: ClassVar[dict[str, Any]] = {
        "name": "Test LearningResource",
        "description": "Test Description",
        "language": "en",
        "url": "https://example.com/resource",
        "provider": None,
    }


class TestToolAdmin(AdminMixin):
    """Test suite for the Tool admin views."""

    _model = ToolLanguageMethodology
    _data: ClassVar[dict[str, Any]] = {
        "name": "Test Tool",
        "description": "Test Description",
    }


class TestSkillAdmin(AdminMixin):
    """Test suite for the Skill admin views."""

    _model = Skill
    _data: ClassVar[dict[str, Any]] = {
        "name": "Test Skill",
        "description": "Test Description",
    }

    def _create_object(self):
        """Overwrite to also create the Category for the Skill being changed."""
        competency_domain = CompetencyDomain.objects.create(
            **TestCompetencyDomainAdmin._data
        )
        competency = Competency.objects.create(
            competency_domain=competency_domain, **TestCompetencyAdmin._data
        )
        return Skill.objects.create(competency=competency, **self._data)


class TestSkillLevelAdmin(AdminMixin):
    """Test suite for the SkillLevel admin views."""

    _model = SkillLevel
    _data: ClassVar[dict[str, Any]] = {
        "name": "Test SkillLevel",
        "description": "Test Description",
        "level": 1,
        "short_description": "Short",
    }


class TestProfileAdmin(AdminMixin):
    """Test suite for the SkillProfile admin views."""

    _model = Profile


class TestTeamAdmin(AdminMixin):
    """Test suite for the Team admin views."""

    _model = Team
    _data: ClassVar[dict[str, Any]] = {
        "name": "Test Team",
        "description": "Test team description",
    }


@pytest.mark.django_db
def test_admin_explains_why_last_manager_user_cannot_be_deleted(
    admin_client, user
) -> None:
    """The user admin presents the manager invariant instead of a server error."""
    create_team(
        user=user, name="Protected admin user", description="Manager invariant test"
    )

    response = admin_client.get(f"/admin/main/user/{user.pk}/delete/")

    assert response.status_code == HTTPStatus.OK
    assert b"Protected admin user must retain at least one manager" in response.content


@pytest.mark.django_db
def test_admin_membership_role_change_synchronizes_permissions(
    admin_client, user, django_user_model
) -> None:
    """Changing a membership role in the admin updates team permissions."""
    manager = django_user_model.objects.create_user(username="admin-team-manager")
    team = create_team(user=manager, name="Admin team", description="Admin test team")
    membership = TeamMembership.objects.create(user=user, team=team)
    manager_membership = TeamMembership.objects.get(user=manager, team=team)

    response = admin_client.post(
        f"/admin/main/team/{team.pk}/change/",
        {
            "name": team.name,
            "description": team.description,
            "slug": team.slug,
            "members-TOTAL_FORMS": "2",
            "members-INITIAL_FORMS": "2",
            "members-MIN_NUM_FORMS": "0",
            "members-MAX_NUM_FORMS": "1000",
            "members-0-id": str(membership.pk),
            "members-0-user": str(user.pk),
            "members-0-manager": "on",
            "members-1-id": str(manager_membership.pk),
            "members-1-user": str(manager.pk),
            "members-1-manager": "on",
        },
    )

    assert response.status_code == HTTPStatus.FOUND
    user.refresh_from_db()
    assert user.has_perm("main.change_team", team)
    assert user.has_perm("main.manage_team_members", team)


@pytest.mark.django_db
def test_admin_can_replace_a_team_manager(
    admin_client, user, django_user_model
) -> None:
    """Admin promotes the replacement before demoting the current manager."""
    member = django_user_model.objects.create_user(username="replacement-manager")
    team = create_team(user=user, name="Manager handover", description="Admin test")
    manager_membership = TeamMembership.objects.get(team=team, user=user)
    member_membership = TeamMembership.objects.create(user=member, team=team)

    response = admin_client.post(
        f"/admin/main/team/{team.pk}/change/",
        {
            "name": team.name,
            "description": team.description,
            "slug": team.slug,
            "members-TOTAL_FORMS": "2",
            "members-INITIAL_FORMS": "2",
            "members-MIN_NUM_FORMS": "0",
            "members-MAX_NUM_FORMS": "1000",
            "members-0-id": str(manager_membership.pk),
            "members-0-user": str(user.pk),
            "members-1-id": str(member_membership.pk),
            "members-1-user": str(member.pk),
            "members-1-manager": "on",
        },
    )

    assert response.status_code == HTTPStatus.FOUND
    manager_membership.refresh_from_db()
    member_membership.refresh_from_db()
    assert not manager_membership.manager
    assert member_membership.manager
    user.refresh_from_db()
    member.refresh_from_db()
    assert not user.has_perm("main.manage_team_members", team)
    assert member.has_perm("main.manage_team_members", team)


@pytest.mark.django_db
def test_admin_replaces_membership_by_removing_and_adding(
    admin_client, user, django_user_model
) -> None:
    """The admin replaces a member without changing an existing identity."""
    former_member = django_user_model.objects.create_user(username="former-member")
    new_member = django_user_model.objects.create_user(username="new-member")
    team = create_team(
        user=user, name="Member reassignment", description="Admin permissions test"
    )
    manager_membership = TeamMembership.objects.get(team=team, user=user)
    membership = TeamMembership.objects.create(user=former_member, team=team)

    response = admin_client.post(
        f"/admin/main/team/{team.pk}/change/",
        {
            "name": team.name,
            "description": team.description,
            "slug": team.slug,
            "members-TOTAL_FORMS": "3",
            "members-INITIAL_FORMS": "2",
            "members-MIN_NUM_FORMS": "0",
            "members-MAX_NUM_FORMS": "1000",
            "members-0-id": str(manager_membership.pk),
            "members-0-user": str(user.pk),
            "members-0-manager": "on",
            "members-1-id": str(membership.pk),
            "members-1-user": str(former_member.pk),
            "members-1-DELETE": "on",
            "members-2-user": str(new_member.pk),
        },
    )

    assert response.status_code == HTTPStatus.FOUND
    former_member.refresh_from_db()
    new_member.refresh_from_db()
    assert not TeamMembership.objects.filter(pk=membership.pk).exists()
    assert TeamMembership.objects.filter(user=new_member, team=team).exists()
    assert not former_member.has_perm("main.view_team", team)
    assert new_member.has_perm("main.view_team", team)


@pytest.mark.django_db
def test_admin_renders_existing_membership_user_as_read_only(
    admin_client, user, django_user_model
) -> None:
    """Existing users appear as text; the empty form remains selectable."""
    team = create_team(
        user=user, name="Read-only member", description="Admin rendering test"
    )
    member = django_user_model.objects.create_user(username="read-only-member")
    TeamMembership.objects.create(user=member, team=team)

    response = admin_client.get(f"/admin/main/team/{team.pk}/change/")

    assert response.status_code == HTTPStatus.OK
    soup = BeautifulSoup(response.content, "html.parser")
    existing_user_cell = soup.select_one("#members-1 .field-user")
    assert existing_user_cell is not None
    assert existing_user_cell.get_text(strip=True) == member.username
    assert existing_user_cell.select_one("input, select") is None

    empty_user_cell = soup.select_one("#members-empty .field-user")
    assert empty_user_cell is not None
    assert empty_user_cell.select_one("select") is not None


@pytest.mark.parametrize("change", ["demote", "delete"])
@pytest.mark.django_db
def test_admin_cannot_remove_last_manager(admin_client, user, change) -> None:
    """The admin membership formset prevents a team from losing its manager."""
    team = create_team(
        user=user, name="Protected team", description="Admin invariant test"
    )
    membership = TeamMembership.objects.get(team=team, user=user)
    data = {
        "name": team.name,
        "description": team.description,
        "slug": team.slug,
        "members-TOTAL_FORMS": "1",
        "members-INITIAL_FORMS": "1",
        "members-MIN_NUM_FORMS": "0",
        "members-MAX_NUM_FORMS": "1000",
        "members-0-id": str(membership.pk),
        "members-0-user": str(user.pk),
    }
    if change == "delete":
        data["members-0-DELETE"] = "on"
    else:
        data["members-0-manager"] = ""

    response = admin_client.post(f"/admin/main/team/{team.pk}/change/", data)

    assert response.status_code == HTTPStatus.OK
    membership.refresh_from_db()
    assert membership.manager
    user.refresh_from_db()
    assert user.has_perm("main.manage_team_members", team)


class TestAdminExport:
    """Test admin import and export downloads."""

    def _export(self, admin_client, obj, format_name, fields=None, query=""):
        url = reverse(f"admin:main_{obj._meta.model_name}_export")
        model_admin = site.get_model_admin(type(obj))
        form = model_admin.get_export_form_class()(
            model_admin.get_export_formats(), model_admin.resource_classes
        )
        format_value = next(
            value
            for value, label in form.fields["format"].choices
            if label == format_name
        )
        selected_fields = {
            name: "on"
            for name, field in form.fields.items()
            if getattr(field, "is_selectable_field", False)
            and (fields is None or name in fields)
        }
        response = admin_client.post(
            url + query, {"resource": "0", "format": format_value, **selected_fields}
        )
        return response, form.resources[0]()

    @pytest.mark.parametrize(
        ("fixture_name", "name_field"),
        [
            ("competency", "name"),
            ("competency_domain", "name"),
            ("provider", "name"),
            ("learning_resource", "name"),
            ("tool", "name"),
            ("skill", "name"),
            ("skill_level", "name"),
            ("event", "title"),
        ],
    )
    def test_json_export_is_indented(
        self, admin_client, request, fixture_name, name_field
    ):
        """Download readable JSON with the same data as the standard export."""
        obj = request.getfixturevalue(fixture_name)
        name = "Unicode \u00e9"
        setattr(obj, name_field, name)
        obj.description = 'Line one\n"Line two"'
        obj.save()

        response, resource = self._export(admin_client, obj, "json")

        assert response.status_code == HTTPStatus.OK
        assert response["Content-Type"].startswith("application/json")
        assert response["Content-Disposition"].endswith('.json"')
        expected = json.loads(base_formats.JSON().export_data(resource.export()))
        assert len(expected) == 1
        assert expected[0][name_field] == name
        assert expected[0]["description"] == 'Line one\n"Line two"'
        assert response.content.decode() == json.dumps(
            expected, indent=2, ensure_ascii=False
        )

    def test_json_export_respects_field_and_queryset_selection(
        self, admin_client, competency
    ):
        """Preserve selected fields and the admin's search filter."""
        Competency.objects.create(
            name="Different",
            description="Other",
            competency_domain=competency.competency_domain,
        )

        response, _ = self._export(
            admin_client,
            competency,
            "json",
            fields={"competencyresource_name"},
            query="?q=Competency",
        )

        assert response.status_code == HTTPStatus.OK
        assert response.json() == [{"name": competency.name}]

    def test_csv_export_is_unchanged(self, admin_client, competency):
        """Keep the other export formats unchanged."""
        response, resource = self._export(admin_client, competency, "csv")

        assert response.status_code == HTTPStatus.OK
        assert response.content.decode() == base_formats.CSV().export_data(
            resource.export()
        )

    def test_formatted_json_can_be_imported(
        self, admin_client, competency_domain, settings
    ):
        """Allow the downloaded JSON to be imported back through the admin."""
        response, _ = self._export(admin_client, competency_domain, "json")
        assert response.status_code == HTTPStatus.OK
        original_name = competency_domain.name
        competency_domain.name = "Changed name"
        competency_domain.save()

        settings.IMPORT_EXPORT_SKIP_ADMIN_CONFIRM = True
        url = reverse("admin:main_competencydomain_import")
        model_admin = site.get_model_admin(CompetencyDomain)
        format_value = next(
            str(index)
            for index, file_format in enumerate(model_admin.get_import_formats())
            if file_format().get_title() == "json"
        )
        response = admin_client.post(
            url,
            {
                "resource": "0",
                "format": format_value,
                "import_file": SimpleUploadedFile(
                    "domain.json", response.content, content_type="application/json"
                ),
            },
        )

        assert response.status_code == HTTPStatus.FOUND
        competency_domain.refresh_from_db()
        assert competency_domain.name == original_name
