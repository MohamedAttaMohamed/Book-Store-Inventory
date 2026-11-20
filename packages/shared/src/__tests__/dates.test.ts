import { describe, it, expect } from 'vitest';
import { startOfCairoDay, endOfCairoDay, cairoDayRange, cairoDayStamp } from '../dates.js';

describe('startOfCairoDay', () => {
  it('returns start of Cairo day for a midday UTC time', () => {
    // 2024-01-15 12:00:00 UTC → Cairo is UTC+2, so Cairo date is 2024-01-15
    const date = new Date('2024-01-15T12:00:00Z');
    const start = startOfCairoDay(date);
    // Should be 2024-01-15 00:00:00 Cairo = 2024-01-14T22:00:00Z
    expect(start.toISOString()).toBe('2024-01-14T22:00:00.000Z');
  });

  it('handles times just before midnight Cairo', () => {
    // 2024-01-15 23:30:00 Cairo (UTC+2) = 2024-01-15T21:30:00Z
    const date = new Date('2024-01-15T21:30:00Z');
    const start = startOfCairoDay(date);
    expect(start.toISOString()).toBe('2024-01-14T22:00:00.000Z');
  });

  it('handles times just after midnight Cairo', () => {
    // 2024-01-16 00:30:00 Cairo = 2024-01-15T22:30:00Z
    const date = new Date('2024-01-15T22:30:00Z');
    const start = startOfCairoDay(date);
    expect(start.toISOString()).toBe('2024-01-15T22:00:00.000Z');
  });
});

describe('cairoDayRange', () => {
  it('gives a full 24-hour range', () => {
    const date = new Date('2024-06-01T12:00:00Z');
    const { from, to } = cairoDayRange(date);
    // from should be before to
    expect(from.getTime()).toBeLessThan(to.getTime());
    // Range should span almost exactly 24 hours (- 1ms)
    const diffMs = to.getTime() - from.getTime();
    expect(diffMs).toBe(24 * 60 * 60 * 1000 - 1);
  });

  it('contains the input date', () => {
    const date = new Date('2024-06-01T14:00:00Z');
    const { from, to } = cairoDayRange(date);
    expect(from.getTime()).toBeLessThanOrEqual(date.getTime());
    expect(to.getTime()).toBeGreaterThanOrEqual(date.getTime());
  });
});

describe('cairoDayStamp', () => {
  it('formats correctly', () => {
    const date = new Date('2024-01-15T12:00:00Z');
    expect(cairoDayStamp(date)).toBe('20240115');
  });

  it('uses Cairo date not UTC date', () => {
    // 2024-01-15T22:30:00Z = 2024-01-16T00:30:00 Cairo
    const date = new Date('2024-01-15T22:30:00Z');
    expect(cairoDayStamp(date)).toBe('20240116');
  });
});

describe('endOfCairoDay', () => {
  it('is 999ms before next day start', () => {
    const date = new Date('2024-01-15T12:00:00Z');
    const start = startOfCairoDay(date);
    const end = endOfCairoDay(date);
    const nextDayStart = startOfCairoDay(new Date(start.getTime() + 24 * 60 * 60 * 1000));
    expect(end.getTime()).toBe(nextDayStart.getTime() - 1);
  });
});
