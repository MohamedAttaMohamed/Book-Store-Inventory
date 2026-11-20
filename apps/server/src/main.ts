/**
 * Server entry point — builds and starts the Fastify server.
 */
import { buildApp } from './app.js';
import { config } from './config/config.js';
import { logger } from './core/logger.js';

async function main(): Promise<void> {
  const app = await buildApp();

  await app.listen({
    host: config.host,
    port: config.port,
  });

  logger.info(`Server listening on http://${config.host}:${config.port}`);
}

main().catch((err: unknown) => {
  logger.error({ err }, 'Fatal server startup error');
  process.exit(1);
});
