/**
 * Stock unit helpers.
 *
 * Rules:
 *  - Stock is always in pieces (Int).
 *  - A "packet" is a bundle of `piecesPerPacket` pieces.
 *  - When piecesPerPacket === 1, there is no packet concept; hide the toggle.
 */
import type { StockUnit } from './enums.js';
export interface StockBreakdown {
    packets: number;
    pieces: number;
    total: number;
}
/**
 * Break total piece count into packets + remainder pieces.
 *
 * @example
 * stockBreakdown(7, 3) → { packets: 2, pieces: 1, total: 7 }
 * stockBreakdown(6, 3) → { packets: 2, pieces: 0, total: 6 }
 * stockBreakdown(0, 3) → { packets: 0, pieces: 0, total: 0 }
 * stockBreakdown(5, 1) → { packets: 5, pieces: 0, total: 5 } // per-piece unit
 */
export declare function stockBreakdown(totalPieces: number, piecesPerPacket: number): StockBreakdown;
/**
 * Convert a quantity in the given unit to pieces.
 */
export declare function toPieces(qty: number, unit: StockUnit, piecesPerPacket: number): number;
/**
 * Format a stock value as a human-readable string.
 *
 * @example
 * formatStock(7, 3) → "2 طرد + 1 قطعة"   (AR)
 * formatStock(0, 3) → "0 قطعة"
 */
export declare function formatStock(totalPieces: number, piecesPerPacket: number, locale?: 'ar' | 'en'): string;
//# sourceMappingURL=stock.d.ts.map