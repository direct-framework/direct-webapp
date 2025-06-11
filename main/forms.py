"""Forms module for the main app."""

from django.contrib.auth.forms import UserCreationForm

from .models import User


class CustomUserCreationForm(UserCreationForm[User]):
    """Custom user creation form."""

    class Meta(UserCreationForm.Meta):  # type: ignore[name-defined]
        """Form metadata."""

        model = User
        fields = UserCreationForm.Meta.fields  # type: ignore[attr-defined]

    def save(self, commit: bool = True) -> User:
        """Save user."""
        # Save the provided password in hashed format
        user = super().save(commit=False)
        user.set_password(self.cleaned_data["password1"])
        if commit:
            user.save()
        return user
