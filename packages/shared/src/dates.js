/**
 * Date helpers — always store UTC, display/group by Africa/Cairo (EET/EEST).
 */
const CAIRO_TZ = 'Africa/Cairo';
/**
 * Get the current date in Cairo timezone as a Date (time 00:00:00 UTC).
 */
export function getCairoToday() {
    return startOfCairoDay(new Date());
}
/**
 * Given any Date (or timestamp), return a new Date representing the start of
 * the Cairo calendar day containing that instant, expressed as a UTC Date
 * (i.e. the moment 00:00:00 Cairo local time, which is a UTC offset).
 */
export function startOfCairoDay(date) {
    const cairoDateStr = new Intl.DateTimeFormat('en-CA', {
        timeZone: CAIRO_TZ,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }).format(date);
    // cairoDateStr is 'YYYY-MM-DD'
    return new Date(`${cairoDateStr}T00:00:00+02:00`);
}
/**
 * Given any Date, return the end of the Cairo calendar day (23:59:59.999).
 */
export function endOfCairoDay(date) {
    const start = startOfCairoDay(date);
    const end = new Date(start);
    end.setDate(end.getDate() + 1);
    end.setMilliseconds(end.getMilliseconds() - 1);
    return end;
}
/**
 * Return `{ from, to }` UTC Date range for the full Cairo calendar day
 * containing `date`. Suitable for Prisma `gte`/`lte` queries.
 */
export function cairoDayRange(date) {
    return {
        from: startOfCairoDay(date),
        to: endOfCairoDay(date),
    };
}
/**
 * Format a UTC Date for display using Cairo timezone.
 */
export function formatCairoDate(date, locale = 'ar-EG') {
    return new Intl.DateTimeFormat(locale, {
        timeZone: CAIRO_TZ,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }).format(date);
}
/**
 * Format a UTC Date as a time string in Cairo timezone.
 */
export function formatCairoTime(date, locale = 'ar-EG') {
    return new Intl.DateTimeFormat(locale, {
        timeZone: CAIRO_TZ,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    }).format(date);
}
/**
 * Generate the Cairo-day portion of an invoice number (YYYYMMDD).
 * Uses Cairo local date.
 */
export function cairoDayStamp(date) {
    const cairoStr = new Intl.DateTimeFormat('en-CA', {
        timeZone: CAIRO_TZ,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }).format(date);
    // 'YYYY-MM-DD' → 'YYYYMMDD'
    return cairoStr.replace(/-/g, '');
}
//# sourceMappingURL=dates.js.map