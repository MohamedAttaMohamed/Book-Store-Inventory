import { PrismaClient } from '@prisma/client';

/** Singleton Prisma client with WAL mode and foreign keys enabled. */
let _client: PrismaClient | null = null;

export function getDb(): PrismaClient {
  if (!_client) {
    _client = new PrismaClient();
  }
  return _client;
}

/** Run a function inside a Prisma interactive transaction. */
export async function withTransaction<T>(
  fn: (tx: Parameters<Parameters<PrismaClient['$transaction']>[0]>[0]) => Promise<T>,
): Promise<T> {
  return getDb().$transaction(fn);
}

export async function disconnectDb(): Promise<void> {
  if (_client) {
    await _client.$disconnect();
    _client = null;
  }
}
