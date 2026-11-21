# Dockerfile for full-stack deployment (Web + API Server)
FROM node:22-alpine AS builder

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@9.15.9 --activate

COPY pnpm-lock.yaml pnpm-workspace.yaml package.json tsconfig.base.json .npmrc ./
COPY packages/shared/package.json ./packages/shared/
COPY apps/server/package.json ./apps/server/
COPY apps/web/package.json ./apps/web/
COPY apps/desktop/package.json ./apps/desktop/

RUN pnpm install --frozen-lockfile

COPY packages/shared ./packages/shared
COPY apps/server ./apps/server
COPY apps/web ./apps/web

RUN pnpm --filter server exec prisma generate
RUN pnpm --filter @stationery-pos/shared build
RUN pnpm --filter server build
RUN pnpm --filter web build

FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3001

RUN corepack enable && corepack prepare pnpm@9.15.9 --activate

COPY pnpm-lock.yaml pnpm-workspace.yaml package.json .npmrc ./
COPY packages/shared/package.json ./packages/shared/
COPY apps/server/package.json ./apps/server/
COPY apps/web/package.json ./apps/web/
COPY apps/desktop/package.json ./apps/desktop/

RUN pnpm install --prod --frozen-lockfile

COPY --from=builder /app/packages/shared/dist ./packages/shared/dist
COPY --from=builder /app/apps/server/dist ./apps/server/dist
COPY --from=builder /app/apps/server/prisma ./apps/server/prisma
COPY --from=builder /app/apps/web/dist ./apps/web/dist

EXPOSE 3001

CMD ["node", "apps/server/dist/main.js"]
