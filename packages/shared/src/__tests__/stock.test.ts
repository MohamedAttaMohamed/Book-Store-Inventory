import { describe, it, expect } from 'vitest';
import { stockBreakdown, toPieces, formatStock } from '../stock.js';

describe('stockBreakdown', () => {
  it('splits into packets and pieces', () => {
    expect(stockBreakdown(7, 3)).toEqual({ packets: 2, pieces: 1, total: 7 });
    expect(stockBreakdown(6, 3)).toEqual({ packets: 2, pieces: 0, total: 6 });
    expect(stockBreakdown(0, 3)).toEqual({ packets: 0, pieces: 0, total: 0 });
  });

  it('handles piecesPerPacket = 1', () => {
    expect(stockBreakdown(5, 1)).toEqual({ packets: 5, pieces: 0, total: 5 });
  });

  it('handles exact multiple', () => {
    expect(stockBreakdown(12, 4)).toEqual({ packets: 3, pieces: 0, total: 12 });
  });

  it('throws on negative totalPieces', () => {
    expect(() => stockBreakdown(-1, 3)).toThrow(TypeError);
  });

  it('throws on non-integer totalPieces', () => {
    expect(() => stockBreakdown(1.5, 3)).toThrow(TypeError);
  });

  it('throws on piecesPerPacket < 1', () => {
    expect(() => stockBreakdown(5, 0)).toThrow(TypeError);
  });
});

describe('toPieces', () => {
  it('converts PACKET to pieces', () => {
    expect(toPieces(2, 'PACKET', 10)).toBe(20);
    expect(toPieces(1, 'PACKET', 1)).toBe(1);
  });

  it('leaves PIECE unchanged', () => {
    expect(toPieces(5, 'PIECE', 10)).toBe(5);
  });

  it('handles zero', () => {
    expect(toPieces(0, 'PACKET', 10)).toBe(0);
    expect(toPieces(0, 'PIECE', 10)).toBe(0);
  });

  it('throws on non-integer qty', () => {
    expect(() => toPieces(1.5, 'PIECE', 10)).toThrow(TypeError);
  });
});

describe('formatStock', () => {
  it('formats in English', () => {
    expect(formatStock(7, 3, 'en')).toBe('2 packets + 1 piece');
    expect(formatStock(6, 3, 'en')).toBe('2 packets');
    expect(formatStock(1, 3, 'en')).toBe('1 piece');
    expect(formatStock(0, 3, 'en')).toBe('0 pieces');
  });

  it('handles piecesPerPacket = 1', () => {
    expect(formatStock(5, 1, 'en')).toBe('5 pieces');
    expect(formatStock(1, 1, 'en')).toBe('1 piece');
    expect(formatStock(0, 1, 'en')).toBe('0 pieces');
  });

  it('handles exact multiples', () => {
    expect(formatStock(6, 3, 'en')).toBe('2 packets');
  });
});
