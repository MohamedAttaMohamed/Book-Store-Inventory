/** Domain enums shared between backend and frontend. */
export var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "ADMIN";
    UserRole["CASHIER"] = "CASHIER";
})(UserRole || (UserRole = {}));
export const StockUnit = {
    PIECE: 'PIECE',
    PACKET: 'PACKET',
};
export var InvoiceStatus;
(function (InvoiceStatus) {
    InvoiceStatus["OPEN"] = "OPEN";
    InvoiceStatus["COMPLETED"] = "COMPLETED";
    InvoiceStatus["VOIDED"] = "VOIDED";
    InvoiceStatus["PARTIALLY_RETURNED"] = "PARTIALLY_RETURNED";
    InvoiceStatus["FULLY_RETURNED"] = "FULLY_RETURNED";
})(InvoiceStatus || (InvoiceStatus = {}));
export var StockLogReason;
(function (StockLogReason) {
    StockLogReason["SALE"] = "SALE";
    StockLogReason["RETURN"] = "RETURN";
    StockLogReason["PURCHASE"] = "PURCHASE";
    StockLogReason["ADJUSTMENT"] = "ADJUSTMENT";
    StockLogReason["OPENING"] = "OPENING";
    StockLogReason["STOCK_TAKE"] = "STOCK_TAKE";
})(StockLogReason || (StockLogReason = {}));
export var ProductStatus;
(function (ProductStatus) {
    ProductStatus["ACTIVE"] = "ACTIVE";
    ProductStatus["INACTIVE"] = "INACTIVE";
})(ProductStatus || (ProductStatus = {}));
export var CostMethod;
(function (CostMethod) {
    CostMethod["WEIGHTED_AVERAGE"] = "WEIGHTED_AVERAGE";
    CostMethod["FIFO"] = "FIFO";
})(CostMethod || (CostMethod = {}));
//# sourceMappingURL=enums.js.map