# نقطة بيع القرطاسية — Stationery POS & Inventory System

A fast, offline, single-machine POS and inventory desktop app for a stationery store. Arabic (RTL) first, English fallback.

## Tech Stack

- **TypeScript** (strict) everywhere
- **Electron** desktop shell
- **React 18** + Vite + Tailwind CSS (frontend)
- **Fastify** + Prisma + SQLite (backend)
- **pnpm** workspaces monorepo

## Quick Start

### Prerequisites

- Node.js ≥ 22
- pnpm ≥ 9

### Setup

```bash
# Clone the repository
git clone https://github.com/MohamedAttaMohamed/Book-Store-Inventory.git
cd Book-Store-Inventory

# Install dependencies
pnpm install

# Generate Prisma client
pnpm --filter server exec prisma generate

# Run database migrations
pnpm --filter server exec prisma migrate dev

# Start development
pnpm dev:server   # Backend on http://127.0.0.1:3001
pnpm dev:web      # Frontend on http://localhost:5173
```

### Verify (lint + typecheck + test + build)

```bash
pnpm verify
```

## Project Structure

```
stationery-pos/
├─ docs/              # Build guide, decisions log, progress
├─ apps/
│  ├─ desktop/        # Electron main + preload
│  ├─ server/         # Fastify backend + Prisma
│  └─ web/            # React + Vite frontend
├─ packages/
│  └─ shared/         # Zod schemas, enums, money/stock/date helpers
└─ package.json
```

## Build Phases

- [x] Phase 1 — Foundation (monorepo, tooling, shared helpers, /health, Electron shell)
- [ ] Phase 2 — Database & Domain Core
- [ ] Phase 3 — Auth, Users, Settings
- [ ] Phase 4 — Catalog & Inventory
- [ ] Phase 5 — POS & Sales
- [ ] Phase 6 — Returns
- [ ] Phase 7 — Dashboard & Reports
- [ ] Phase 8 — Backup, Hardening & Packaging

## License

Private — All rights reserved.
