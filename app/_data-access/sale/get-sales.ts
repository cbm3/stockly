import "server-only";

import { db } from "@/app/_lib/prisma";

export interface SaleDto {
  id: string;
  productNames: string;
  totalProducts: number;
  totalAmount: number;
  date: Date;
}

export const GetSales = async (): Promise<SaleDto[]> => {
  const sales = await db.sale.findMany({
    include: { saleProducts: true },
  });
  return sales.map((sale: { id: any; date: any; saleProducts: any[]; }) => ({
      id: sale.id,
      date: sale.date,
      productNames: "Bone, Camisas",
      totalAmount: sale.saleProducts.reduce(
        (acc, saleProduct) => acc + saleProduct.quantity * Number(saleProduct.price),
        0,
      ),
      totalProducts: sale.saleProducts.reduce(
        (acc, saleProduct) => acc + saleProduct.quantity,
        0,
      ),
    }),
  );
};