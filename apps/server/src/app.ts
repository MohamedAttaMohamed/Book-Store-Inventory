import Fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import rateLimit from '@fastify/rate-limit';
import { logger } from './core/logger.js';
import { healthRoutes } from './core/health.routes.js';
import { errorHandler } from './core/errors.js';

export async function buildApp() {
  const app = Fastify({
    loggerInstance: logger,
    disableRequestLogging: false,
  });

  // Security
  await app.register(helmet, { contentSecurityPolicy: false });
  await app.register(cors, { origin: false }); // loopback only
  await app.register(rateLimit, { max: 300, timeWindow: '1 minute' });

  // Global error handler
  app.setErrorHandler(errorHandler);

  // Core routes
  await app.register(healthRoutes, { prefix: '/api/v1' });

  return app;
}
