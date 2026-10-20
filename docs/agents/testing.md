# Testing

All Python tests use pytest. Test code independent of Django with conventional
pytest unit tests. Use pytest-django fixtures and database support for Django
behavior. Do not use Django `TestCase` or its subclasses.

## Organization and fixtures

Follow the existing `tests/` layout and nearby tests for the component being
changed. Shared user fixtures live in `tests/conftest.py`, including users with
different terms-acceptance states.

Reuse appropriate fixtures rather than constructing a parallel setup pattern.
Database tests use pytest-django's database fixtures or `django_db` marker.
Add or update focused tests for changed behavior; a successful response alone
does not establish that a form saved the right data or a download has the right
contents.

## Shared view-test helpers

Use the base classes in `tests/main/view_utils.py` for view tests wherever
appropriate. Import them from that module, not indirectly through another test
module.

| Helper | Contract | Coverage provided |
| --- | --- | --- |
| `TemplateOkMixin` | Supply `_template_name` and `_get_url(self)`. | An admin-client GET uses the expected template and returns HTTP 200. |
| `LoginRequiredMixin` | Supply `_get_url(self)`. | An anonymous GET redirects to the login URL with the expected `next` parameter. |
| `BS4Mixin` | Supply `_get_url(self, **kwargs)`. | BeautifulSoup fixtures for inspecting anonymous, authenticated-user, and admin responses. |
| `tag_with_text_filter` | Supply a tag name and text. | A predicate for locating matching HTML elements. |

Compose the relevant mixins rather than requiring every view test to use all of
them. For examples, see `tests/main/test_main_views.py` and
`tests/main/test_registration_views.py`.

The BeautifulSoup fixtures include `soup`, `auth_soup`, and `admin_soup`, with
`soup_factory` for parameterized requests. They help retrieve and parse HTML;
the test still needs to assert the relevant content.

These helpers are a starting point, not complete behavioral coverage. Add
view-specific assertions for the behavior being changed, such as context values,
POST validation and saves, redirects, emails, download payloads and headers, or
access rules beyond anonymous login redirection. For download examples, see
`tests/main/test_account_data_views.py`.

## Running tests

During development, use the smallest relevant selection, for example:

```bash
pytest tests/main/test_forms.py
pytest tests/main/test_registration_views.py tests/main/test_account_data_views.py
```

Before every handover of Python/Django changes, run the full Python suite:

```bash
pytest
```

The project-level pytest configuration already supplies the Django settings
module, coverage reporting, doctest collection, and collection exclusions. Keep
those defaults when selecting tests. Coverage and a small green selection do not
replace the full-suite handover requirement.

Run the applicable lint, formatting, and type checks too; see
[Development conventions](development.md). Report exact commands and results,
including any blocker to running the full suite.
