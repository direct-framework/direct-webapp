# Django architecture

This guide distinguishes the current structure from the intended defaults for
contributions. It covers the server-side application; see
[Templates and styling](templates.md) for its presentation layer.

## Current structure

DIRECT is a Django project with a single application, `main`.

| Location | Responsibility |
| --- | --- |
| `direct_webapp/settings/` | Project settings, including environment-specific settings. |
| `direct_webapp/urls.py` | Project routing, delegating application routes to `main.urls`. |
| `direct_webapp/context_processors.py` | Shared template context, including the site title. |
| `main/models/framework_models.py` | The competency framework's models. |
| `main/models/user_models.py` | The custom user model and user-specific skill assessments. |
| `main/models/community_models.py` | Community content, including events. |
| `main/views/` | Views grouped by page, account, and data concerns. |
| `main/forms.py` | Input validation, form-driven updates, and crispy-form layouts. |
| `main/urls.py` | Named application routes grouped by concern. |
| `main/tables.py` | Django Tables definitions. |
| `main/io_resources.py` | Import/export resource definitions. |
| `main/templates/` | Django templates and reusable snippets. |
| `tests/` | Pytest tests, fixtures, and shared view-testing helpers. |

Read the relevant modules before choosing where a change belongs. The current
application does not have a mandatory service or repository layer.

## Domain orientation

The framework describes skills and their levels. A user's self-assessment is
separate from that shared framework data: `UserSkill` associates a user, a skill,
and a skill level.

The configured authentication model is `main.User`. Account views use the current
request's user for personal data. Existing access behavior includes authentication
and terms acceptance through `TermsAcceptedMixin`; inspect the relevant view and
its tests before extending that behavior.

## Defaults for new and changed code

- Extend `main` and its existing module groups by default. Discuss a genuinely
  separate domain boundary before introducing another Django application.
- Keep reusable domain rules and queries with models and querysets. Use forms for
  input validation and form-driven saves. Keep views focused on HTTP handling and
  orchestration.
- Extract a small service when an operation genuinely spans those boundaries or
  needs reuse that does not fit them. A simple flow does not need an extra layer
  merely for architectural symmetry.
- Prefer the narrowest suitable Django generic class-based view and reuse existing
  access-control mixins. A function-based view is acceptable when clearly simpler.
- Preserve existing behavior and public contracts unless the task explicitly
  changes them. Check affected URLs, forms, templates, data responses, and tests
  together rather than treating a Python module as an isolated surface.

Existing code is evidence of local patterns, not automatic endorsement of every
implementation choice. Follow these agreed defaults for changed code without
turning a feature or fix into an unrelated refactor. This guide intentionally
does not introduce a new persistence policy; inspect existing model constraints,
validation, and form-save behavior when working in that area.
