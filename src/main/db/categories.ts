import { eq } from "drizzle-orm";
import { db } from "../db.js";
import { Category, NewCategory, categories } from "./schema.js";

export async function getAllCategories() {
  return await db.select().from(categories);
}

export async function addCategory(category: NewCategory) {
  return await db.insert(categories).values(category);
}

export async function deleteCategory(name: Category["name"]) {
  await db.delete(categories).where(eq(categories.name, name));
}

export async function editCategory(category: Category) {
  await db.update(categories).set(category).where(eq(categories.name, category.name));
}

export async function getCategory(name: Category["name"]) {
  const res = await db.select().from(categories).where(eq(categories.name, name));
  if (res.length === 0) {
    throw new Error(`Category \`${name}\` does not exist!`);
  }
  /* Should be impossible as the name is a primary key */
  if (res.length > 1) {
    throw new Error(`There are multiple categories with the name \`${name}\`!`);
  }

  return res[0];
}

export async function isCategoryExisting(name: Category["name"]) {
  try {
    await getCategory(name);
    return true;
  } catch {
    return false;
  }
}
