# Domain docs

Before framework or self-assessment work, read the
[DIRECT glossary](../../GLOSSARY.md). It contains the minimal local definitions;
its upstream links provide optional detail. Use its vocabulary in code, tests
and documentation.

The upstream DIRECT framework defines framework terminology and content.
For current webapp relationships and behaviour, inspect the relevant code:
[framework models](../../main/models/framework_models.py) and
[personal assessments](../../main/models/user_models.py) are starting points.
If upstream documentation and the implementation differ, surface the difference
before proposing a behavioural change.

This repo uses one root glossary. Keep it limited to domain definitions.
Read relevant decisions in `docs/adr/` if that directory exists, and flag
conflicts with those decisions explicitly.
