import Database from "better-sqlite3";
import { sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { real, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { hash } from "./auth.js";

export const categories = sqliteTable("categories", {
  name: text("name").primaryKey().notNull(),
  description: text("description"),
});

export const products = sqliteTable("products", {
  sku: text("sku").primaryKey().notNull(),
  category: text("category").notNull(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: real("price").notNull(),
  url: text("url"),
});

export const users = sqliteTable("users", {
  username: text("username").primaryKey().notNull(),
  password: text("password").notNull(),
});

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;

export type Category = typeof categories.$inferSelect;
export type NewCategory = typeof categories.$inferInsert;

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

/**
 * Reflect the schemas above in the statements below!
 *
 * Can take a look inside a pre-existing SQLite file
 */
export function createDb(path: string) {
  const sqlite = new Database(path);
  const db = drizzle(sqlite);

  db.run(sql`
    CREATE TABLE users (
      username TEXT NOT NULL,
      password TEXT NOT NULL,
      PRIMARY KEY (username)
    )
  `);

  db.run(sql`
    CREATE TABLE categories (
      name TEXT NOT NULL,
      description TEXT,
      PRIMARY KEY (name)
    )
  `);

  db.run(sql`
    CREATE TABLE products (
      sku TEXT NOT NULL,
      category TEXT NOT NULL,
      name TEXT NOT NULL,
      description TEXT,
      price FLOAT NOT NULL,
      stock INTEGER,
      url TEXT,
      PRIMARY KEY (sku)
    )
  `);
}

export async function insertUser(path: string){
  const sqlite = new Database(path);
  const db = drizzle(sqlite);

  const password = await hash('123');
  const user: NewUser = { username: 'admin', password: password };

  await db.insert(users).values({ ...user });
}
