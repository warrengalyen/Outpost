import { db } from "@/db/db";
import { Product, products } from "@/db/schema";
import type { createProduct, UpdateProduct } from "@/lib/apiTypes";
import { currentUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import { z } from "zod";

export async function createProduct(
  productValues: Omit<Product, "id" | "storeId">
) {
  const schema = z.object({
    name: z.string().nonempty(),
    description: z.string(),
    price: z.string().nullable(),
    inventory: z.string().nullable(),
  });

  try {
    schema.parse(productValues);

    const user = await currentUser();

    const values = {
      name: productValues.name,
      description: productValues.description,
      price: isNaN(Number(productValues.price))
        ? "0"
        : String(productValues.price),
      inventory: isNaN(Number(productValues.inventory))
        ? "0"
        : String(productValues.inventory),
      images: productValues.images,
      storeId: Number(user?.privateMetadata.storeId),
    };

    const dbRes = await db.insert(products).values(values);

    const res = {
      error: false,
      message: "Product created",
      action: "Success, your new product has been created",
      productId: dbRes.insertId,
    };

    return res;
  } catch (err) {
    console.log(err);
    const res = {
      error: true,
      message: "Sorry, an error occured creating your product.",
      action: "Please try again.",
      productId: null,
    };
    return res;
  }
}

export async function updateProduct(productValues: Omit<Product, "storeId">) {
  const schema = z.object({
    name: z.string().nonempty(),
    description: z.string(),
    price: z.string().nullable(),
    inventory: z.string().nullable(),
    id: z.number(),
  });

  try {
    schema.parse(productValues);

    const user = await currentUser();

    const values = {
      name: productValues.name,
      description: productValues.description,
      price: isNaN(Number(productValues.price))
        ? 0
        : Number(productValues.price),
      inventory: isNaN(Number(productValues.inventory))
        ? 0
        : Number(productValues.inventory),
      images: productValues.images,
      storeId: Number(user?.privateMetadata.storeId),
    };

    const dbRes = await db
      .update(products)
      .set(values as any)
      .where(
        and(
          eq(products.id, productValues.id),
          eq(products.storeId, values.storeId)
        )
      );
    console.log({ dbRes });
    const res = {
      error: false,
      message: "Product updated",
      action: "Success, your product has been updated",
    };

    return res;
  } catch (err) {
    console.log(err);
    const res = {
      error: true,
      message: "Sorry, an error occured updating your product.",
      action: "Please try again.",
    };
    return res;
  }
}

export async function deleteProduct(productValues: Omit<Product, "storeId">) {}
