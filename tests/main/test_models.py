"""Test suite for the main app models."""

import pytest
from django.core.exceptions import ValidationError

from main.models import Category, NamedModel, Skill, SkillLevel, SluggedModel, UserSkill


@pytest.fixture
def parent_category() -> Category:
    """Fixture for creating a Parent Category instance."""
    return Category.objects.create(
        name="Parent Category", description="A parent category"
    )


@pytest.fixture
def sub_category(parent_category: Category) -> Category:
    """Fixture for creating a Subcategory instance."""
    return Category.objects.create(
        name="Subcategory", description="A subcategory", parent_category=parent_category
    )


@pytest.fixture
def skill(sub_category: Category) -> Skill:
    """Fixture for creating a Subcategory instance."""
    return Skill.objects.create(
        name="Skill", description="A skill", category=sub_category
    )


@pytest.fixture
def skill_level() -> SkillLevel:
    """Fixture for creating a SkillLevel instance."""
    return SkillLevel.objects.create(
        level=1, name="Beginner", description="Beginner level"
    )


@pytest.fixture
def user_skill(user, skill: Skill, skill_level: SkillLevel) -> UserSkill:
    """Fixture for creating a UserSkill instance."""
    return UserSkill.objects.create(user=user, skill=skill, skill_level=skill_level)


def test_named_model() -> None:
    """Test the abstract NamedModel provides correct behaviour to children."""

    class TestModel(NamedModel):
        class Meta:
            app_label = "test_abstract_model"

    instance = TestModel(name="Test Name", description="Test Description")
    assert instance.name == str(instance) == "Test Name"
    assert instance.description == "Test Description"


def test_slugged_model(mocker) -> None:
    """Test the abstract SluggedModel provides correct behaviour to children."""

    class TestModel(SluggedModel):
        class Meta:
            app_label = "test_abstract_model"

    instance = TestModel(name="Test Name", description="Test Description")
    assert instance.name == str(instance) == "Test Name"
    assert instance.description == "Test Description"
    assert instance.slug is None

    # Test save method to auto-generate slug
    mock_save = mocker.patch.object(NamedModel, "save", autospec=True)
    instance.save()
    assert instance.slug == "test-name"
    mock_save.assert_called_once()


@pytest.mark.django_db
def test_category_model(parent_category: Category, sub_category: Category) -> None:
    """Test the Category model."""
    assert isinstance(parent_category, SluggedModel)
    assert parent_category.name == str(parent_category) == "Parent Category"
    assert parent_category.description == "A parent category"
    assert parent_category.slug == "parent-category"
    assert parent_category.parent_category is None

    assert isinstance(sub_category, SluggedModel)
    assert sub_category.name == str(sub_category) == "Subcategory"
    assert sub_category.description == "A subcategory"
    assert sub_category.slug == "subcategory"
    assert sub_category.parent_category == parent_category


@pytest.mark.django_db
def test_category_clean(parent_category: Category, sub_category: Category) -> None:
    """Test the clean method of the Category model."""
    # Test that a category cannot be its own parent
    sub_category.parent_category = sub_category
    with pytest.raises(ValidationError, match=r"A category cannot be its own parent."):
        sub_category.clean()

    parent_category.parent_category = sub_category
    # Test that a parent category with subcategories cannot be made a subcategory
    with pytest.raises(
        ValidationError,
        match=r"This is a parent category so can't be made into a subcategory.",
    ):
        parent_category.clean()


@pytest.mark.django_db
def test_skill_model(skill: Skill, sub_category: Category) -> None:
    """Test the Skill model."""
    assert isinstance(skill, SluggedModel)
    assert skill.name == str(skill) == "Skill"
    assert skill.description == "A skill"
    assert skill.slug == "skill"
    assert skill.category is sub_category


@pytest.mark.django_db
def test_skill_clean(skill: Skill, parent_category: Category) -> None:
    """Test the Skill model."""
    skill.category = parent_category

    with pytest.raises(
        ValidationError, match=r"The category cannot be a top-level category."
    ):
        skill.clean()


@pytest.mark.django_db
def test_skill_level_model(skill_level: SkillLevel) -> None:
    """Test the SkillLevel model."""
    assert skill_level.level == 1
    assert skill_level.name == "Beginner"
    assert skill_level.description == "Beginner level"

    # Test validation for unique level
    skill_level = SkillLevel(level=1, name="Beginner", description="Beginner level")
    with pytest.raises(
        ValidationError, match=r"Skill level with this Level already exists."
    ):
        skill_level.full_clean()


@pytest.mark.django_db
def test_user_skill_model(
    user_skill: UserSkill, user, skill: Skill, skill_level: SkillLevel
) -> None:
    """Test the UserSkill model."""
    assert user_skill.user == user
    assert user_skill.skill == skill
    assert user_skill.skill_level == skill_level

    new_skill_level = SkillLevel.objects.create(
        level=2, name="Intermediate", description="Intermediate level"
    )

    new_user_skill = UserSkill(user=user, skill=skill, skill_level=new_skill_level)
    with pytest.raises(
        ValidationError, match=r"User skill with this User and Skill already exists."
    ):
        new_user_skill.full_clean()
