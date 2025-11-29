import { ChangeEvent, useEffect, useState } from "react";
import { useCategoryFormBasisContext } from "./CategoryFormBasisContext.js";
import { createNewContext } from "./utils.js";

const { ipcInvoke } = window.api;

type Categories = Awaited<ReturnType<typeof ipcInvoke<"db:getAllCategories">>>;
export type Category = Categories[number];

type StringInputElement =
  | HTMLInputElement
  | HTMLTextAreaElement
  | HTMLSelectElement;
function useString<T extends StringInputElement>(initial = "") {
  const [string, setString] = useState(initial);
  function reflectString(event: ChangeEvent<T>) {
    const input = event.currentTarget;
    setString(input.value);
    input.setCustomValidity("");
  }

  return [string, setString, reflectString] as const;
}

function useCategoryForm() {
  const [name, setName, reflectName] = useString();
  const [description, setDescription, reflectDescription] = useString();

  const { category } = useCategoryFormBasisContext();
  useEffect(() => {
    if (category === null) return;
    const { name, description } = category;
    setName(name);
    setDescription(description || "");
  }, [category]);

  return {
    ...{ name, reflectName },
    ...{ description, reflectDescription },
  };
}

export const [useCategoryFormContext, CategoryFormProvider] =
  createNewContext(useCategoryForm);
