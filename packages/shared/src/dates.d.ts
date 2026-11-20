/**
 * Date helpers — always store UTC, display/group by Africa/Cairo (EET/EEST).
 */
/**
 * Get the current date in Cairo timezone as a Date (time 00:00:00 UTC).
 */
export declare function getCairoToday(): Date;
/**
 * Given any Date (or timestamp), return a new Date representing the start of
 * the Cairo calendar day containing that instant, expressed as a UTC Date
 * (i.e. the moment 00:00:00 Cairo local time, which is a UTC offset).
 */
export declare function startOfCairoDay(date: Date): Date;
/**
 * Given any Date, return the end of the Cairo calendar day (23:59:59.999).
 */
export declare function endOfCairoDay(date: Date): Date;
/**
 * Return `{ from, to }` UTC Date range for the full Cairo calendar day
 * containing `date`. Suitable for Prisma `gte`/`lte` queries.
 */
export declare function cairoDayRange(date: Date): {
    from: Date;
    to: Date;
};
/**
 * Format a UTC Date for display using Cairo timezone.
 */
export declare function formatCairoDate(date: Date, locale?: string): string;
/**
 * Format a UTC Date as a time string in Cairo timezone.
 */
export declare function formatCairoTime(date: Date, locale?: string): string;
/**
 * Generate the Cairo-day portion of an invoice number (YYYYMMDD).
 * Uses Cairo local date.
 */
export declare function cairoDayStamp(date: Date): string;
//# sourceMappingURL=dates.d.ts.map