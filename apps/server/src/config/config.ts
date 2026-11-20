import { z } from 'zod';

const ConfigSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  HOST: z.string().default('127.0.0.1'),
  PORT: z.coerce.number().int().min(1024).max(65535).default(3001),
  DATABASE_URL: z.string().default('file:./dev.db'),
  JWT_SECRET: z.string().min(32).default('change-me-in-production-must-be-32-chars-min'),
  LOG_LEVEL: z.enum(['trace', 'debug', 'info', 'warn', 'error', 'fatal']).default('info'),
  BCRYPT_ROUNDS: z.coerce.number().int().min(10).default(12),
});

function loadConfig() {
  const result = ConfigSchema.safeParse(process.env);
  if (!result.success) {
    // Cannot use logger here (not built yet); use stderr
    process.stderr.write(`Config validation error: ${result.error.message}\n`);
    process.exit(1);
  }
  return {
    env: result.data.NODE_ENV,
    host: result.data.HOST,
    port: result.data.PORT,
    databaseUrl: result.data.DATABASE_URL,
    jwtSecret: result.data.JWT_SECRET,
    logLevel: result.data.LOG_LEVEL,
    bcryptRounds: result.data.BCRYPT_ROUNDS,
    isProduction: result.data.NODE_ENV === 'production',
    isTest: result.data.NODE_ENV === 'test',
  };
}

export const config = loadConfig();
