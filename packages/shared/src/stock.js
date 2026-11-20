/**
 * Stock unit helpers.
 *
 * Rules:
 *  - Stock is always in pieces (Int).
 *  - A "packet" is a bundle of `piecesPerPacket` pieces.
 *  - When piecesPerPacket === 1, there is no packet concept; hide the toggle.
 */
/**
 * Break total piece count into packets + remainder pieces.
 *
 * @example
 * stockBreakdown(7, 3) → { packets: 2, pieces: 1, total: 7 }
 * stockBreakdown(6, 3) → { packets: 2, pieces: 0, total: 6 }
 * stockBreakdown(0, 3) → { packets: 0, pieces: 0, total: 0 }
 * stockBreakdown(5, 1) → { packets: 5, pieces: 0, total: 5 } // per-piece unit
 */
export function stockBreakdown(totalPieces, piecesPerPacket) {
    if (!Number.isInteger(totalPieces) || totalPieces < 0) {
        throw new TypeError(`stockBreakdown: totalPieces must be a non-negative integer, got ${totalPieces}`);
    }
    if (!Number.isInteger(piecesPerPacket) || piecesPerPacket < 1) {
        throw new TypeError(`stockBreakdown: piecesPerPacket must be a positive integer, got ${piecesPerPacket}`);
    }
    const packets = Math.floor(totalPieces / piecesPerPacket);
    const pieces = totalPieces % piecesPerPacket;
    return { packets, pieces, total: totalPieces };
}
/**
 * Convert a quantity in the given unit to pieces.
 */
export function toPieces(qty, unit, piecesPerPacket) {
    if (!Number.isInteger(qty) || qty < 0) {
        throw new TypeError(`toPieces: qty must be a non-negative integer, got ${qty}`);
    }
    return unit === 'PACKET' ? qty * piecesPerPacket : qty;
}
/**
 * Format a stock value as a human-readable string.
 *
 * @example
 * formatStock(7, 3) → "2 طرد + 1 قطعة"   (AR)
 * formatStock(0, 3) → "0 قطعة"
 */
export function formatStock(totalPieces, piecesPerPacket, locale = 'ar') {
    const bd = stockBreakdown(totalPieces, piecesPerPacket);
    const labels = locale === 'ar'
        ? { packet: 'طرد', packets: 'طرود', piece: 'قطعة', pieces: 'قطع', and: ' + ' }
        : { packet: 'packet', packets: 'packets', piece: 'piece', pieces: 'pieces', and: ' + ' };
    if (piecesPerPacket === 1) {
        return `${totalPieces} ${totalPieces === 1 ? labels.piece : labels.pieces}`;
    }
    const parts = [];
    if (bd.packets > 0) {
        parts.push(`${bd.packets} ${bd.packets === 1 ? labels.packet : labels.packets}`);
    }
    if (bd.pieces > 0 || bd.packets === 0) {
        parts.push(`${bd.pieces} ${bd.pieces === 1 ? labels.piece : labels.pieces}`);
    }
    return parts.join(labels.and);
}
//# sourceMappingURL=stock.js.map