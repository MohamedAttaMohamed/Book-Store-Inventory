# Decisions Log

## Phase 1

### D-001: v2 spec not yet available
**Decision:** Proceeding with Phase 1 (foundation/infrastructure) which does not depend on the v2 spec's business rules, database schema, or module details. The v2 spec will be needed starting Phase 2.
**Rationale:** Phase 1 is about tooling, monorepo structure, shared helpers, config, logger, error types, DB client, event bus, and the `/health` endpoint — none of which require the v2 spec.

### D-002: Fastify chosen over Express
**Decision:** Using Fastify as the backend framework.
**Rationale:** The build guide says "Fastify (preferred) or Express". Fastify is explicitly preferred, offers better performance, built-in validation hooks, and type-safe request/reply.

### D-003: Minimal Prisma schema for Phase 1
**Decision:** The Prisma schema in Phase 1 contains only `AppSetting` for health-check / DB connectivity verification. Full domain models (Product, Invoice, StockLog, User, etc.) will be added in Phase 2 per the v2 spec.
**Rationale:** Phase 1 acceptance is about infrastructure, not domain logic. Building the full schema without the v2 spec risks inventing requirements.

### D-004: ESLint flat config (eslint.config.js)
**Decision:** Using ESLint flat config format instead of `.eslintrc.cjs`.
**Rationale:** ESLint 9.x defaults to flat config. The build guide's repo structure mentions `.eslintrc.cjs` but this is a cosmetic naming difference; flat config is the modern standard and will be maintained longer.

### D-005: Desktop Electron app deferred for full verification
**Decision:** The desktop Electron main process and preload scripts are scaffolded in Phase 1 but the Electron binary itself is not run as part of `pnpm verify` (only build/typecheck). Full Electron integration testing is Phase 8.
**Rationale:** Electron requires a display environment and native modules that complicate CI. Phase 1 acceptance says "app opens a window showing a health-checked ready screen" — this will be manually verified.
