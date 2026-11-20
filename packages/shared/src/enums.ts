/** Domain enums shared between backend and frontend. */

export enum UserRole {
  ADMIN = 'ADMIN',
  CASHIER = 'CASHIER',
}

export const StockUnit = {
  PIECE: 'PIECE',
  PACKET: 'PACKET',
} as const;

export type StockUnit = (typeof StockUnit)[keyof typeof StockUnit];

export enum InvoiceStatus {
  OPEN = 'OPEN',
  COMPLETED = 'COMPLETED',
  VOIDED = 'VOIDED',
  PARTIALLY_RETURNED = 'PARTIALLY_RETURNED',
  FULLY_RETURNED = 'FULLY_RETURNED',
}

export enum StockLogReason {
  SALE = 'SALE',
  RETURN = 'RETURN',
  PURCHASE = 'PURCHASE',
  ADJUSTMENT = 'ADJUSTMENT',
  OPENING = 'OPENING',
  STOCK_TAKE = 'STOCK_TAKE',
}

export enum ProductStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export enum CostMethod {
  WEIGHTED_AVERAGE = 'WEIGHTED_AVERAGE',
  FIFO = 'FIFO',
}
