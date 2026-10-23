# Agent context

These guides cover Python/Django, Django templates, and styling. JavaScript
architecture is outside their scope.

Before changing application code, read [Django architecture](docs/dev-guide/architecture.md)
and [Development conventions](docs/dev-guide/development.md).

- For tests, behavior changes, or validation before handover, read
  [Testing](docs/dev-guide/testing.md).
- For templates, forms rendered as HTML, or styling, also read
  [Templates and styling](docs/dev-guide/templates.md).

Keep changes scoped to the request and preserve existing behavior unless a change
is agreed. Discuss new dependencies and substantial architectural changes first.

## Domain docs

Before framework or self-assessment work, read the
[DIRECT glossary](GLOSSARY.md). It contains the minimal local definitions;
its upstream links provide optional detail. Use its vocabulary in code, tests
and documentation.

The upstream DIRECT framework defines framework terminology and content.
For current webapp relationships and behaviour, inspect the relevant code:
[framework models](main/models/framework_models.py) and
[personal assessments](main/models/user_models.py) are starting points.
If upstream documentation and the implementation differ, surface the difference
before proposing a behavioural change.

This repo uses one root glossary. Keep it limited to domain definitions.
Read relevant decisions in `docs/adr/` if that directory exists, and flag
conflicts with those decisions explicitly.
