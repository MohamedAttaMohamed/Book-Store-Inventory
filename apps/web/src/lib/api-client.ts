const API_BASE = '/api/v1';

export interface ApiError {
  code: string;
  message: string;
  details?: unknown;
}

export class ApiClientError extends Error {
  constructor(
    public readonly status: number,
    public readonly error: ApiError,
  ) {
    super(error.message);
    this.name = 'ApiClientError';
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const url = `${API_BASE}${path}`;
  const res = await fetch(url, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...init?.headers,
    },
  });

  if (!res.ok) {
    const body = (await res.json().catch(() => ({
      error: { code: 'INTERNAL_ERROR', message: res.statusText },
    }))) as { error: ApiError };
    throw new ApiClientError(res.status, body.error);
  }

  return (await res.json()) as T;
}

export const api = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body?: unknown) => {
    const init: RequestInit = { method: 'POST' };
    if (body !== undefined) {
      init.body = JSON.stringify(body);
    }
    return request<T>(path, init);
  },
  put: <T>(path: string, body?: unknown) => {
    const init: RequestInit = { method: 'PUT' };
    if (body !== undefined) {
      init.body = JSON.stringify(body);
    }
    return request<T>(path, init);
  },
  delete: <T>(path: string) => request<T>(path, { method: 'DELETE' }),
};
