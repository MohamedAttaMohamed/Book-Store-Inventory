import type { ErrorCode } from '@stationery-pos/shared';
import type { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import { logger } from './logger.js';

/** Typed application error. Never return HTTP objects from services; throw this. */
export class AppError extends Error {
  constructor(
    public readonly code: ErrorCode,
    message: string,
    public readonly statusCode = 400,
    public readonly details?: unknown,
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export class NotFoundError extends AppError {
  constructor(code: ErrorCode, message: string) {
    super(code, message, 404);
    this.name = 'NotFoundError';
  }
}

export class ForbiddenError extends AppError {
  constructor(message = 'Forbidden') {
    super('FORBIDDEN', message, 403);
    this.name = 'ForbiddenError';
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized') {
    super('UNAUTHORIZED', message, 401);
    this.name = 'UnauthorizedError';
  }
}

export class ValidationError extends AppError {
  constructor(message: string, details?: unknown) {
    super('VALIDATION_ERROR', message, 422, details);
    this.name = 'ValidationError';
  }
}

export class InsufficientStockError extends AppError {
  constructor(productId: string, requested: number, available: number) {
    super('INSUFFICIENT_STOCK', `Insufficient stock for product ${productId}: requested ${requested}, available ${available}`, 409);
    this.name = 'InsufficientStockError';
  }
}

/** Fastify global error handler. */
export function errorHandler(
  error: FastifyError | AppError | Error,
  _request: FastifyRequest,
  reply: FastifyReply,
): void {
  if (error instanceof AppError) {
    void reply.status(error.statusCode).send({
      error: {
        code: error.code,
        message: error.message,
        ...(error.details !== undefined ? { details: error.details } : {}),
      },
    });
    return;
  }

  // Fastify validation errors (from JSON schema)
  const fastifyErr = error as FastifyError;
  if (fastifyErr.statusCode === 400 && fastifyErr.validation) {
    void reply.status(422).send({
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Validation failed',
        details: fastifyErr.validation,
      },
    });
    return;
  }

  logger.error({ err: error }, 'Unhandled error');
  void reply.status(500).send({
    error: {
      code: 'INTERNAL_ERROR',
      message: 'An internal error occurred',
    },
  });
}
