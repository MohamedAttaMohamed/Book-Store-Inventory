# ANTIGRAVITY BUILD GUIDE — Stationery POS & Inventory System

> **How to use this file:** Put this file and `Stationery_POS_Inventory_System_Specification_v2.md` in the project's `/docs` folder. The v2 spec is the **source of truth for business rules, database schema, modules, and the receipt**. This guide is the source of truth for **architecture, code quality, design, process, and acceptance**. If the two ever conflict, stop and ask; never guess.

---

## 0. Agent Operating Rules (read first)

1. **Work in phases** (Section 12). Finish and verify a phase completely before starting the next. Never skip ahead.
2. **After every phase:** run `pnpm lint`, `pnpm typecheck`, `pnpm test`, and `pnpm build`. All must pass with **zero errors and zero warnings** before continuing.
3. **Never invent requirements.** If something is unclear, choose the simplest option consistent with the v2 spec and record it in `docs/DECISIONS.md`.
4. **No placeholder code.** No `TODO`, no `// implement later`, no mocked data in production code paths, no `any`, no `@ts-ignore`.
5. **Money is `Int` piastres, stock is `Int` pieces, dates are UTC.** Violations are bugs.
6. **Every stock change goes through the single `StockService`** inside a database transaction. No other code may update stock columns directly.
7. **Commit small and often** with conventional commits (`feat:`, `fix:`, `test:`, `chore:`).
8. When finished with a phase, write a short entry in `docs/PROGRESS.md` (what was built, how it was verified, known limitations).

---

## 1. Product Summary

A fast, offline, **single-machine** POS and inventory desktop app for one stationery store. Multi-unit inventory (Piece/Packet), barcode-driven cashier screen, admin dashboard, restocking, returns, reports, backup, and an 80mm Arabic receipt. Arabic (RTL) is the default language; English is the fallback.

**Primary users:** a cashier (speed, no mistakes) and the owner/admin (accurate numbers, control).

---

## 2. Architecture Principles

- **Modular monolith.** One deployable app, strictly separated feature modules with explicit boundaries.
- **Layered, with dependencies pointing inward:** `UI → API client → HTTP routes → Services (business logic) → Repositories → Prisma/SQLite`
- **Business logic lives only in services** (pure, testable). Routes validate input and call services. Repositories only talk to the database.
- **Single source of truth for types and validation:** shared Zod schemas in `packages/shared`.
- **Explicit boundaries:** a module may import another module only through its public `index.ts`.
- **Scalability path (built in, not over-engineered):** Database access only through repositories; Stateless HTTP API with `/api/v1`; Domain events decouple side effects.
- **YAGNI guard:** do not add features the spec does not require.

---

## 3. Technology Stack (locked)

| Concern | Choice |
|---|---|
| Language | TypeScript (strict) everywhere |
| Package manager / monorepo | pnpm workspaces |
| Desktop shell | Electron + `electron-builder` (Windows installer) |
| Frontend | React 18 + Vite + Tailwind CSS + Lucide Icons |
| Client state | TanStack Query (server state) + Zustand (cart/UI state) |
| Forms & validation | React Hook Form + Zod (`@hookform/resolvers`) |
| Routing | React Router |
| Backend | Node.js + Fastify, bound to `127.0.0.1` |
| ORM / DB | Prisma + SQLite (WAL mode, `foreign_keys=ON`) |
| Auth | bcrypt password hashing + short-lived signed token |
| Logging | pino (file rotation in user data folder) |
| Testing | Vitest (unit/integration), Playwright (end-to-end), Testing Library (components) |
| Lint/format | ESLint (strict, with import-boundary rules) + Prettier |
| Excel | `exceljs` (import/export) |

---

## 12. Phased Build Plan with Acceptance Criteria

**Phase 1 — Foundation** ← CURRENT
Monorepo, tooling (TS strict, ESLint, Prettier, Vitest), `packages/shared`, config, logger, error types, DB client, `withTransaction`, event bus, `/health`, Electron shell that launches server + window.
*Done when:* `pnpm verify` passes; app opens a window showing a health-checked "ready" screen.

**Phase 2 — Database & Domain Core**
**Phase 3 — Auth, Users, Settings**
**Phase 4 — Catalog & Inventory**
**Phase 5 — POS & Sales**
**Phase 6 — Returns**
**Phase 7 — Dashboard & Reports**
**Phase 8 — Backup, Hardening & Packaging**
