import { describe, it, expect } from 'vitest';
import {
  egpToPiastres,
  piastresToEgp,
  proportionalDiscountRefund,
  calculateChange,
  discountAmount,
} from '../money.js';

describe('egpToPiastres', () => {
  it('converts whole EGP', () => {
    expect(egpToPiastres(1)).toBe(100);
    expect(egpToPiastres(10)).toBe(1000);
  });

  it('rounds half-up', () => {
    expect(egpToPiastres(1.005)).toBe(101); // round half-up
    expect(egpToPiastres(1.004)).toBe(100);
  });

  it('handles zero', () => {
    expect(egpToPiastres(0)).toBe(0);
  });

  it('throws on non-finite', () => {
    expect(() => egpToPiastres(Infinity)).toThrow(RangeError);
    expect(() => egpToPiastres(NaN)).toThrow(RangeError);
  });
});

describe('piastresToEgp', () => {
  it('converts correctly', () => {
    expect(piastresToEgp(100)).toBe(1);
    expect(piastresToEgp(1000)).toBe(10);
    expect(piastresToEgp(150)).toBe(1.5);
  });

  it('throws on non-integer', () => {
    expect(() => piastresToEgp(1.5)).toThrow(TypeError);
  });
});

describe('proportionalDiscountRefund', () => {
  it('returns proportional share', () => {
    // 50% of items returned, 100 piastres discount → 50 piastres refund
    expect(proportionalDiscountRefund({
      invoiceSubtotal: 1000,
      discountAmount: 100,
      returnedAmount: 500,
    })).toBe(50);
  });

  it('returns 0 for no discount', () => {
    expect(proportionalDiscountRefund({
      invoiceSubtotal: 1000,
      discountAmount: 0,
      returnedAmount: 500,
    })).toBe(0);
  });

  it('returns 0 for zero subtotal', () => {
    expect(proportionalDiscountRefund({
      invoiceSubtotal: 0,
      discountAmount: 100,
      returnedAmount: 0,
    })).toBe(0);
  });

  it('rounds correctly', () => {
    // 1/3 of 100 = 33.33... → rounds to 33
    expect(proportionalDiscountRefund({
      invoiceSubtotal: 300,
      discountAmount: 100,
      returnedAmount: 100,
    })).toBe(33);
  });
});

describe('calculateChange', () => {
  it('returns correct change', () => {
    expect(calculateChange(1000, 1500)).toBe(500);
    expect(calculateChange(1000, 1000)).toBe(0);
  });

  it('throws when cash insufficient', () => {
    expect(() => calculateChange(1000, 500)).toThrow(RangeError);
  });
});

describe('discountAmount', () => {
  it('calculates percentage correctly', () => {
    expect(discountAmount(1000, 10)).toBe(100);
    expect(discountAmount(1000, 0)).toBe(0);
    expect(discountAmount(1000, 100)).toBe(1000);
  });

  it('rounds correctly', () => {
    // 15% of 100 = 15
    expect(discountAmount(100, 15)).toBe(15);
    // 33% of 100 = 33
    expect(discountAmount(100, 33)).toBe(33);
  });

  it('throws for invalid percentage', () => {
    expect(() => discountAmount(1000, -1)).toThrow(RangeError);
    expect(() => discountAmount(1000, 101)).toThrow(RangeError);
  });
});
