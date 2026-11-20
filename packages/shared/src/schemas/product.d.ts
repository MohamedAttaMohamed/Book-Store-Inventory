import { z } from 'zod';
export declare const CreateProductSchema: z.ZodObject<{
    nameAr: z.ZodString;
    nameEn: z.ZodOptional<z.ZodString>;
    categoryId: z.ZodOptional<z.ZodString>;
    piecesPerPacket: z.ZodNumber;
    pieceBuyPricePiastres: z.ZodNumber;
    pieceSellPricePiastres: z.ZodNumber;
    packetSellPricePiastres: z.ZodOptional<z.ZodNumber>;
    barcodePiece: z.ZodOptional<z.ZodString>;
    barcodePacket: z.ZodOptional<z.ZodString>;
    reorderPoint: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    nameAr: string;
    piecesPerPacket: number;
    pieceBuyPricePiastres: number;
    pieceSellPricePiastres: number;
    reorderPoint: number;
    nameEn?: string | undefined;
    categoryId?: string | undefined;
    packetSellPricePiastres?: number | undefined;
    barcodePiece?: string | undefined;
    barcodePacket?: string | undefined;
}, {
    nameAr: string;
    piecesPerPacket: number;
    pieceBuyPricePiastres: number;
    pieceSellPricePiastres: number;
    nameEn?: string | undefined;
    categoryId?: string | undefined;
    packetSellPricePiastres?: number | undefined;
    barcodePiece?: string | undefined;
    barcodePacket?: string | undefined;
    reorderPoint?: number | undefined;
}>;
export type CreateProductInput = z.infer<typeof CreateProductSchema>;
//# sourceMappingURL=product.d.ts.map