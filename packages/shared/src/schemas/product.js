import { z } from 'zod';
export const CreateProductSchema = z.object({
    nameAr: z.string().min(1).max(200),
    nameEn: z.string().max(200).optional(),
    categoryId: z.string().uuid().optional(),
    piecesPerPacket: z.number().int().min(1),
    pieceBuyPricePiastres: z.number().int().min(0),
    pieceSellPricePiastres: z.number().int().min(0),
    packetSellPricePiastres: z.number().int().min(0).optional(),
    barcodePiece: z.string().max(50).optional(),
    barcodePacket: z.string().max(50).optional(),
    reorderPoint: z.number().int().min(0).default(0),
});
//# sourceMappingURL=product.js.map