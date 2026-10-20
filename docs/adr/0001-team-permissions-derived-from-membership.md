---
status: accepted
---

# Team permissions are derived from membership

Team membership, including the manager flag, is the single source of truth for
who belongs to a team and who manages it. django-guardian object permissions on
`Team` are a derived projection of membership. They are recomputed whenever a
membership is saved or deleted, and are never edited directly. We still use
guardian because it gives us the standard `has_perm(perm, team)` API,
`get_objects_for_user` querying and admin tooling for future views. Keeping
membership as the authority means a person's role is recorded in only one place.

## Considered Options

- **Guardian as the source of truth (drop the manager flag):** rejected. Roles
  would become implicit in permission rows, so the question "is Alice a
  manager?" turns into a permissions query. It also makes the
  at-least-one-manager rule awkward to enforce.
- **Custom auth backend computing permissions from membership:** rejected. There
  would be nothing to sync, but we would lose guardian's object querying and
  admin integration, and have to rebuild them ourselves.
- **Per-team guardian groups (members and managers):** rejected. Group
  membership would duplicate team membership and could drift from it.

## Consequences

- Permissions are assigned to individual users and stored in guardian's
  direct-foreign-key tables for `Team`. These rows cascade when a team or user is
  deleted. The generic-foreign-key tables would leave orphaned rows that could
  attach to a later team that reuses the same ID.
- Sync relies on model signals, so code must not change memberships with
  queryset `update()`, `bulk_create` or bulk delete, because those bypass the
  signals.
- Existing memberships are backfilled by a data migration.
- Views should check `has_perm` on the team rather than reading the manager flag,
  so access rules live in one place.
