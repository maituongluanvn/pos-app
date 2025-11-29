import { useEffect, useState } from "react";
import { createNewContext } from "./utils.js";

const { ipcInvoke } = window.api;

type Categories = Awaited<ReturnType<typeof ipcInvoke<"db:getAllCategories">>>;
export type Category = Categories[number];

function useCategories() {
  const [categories, setCategories] = useState<Categories>([]);
  useEffect(() => {
    reflectCategories();
  }, []);
  async function reflectCategories() {
    const categories = await ipcInvoke("db:getAllCategories");
    setCategories(categories);
  }

  const categoryMap = new Map<Category["name"], Category>();
  for (const category of categories) {
    categoryMap.set(category.name, category);
  }

  return { ...{ categories, categoryMap, reflectCategories } };
}

export const [useCategoriesContext, CategoriesProvider] =
  createNewContext(useCategories);
