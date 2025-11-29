import { useState } from "react";
import { Category } from "./CategoryFormContext.js";
import { createNewContext } from "./utils.js";

function useBasis() {
  const [category, setCategory] = useState<Category | null>(null);
  function changeCategory(category: Category | null) {
    setCategory(category);
  }

  return { category, changeCategory };
}

export const [useCategoryFormBasisContext, CategoryFormBasisProvider] =
  createNewContext(useBasis);
