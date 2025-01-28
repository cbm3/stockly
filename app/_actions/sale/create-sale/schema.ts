import { z } from "zod";

export const createSaleSchema = z.object({
  products: z.array(
    z.object({
      id: z.string().uuid(),
      quantity: z.number().int().positive(),
      //price: z.number().positive(),
    }),
  ),
});

export type CreateSaleSchema = z.infer<typeof createSaleSchema>;