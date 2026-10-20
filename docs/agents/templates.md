# Templates and styling

This guide covers Django templates and styling, including the stylesheet build
boundary. JavaScript implementation and visualization architecture are outside
its scope.

## Template composition

Templates live in `main/templates/`. Choose the existing base for the page type:

- `main/base.html` supplies the shared HTML shell and global includes.
- `main/base.page.html` supplies standard content-page layout and breadcrumbs.
- `main/base.account.html` supplies the account layout.
- `main/base.auth.html` supplies the authentication layout.

Match the relevant base's blocks instead of copying the page shell. Reuse
`main/templates/main/snippets/` for shared markup. Preserve existing exceptions
without spreading them into new pages or refactoring them during unrelated work.

Keep business rules in Python; templates render the context supplied by views and
context processors. The project context processors include `site_title`.
Coordinate view context, form layout, and template changes, using the shared
view-test helpers described in [Testing](testing.md).

Use Django URL reversing for application links and the `static` template tag for
static assets, following nearby templates.

## Forms

Use the existing Django forms and crispy-forms integration with Bootstrap 5.
Follow the relevant form's established `FormHelper` and layout pattern rather than
creating a second rendering approach. Existing templates use `{{ form|crispy }}`
or `{% crispy form %}` as appropriate to the form.

Keep CSRF protection in POST forms and preserve validation errors and submitted
values when changing markup. Put input validation and form-driven save behavior
in the form, not in template conditionals.

## Bootstrap first

Use existing Bootstrap 5 components, grid, and utility classes. Edit SCSS only
when the required styling is absolutely unavoidable with the existing Bootstrap
and theme facilities.

If custom styling is necessary, work in the source pipeline under
`node/src/scss/`; project overrides belong in `_user.scss`, imported by
`theme.scss`. Generate the assets under `main/static/assets/css/` through the build
pipeline rather than editing generated CSS.

Existing inline loading-screen CSS in `main/templates/main/snippets/head.html`
is an exception to preserve, not a pattern for new styling.

## Responsive and accessible markup

For new or changed markup:

- Preserve Bootstrap breakpoint behavior, including account navigation and
  offcanvas layouts. Check the affected layout at narrow and wide widths.
- Use semantic HTML and associate labels with form controls, including controls
  whose labels are visually hidden.
- Give images useful alternative text; use empty alternative text for decorative
  images.
- Follow existing navigation and control patterns for accessible names and ARIA,
  such as breadcrumb labels and current-page markers.

These are contribution expectations for changed markup, not a new audit
toolchain or a repository-wide remediation task.

## Formatting and validation

Run the configured `djlint-django` and `djlint-reformat-django` pre-commit hooks
for changed templates. Use `pyproject.toml` as the authority for djlint rules and
existing exceptions; do not add a separate formatting convention.

For unavoidable SCSS changes, use the existing stylesheet scripts:

```bash
npm run styles:expanded
npm run styles:minified
```

These scripts lint SCSS with Stylelint before compiling the theme. Stylelint
rules live in `.stylelintrc.json`. The broader `npm run build` also builds
JavaScript and is not a CSS-only check.

Inspect any generated stylesheet changes, exercise affected templates with the
pytest view helpers, and visually check responsive or styling changes where
applicable. Follow the full-suite handover requirement in [Testing](testing.md).
