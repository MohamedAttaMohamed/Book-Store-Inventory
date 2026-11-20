import pino from 'pino';
import { config } from '../config/config.js';

export const logger = (pino as unknown as typeof pino.default)({
  level: config.logLevel,
  redact: ['req.headers.authorization', 'body.password', 'body.currentPassword', 'body.newPassword'],
  ...(config.isProduction
    ? {}
    : {
        transport: {
          target: 'pino-pretty',
          options: { colorize: true, translateTime: 'SYS:standard' },
        },
      }),
});
