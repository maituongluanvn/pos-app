import { useState } from "react";
import { useCategoriesContext } from "./CategoryContext.js";
import { useProductsContext } from "./ProductsContext.js";
import { createNewContext } from "./utils.js";

/** Passthrough for all products */
function useDisplayProducts() {
  const { products: allProducts } = useProductsContext();
  const { categories } = useCategoriesContext();
  let products = [...allProducts];

  const sortOrders = ["Ascending", "Descending"] as const;
  type SortOrder = (typeof sortOrders)[number];
  const [sortOrder, setSortOrder] = useState<SortOrder>("Ascending");

  const sortKeys = ["SKU", "Name", "Price", "Category"] as const;
  type SortKey = (typeof sortKeys)[number];
  const [sortKey, setSortKey] = useState<SortKey>("Category");

  /* Always sort ascending first */
  /* TODO Skip sorting if key is not changed? */
  if (sortKey === "SKU") {
    products = products.sort((a, b) => (a.sku < b.sku ? -1 : 1));
  } else if (sortKey === "Name") {
    products = products.sort((a, b) => (a.name < b.name ? -1 : 1));
  } else if (sortKey === "Price") {
    products = products.sort((a, b) => (a.price < b.price ? -1 : 1));
  } else if (sortKey === "Category") {
    products = products.sort((a, b) => (a.category < b.category ? -1 : 1));
  }

  /* Due to always sorting in ascending order, desending is simply reversing that */
  if (sortOrder === "Descending") {
    products = products.reverse();
  }

  return {
    products,
    categories,
    ...{ sortOrders, sortOrder, setSortOrder },
    ...{ sortKeys, sortKey, setSortKey },
  };
}

export const [useDisplayProductsContext, DisplayProductsProvider] =
  createNewContext(useDisplayProducts);
