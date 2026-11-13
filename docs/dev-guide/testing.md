# Testing

All Python tests use pytest. Test code independent of Django with conventional
pytest unit tests. Use pytest-django fixtures and database support for Django
behavior. Do not use Django `TestCase` or its subclasses.

## Organization and fixtures

Follow the existing `tests/` layout and nearby tests for the component being
changed. Place each test by the layer it exercises, not by the feature it
belongs to:

| Layer under test | Test module |
| --- | --- |
| Views (HTTP behavior) | `tests/main/views/test_<area>_views.py`; page, account, and team views use `test_page_views.py`, `test_account_views.py`, and `test_team_views.py`. |
| Admin pages | `tests/main/views/test_admin_views.py`; give each admin model a `Test<Model>Admin(AdminMixin)` class and add behavior tests beside it. |
| Services (`main/<area>_services.py`) | `tests/main/test_<area>_services.py` |
| Models, managers and querysets | `tests/main/models/test_<area>_models.py` |
| Forms, tables, import/export resources | `tests/main/test_forms.py`, `tests/main/test_tables.py`, `tests/main/test_io_resources.py` |
| Data migrations | `tests/main/migrations/test_<area>_migrations.py` |

Add a new module only when no existing module covers that layer and area.

Shared user fixtures live in `tests/conftest.py`, including users with
different terms-acceptance states.

Reuse appropriate fixtures rather than constructing a parallel setup pattern.
Database tests use pytest-django's database fixtures or `django_db` marker.
Add or update focused tests for changed behavior; a successful response alone
does not establish that a form saved the right data or a download has the right
contents.

## Shared view-test helpers

Use the base classes in `tests/main/views/view_utils.py` for view tests wherever
appropriate. Import them from that module, not indirectly through another test
module.

| Helper | Contract | Coverage provided |
| --- | --- | --- |
| `TemplateOkMixin` | Supply `_template_name` and `_get_url(self)`. | An admin-client GET uses the expected template and returns HTTP 200. |
| `LoginRequiredMixin` | Supply `_get_url(self)`. | An anonymous GET redirects to the login URL with the expected `next` parameter. |
| `BS4Mixin` | Supply `_get_url(self, **kwargs)`. | BeautifulSoup fixtures for inspecting anonymous, authenticated-user, and admin responses. |
| `tag_with_text_filter` | Supply a tag name and text. | A predicate for locating matching HTML elements. |

Compose the relevant mixins rather than requiring every view test to use all of
them. For examples, see `tests/main/views/test_page_views.py` and
`tests/main/views/test_registration_views.py`.

The BeautifulSoup fixtures include `soup`, `auth_soup`, and `admin_soup`, with
`soup_factory` for parameterized requests. They help retrieve and parse HTML;
the test still needs to assert the relevant content.

These helpers are a starting point, not complete behavioral coverage. Add
view-specific assertions for the behavior being changed, such as context values,
POST validation and saves, redirects, emails, download payloads and headers, or
access rules beyond anonymous login redirection.

## Running tests

During development, use the smallest relevant selection, for example:

```bash
pytest tests/main/test_forms.py
pytest tests/main/views/test_registration_views.py tests/main/views/test_account_data_views.py
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
