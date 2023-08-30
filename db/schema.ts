// schema.ts
import { InferModel } from "drizzle-orm";
import {
  decimal,
  int,
  json,
  mysqlTable,
  serial,
  text,
} from "drizzle-orm/mysql-core";

export const stores = mysqlTable("stores", {
  id: serial("id").primaryKey(),
  name: text("store_name"),
  industry: text("industry"),
  description: text("description"),
  slug: text("slug"),
});

export type Store = InferModel<typeof stores>;

export const products = mysqlTable("products", {
  id: serial("id").primaryKey(),
  name: text("name"),
  price: decimal("price", { precision: 10, scale: 2 }).default("0"),
  description: text("description"),
  inventory: decimal("inventory").default("0"),
  images: json("images"),
  storeId: int("store_id"),
});

export type Product = InferModel<typeof products>;

export const carts = mysqlTable("carts", {
  id: serial("id").primaryKey(),
  items: json("items"),
});
export type Cart = InferModel<typeof carts>;

export const payments = mysqlTable("payments", {
  id: serial("id").primaryKey(),
  storeId: int("store_id"),
  stripeAccountId: text("stripe_account_id"),
});
