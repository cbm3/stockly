"use server";

import { db } from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";
import { createSaleSchema, CreateSaleSchema } from "./schema";

export const createSale  = async (data: CreateSaleSchema) => {
  createSaleSchema.parse(data);
  const sale = await db.sale.create({
    data: {
      date: new Date(),
    },
  });
  for(const product of data.products) {
    const productFromDb = (
      await db.product.findUnique({
        where: {
          id: product.id,
        },
      })
    )
    if(!productFromDb) {
      throw new Error("Produto não encontrado.");
    }
    const productIsOutOfStock = product.quantity > productFromDb.stock;
    if(productIsOutOfStock) {
      throw new Error("Produto fora de estoque.")
    }
    await db.saleProduct.create({
      data: {
        saleId: sale.id,
        productId: product.id,
        quantity: product.quantity,
        unitPrice: productFromDb.price,
      },
    });
    await db.product.update({
      where: {
        id: product.id,
      },
      data: {
        stock: {
          decrement: product.quantity,
        }
      }
    })
  }
  revalidatePath("/product")
};