/**
 * Money helpers — all amounts are stored as Int (piastres).
 * 100 piastres = 1 EGP.
 *
 * Rules:
 *  - Never use floating-point for money calculations.
 *  - Convert EGP → piastres with egpToPiastres (round half-up).
 *  - Display EGP with piastresToEgp.
 */
/** Convert EGP (possibly fractional) to piastres (integer, round half-up). */
export declare function egpToPiastres(egp: number): number;
/** Convert piastres integer to EGP number (2 decimal places). */
export declare function piastresToEgp(piastres: number): number;
/**
 * Format piastres as a localised EGP string.
 * Uses Intl.NumberFormat so it respects locale numerals.
 */
export declare function formatEgp(piastres: number, locale?: string): string;
/**
 * Calculate proportional discount refund in piastres (integer).
 *
 * When an invoice had a discount applied to the whole basket, a partial return
 * should refund only the proportional share of that discount.
 *
 * Returns the refund discount amount (piastres) for `returnedAmount` worth of
 * goods out of the full `invoiceSubtotal`, given an overall `discountAmount`.
 *
 * Uses round-half-up to avoid rounding down and under-refunding.
 */
export declare function proportionalDiscountRefund(params: {
    invoiceSubtotal: number;
    discountAmount: number;
    returnedAmount: number;
}): number;
/**
 * Calculate change due: cashReceived − total (piastres).
 * Throws if cashReceived < total.
 */
export declare function calculateChange(total: number, cashReceived: number): number;
/**
 * Apply a discount to a subtotal.
 * discountPct is 0–100 (percent). Returns the discount amount in piastres.
 */
export declare function discountAmount(subtotal: number, discountPct: number): number;
//# sourceMappingURL=money.d.ts.map