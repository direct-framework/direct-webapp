"""Unicorn component for rendering a competency wheel."""

import json
from pathlib import Path
from typing import Any

from django_unicorn.components import UnicornView

from ..models import (
    SkillLevel,
)


def _extract_and_combine_roles(
    sample_data_files: list[str | Path],
) -> list[dict[str, Any]]:
    """Read and combine multiple JSON files with sample user data."""
    combined_sample_data = []
    for file_path in sample_data_files:
        json_path = Path(file_path)
        if json_path.exists():
            with json_path.open() as f:
                data = json.load(f)
                if isinstance(data, list):
                    combined_sample_data.extend(data)
                else:
                    combined_sample_data.append(data)
    return combined_sample_data


class SkillWheelView(UnicornView):
    """Render skill profile chart data in the browser."""

    chart_data: list[dict[str, Any]]
    skill_levels: list[dict[str, Any]]

    def mount(self) -> None:
        """Load chart data and skill levels passed by the parent template."""
        if "profile_sample_id" in self.component_kwargs:
            self._load_sample(self.component_kwargs["profile_sample_id"])
        else:
            self.chart_data = self._load_list("chart_data")
            self.skill_levels = self._load_list("skill_levels")
        self.call("reloadSkillWheel")

    def _load_sample(self, sample_id: str):
        sample_data = _extract_and_combine_roles(
            [f"main/static/assets/sample_data/{sample_id}.json"]
        )
        self.chart_data = sample_data
        self.skill_levels = list(SkillLevel.objects.values("level", "name"))

    def _load_list(self, key: str) -> list[dict[str, Any]]:
        """Read a list-valued component argument, decoding JSON strings."""
        try:
            value: Any = self.component_kwargs[key]
        except KeyError as exc:
            raise ValueError(f"Missing required component argument: {key}") from exc

        if isinstance(value, str):
            value = json.loads(value)

        if value is None:
            return []

        if not isinstance(value, list) or not all(
            isinstance(item, dict) for item in value
        ):
            raise TypeError(f"Component argument {key} must be a list of objects")

        return value

    def set_profile_id(self, profile_id: str) -> None:
        """Set the profile ID and reload the sample data."""
        self._load_sample(profile_id)
        self.call("reloadSkillWheel")
