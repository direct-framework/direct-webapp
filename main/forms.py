"""Forms module for the main app."""

from typing import TYPE_CHECKING

from django.contrib.auth import get_user_model
from django.contrib.auth.forms import UserCreationForm

if TYPE_CHECKING:
    from .models import User as UserType

User = get_user_model()


class CustomUserCreationForm(UserCreationForm["UserType"]):
    """Custom user creation form."""

    class Meta(UserCreationForm.Meta):  # type: ignore[name-defined]
        """Form metadata."""

        model = User
        fields = UserCreationForm.Meta.fields  # type: ignore[attr-defined]

    def save(self, commit: bool = True) -> "UserType":
        """Save user."""
        # Save the provided password in hashed format
        user = super().save(commit=False)
        user.set_password(self.cleaned_data["password1"])
        if commit:
            user.save()
        return user
