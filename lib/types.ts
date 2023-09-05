import { Product } from "@/db/schema";

export type ProductImages = {
  id: string;
  alt: string;
  url: string;
};

export type CartItem = { id: number; qty: number };

export type CartLineItemDetails = Omit<Product, "description" | "images"> & {
  storeName: string | null;
  images: ProductImages[];
};

export type StripeAccount = {
  details_submitted: boolean;
  created: number;
  default_currency: string;
  country: string;
  email: string;
};
