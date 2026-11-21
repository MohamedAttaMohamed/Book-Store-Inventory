import { describe, it, expect, afterAll } from 'vitest';
import { buildApp } from '../app.js';

describe('GET /api/v1/health', () => {
  let app: Awaited<ReturnType<typeof buildApp>>;

  afterAll(async () => {
    if (app as unknown) {
      await app.close();
    }
  });

  it('returns 200 with status ok', async () => {
    app = await buildApp();
    const res = await app.inject({
      method: 'GET',
      url: '/api/v1/health',
    });

    expect(res.statusCode).toBe(200);
    const body = JSON.parse(res.body) as { status: string; version: string; timestamp: string };
    expect(body.status).toBe('ok');
    expect(body).toHaveProperty('version');
    expect(body).toHaveProperty('timestamp');
  });
});
