# Development conventions

Use the repository configuration as the authority for tool versions and exact
rules. This guide records contribution expectations rather than duplicating
configuration.

## Environment and tooling

Follow the root `README.md` for environment setup and running the application.
The Python version requirement and dependency groups live in `pyproject.toml`.
Runtime, development, production, and documentation requirements are compiled
into the corresponding requirements files; follow their generation headers when
updating them rather than hand-editing generated pins.

Discuss adding a dependency before changing the dependency declarations.

| Tool | Purpose and authoritative configuration |
| --- | --- |
| Ruff | Python linting, import ordering, and formatting; `pyproject.toml` and `.pre-commit-config.yaml`. |
| Mypy with Django stubs | Static typing; `[tool.mypy]` and `[tool.django-stubs]` in `pyproject.toml`. |
| Pytest and pytest-django | Unit and Django behavior tests; `[tool.pytest.ini_options]` in `pyproject.toml`. |
| Pre-commit | Configured Python, template, Markdown, spelling, and file checks; `.pre-commit-config.yaml`. |
| Djlint | Django template linting and formatting; `pyproject.toml` and the pre-commit hooks. |
| MkDocs | Documentation build and navigation; `mkdocs.yml`. |

Template and stylesheet tooling is described in
[Templates and styling](templates.md).

## Python style

- Add type annotations to new or changed application interfaces. Match existing
  Django typing patterns and preserve useful type information instead of
  bypassing checks.
- Use useful Google-style docstrings for modules, classes, and functions, following
  the configured Ruff rules. Explain behavior and non-obvious contracts rather
  than restating the implementation.
- Match nearby test conventions; application and test typing requirements differ
  in the mypy configuration.
- Let Ruff handle formatting and import ordering. Keep annotation, documentation,
  and formatting work scoped to the change instead of cleaning up unrelated code.

Use [Django architecture](architecture.md) for code placement, and
[Testing](testing.md) for test design and the required validation workflow.

## Checks and handover

Run commands from the repository root in the configured development environment.
For changed files, invoke the configured checks with their actual paths, for
example:

```bash
pre-commit run --files main/forms.py tests/main/test_forms.py
mypy .
```

Pre-commit hooks can modify files. Inspect their changes and rerun affected checks
until they pass. Use the relevant checks for the files being changed rather than
adding a parallel set of style rules.

Before handing over Python/Django changes, run the full Python test suite as
specified in [Testing](testing.md), as well as applicable configured checks.
Update directly related documentation and examples for feature changes, following
`CONTRIBUTING.md`.

For documentation changes, run the relevant Markdown/spelling checks and the
documentation build:

```bash
mkdocs build --strict
```

At handover, report the commands run and their results, including failures or
checks that could not run. Distinguish a pre-existing failure from one introduced
by the change; an unrun check is not a passing check.
