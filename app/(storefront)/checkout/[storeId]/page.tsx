import { createPaymentIntent } from "@/server-actions/stripe/payment";
import CheckoutWrapper from "../components/checkout-wrapper";
import { cookies } from "next/headers";
import { getCart } from "@/server-actions/get-cart-details";
import { db } from "@/db/db";
import { products, stores } from "@/db/schema";
import { eq } from "drizzle-orm";
import { CheckoutItem } from "@/lib/types";

export default async function Page({
  params,
}: {
  params: { storeId: string };
}) {
  const cartId = cookies().get("cartId")?.value;
  const { cartItems } = await getCart(Number(cartId));

  const storeProducts = await db
    .select({
      id: products.id,
      price: products.price,
    })
    .from(products)
    .leftJoin(stores, eq(stores.id, Number(params.storeId)));

  const paymentIntent = createPaymentIntent({
    items: cartItems
      .map((item) => {
        const product = storeProducts.find((p) => p.id === item.id);
        if (!product) return null;
        const priceAsNumber = Number(product?.price);
        return {
          id: item.id,
          price: isNaN(priceAsNumber) ? null : priceAsNumber,
          qty: item.qty,
        };
      })
      .filter((item) => !item || item.price !== null) as CheckoutItem[],
    storeId: Number(params.storeId),
  });

  // providing the paymntIntent to the CheckoutWrapper to work around Nextjs bug with authentication not passed to server actions when called in client component
  return <CheckoutWrapper paymentIntent={paymentIntent} />;
}
