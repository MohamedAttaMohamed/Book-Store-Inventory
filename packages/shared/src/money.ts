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
export function egpToPiastres(egp: number): number {
  if (!isFinite(egp)) throw new RangeError(`egpToPiastres: invalid value ${egp}`);
  // Add Number.EPSILON to avoid binary floating-point representation rounding issues like 1.005 * 100 = 100.49999999999999
  return Math.round((egp + Number.EPSILON) * 100);
}

/** Convert piastres integer to EGP number (2 decimal places). */
export function piastresToEgp(piastres: number): number {
  if (!Number.isInteger(piastres)) throw new TypeError(`piastresToEgp: expected integer, got ${piastres}`);
  return piastres / 100;
}

/**
 * Format piastres as a localised EGP string.
 * Uses Intl.NumberFormat so it respects locale numerals.
 */
export function formatEgp(piastres: number, locale = 'ar-EG'): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'EGP',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(piastresToEgp(piastres));
}

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
export function proportionalDiscountRefund(params: {
  invoiceSubtotal: number; // piastres
  discountAmount: number;  // piastres
  returnedAmount: number;  // piastres (item subtotal being returned)
}): number {
  const { invoiceSubtotal, discountAmount, returnedAmount } = params;
  if (invoiceSubtotal <= 0) return 0;
  if (discountAmount <= 0) return 0;
  return Math.round((returnedAmount / invoiceSubtotal) * discountAmount);
}

/**
 * Calculate change due: cashReceived − total (piastres).
 * Throws if cashReceived < total.
 */
export function calculateChange(total: number, cashReceived: number): number {
  if (cashReceived < total) {
    throw new RangeError(`calculateChange: cashReceived (${cashReceived}) < total (${total})`);
  }
  return cashReceived - total;
}

/**
 * Apply a discount to a subtotal.
 * discountPct is 0–100 (percent). Returns the discount amount in piastres.
 */
export function discountAmount(subtotal: number, discountPct: number): number {
  if (discountPct < 0 || discountPct > 100) {
    throw new RangeError(`discountAmount: discountPct must be 0–100, got ${discountPct}`);
  }
  return Math.round(subtotal * (discountPct / 100));
}
