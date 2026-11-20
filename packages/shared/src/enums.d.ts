/** Domain enums shared between backend and frontend. */
export declare enum UserRole {
    ADMIN = "ADMIN",
    CASHIER = "CASHIER"
}
export declare const StockUnit: {
    readonly PIECE: "PIECE";
    readonly PACKET: "PACKET";
};
export type StockUnit = (typeof StockUnit)[keyof typeof StockUnit];
export declare enum InvoiceStatus {
    OPEN = "OPEN",
    COMPLETED = "COMPLETED",
    VOIDED = "VOIDED",
    PARTIALLY_RETURNED = "PARTIALLY_RETURNED",
    FULLY_RETURNED = "FULLY_RETURNED"
}
export declare enum StockLogReason {
    SALE = "SALE",
    RETURN = "RETURN",
    PURCHASE = "PURCHASE",
    ADJUSTMENT = "ADJUSTMENT",
    OPENING = "OPENING",
    STOCK_TAKE = "STOCK_TAKE"
}
export declare enum ProductStatus {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE"
}
export declare enum CostMethod {
    WEIGHTED_AVERAGE = "WEIGHTED_AVERAGE",
    FIFO = "FIFO"
}
//# sourceMappingURL=enums.d.ts.map