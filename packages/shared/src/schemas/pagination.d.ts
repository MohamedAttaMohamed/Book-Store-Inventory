import { z } from 'zod';
export declare const PaginationQuerySchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodNumber>;
    pageSize: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    page: number;
    pageSize: number;
}, {
    page?: number | undefined;
    pageSize?: number | undefined;
}>;
export type PaginationQuery = z.infer<typeof PaginationQuerySchema>;
export interface PaginatedResponse<T> {
    data: T[];
    page: number;
    pageSize: number;
    total: number;
}
//# sourceMappingURL=pagination.d.ts.map