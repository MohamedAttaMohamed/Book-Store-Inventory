import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../lib/api-client.js';

interface HealthResponse {
  status: string;
  timestamp: string;
  version: string;
}

export function HealthCheck(): React.ReactElement {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['health'],
    queryFn: () => api.get<HealthResponse>('/health'),
    retry: 3,
    retryDelay: 1000,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <div className="animate-spin h-12 w-12 mx-auto rounded-full border-4 border-brand-500 border-t-transparent" />
          <p className="text-lg text-slate-600 dark:text-slate-300">جاري الاتصال بالخادم...</p>
          <p className="text-sm text-slate-400">Connecting to server...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4 p-8 bg-white dark:bg-slate-800 rounded-xl shadow-lg max-w-md">
          <div className="text-danger text-4xl">⚠</div>
          <h2 className="text-xl font-bold text-danger">خطأ في الاتصال</h2>
          <p className="text-sm text-slate-500">{error.message}</p>
          <button
            onClick={() => void refetch()}
            className="px-6 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors"
          >
            إعادة المحاولة / Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center space-y-6 p-8 bg-white dark:bg-slate-800 rounded-xl shadow-lg max-w-md">
        <div className="text-6xl">✅</div>
        <h1 className="text-2xl font-bold text-brand-700 dark:text-brand-100">
          نقطة بيع القرطاسية
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-300">Stationery POS System</p>
        <div className="space-y-2 text-sm text-slate-500 dark:text-slate-400 tabular-nums">
          <p>الحالة / Status: <span className="text-green-600 font-semibold">{data?.status}</span></p>
          <p>الإصدار / Version: {data?.version}</p>
          <p>الوقت / Time: {data?.timestamp}</p>
        </div>
      </div>
    </div>
  );
}
