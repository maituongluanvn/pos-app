// import { ProductCard } from "@renderer/components/ProductCard.js";
import { Prompt } from "@renderer/components/Prompt.js";
import { Screen } from "@renderer/components/Screen.js";
import { CategoryFormBasisProvider, useCategoryFormBasisContext } from "@renderer/contexts/CategoryFormBasisContext.js";
import {
  CategoryFormProvider,
  useCategoryFormContext,
} from "@renderer/contexts/CategoryFormContext.js";
import { useModalContext } from "@renderer/contexts/ModalContext.js";
import { useProductsContext } from "@renderer/contexts/ProductsContext.js";
import { useScreenContext } from "@renderer/contexts/ScreenContext.js";
import {
  C,
  cls$button$primary,
  cls$button$secondary,
  cls$card,
  cls$interactiveHoverBg,
} from "@renderer/utils/classes.js";
import { FormEvent } from "react";

const { ipcInvoke } = window.api;

const Validators: Record<string, () => Promise<boolean>> = {};
async function runValidations() {
  const validations = Object.values(Validators);
  for (const validation of validations) {
    const status = await validation();
    if (!status) return;
  }
}

const cls$label = C(cls$card, cls$interactiveHoverBg, "transition");
const cls$label$inline = C(
  cls$label,
  "grid grid-cols-[auto_1fr] items-center gap-3",
  "p-1 pl-3",
);
const cls$label$block = C(
  cls$label,
  "grid grid-rows-[auto_1fr] gap-3",
  "p-2 px-3",
);
const cls$input = C("px-2 py-1", "bg-transparent");

function NameInput() {
  const { name, reflectName } = useCategoryFormContext();

  return (
    <label className={`${cls$label$inline} col-span-2`}>
      <span className="font-bold">Name</span>
      <input
        type="text"
        className={cls$input}
        name="name"
        value={name}
        onChange={reflectName}
        required
      />
    </label>
  );
}

function DescriptionTextArea() {
  const { description, reflectDescription } = useCategoryFormContext();

  return (
    <label className={`${cls$label$block} col-span-3 row-[span_18_/_span_18]`}>
      <span className="font-bold">Description</span>
      <textarea
        className={`${cls$input} resize-none`}
        name="description"
        value={description}
        onChange={reflectDescription}
      ></textarea>
    </label>
  );
}

function Fieldset() {
  return (
    <fieldset className="grid grid-cols-3 gap-3">
      <NameInput />
      <DescriptionTextArea />
    </fieldset>
  );
}

// const cls$div = C("px-3 py-2", cls$card);
const cls$button$confirm = C("px-4 py-1", cls$button$primary, "transition");

function DeletePrompt() {
  const { category } = useCategoryFormBasisContext();
  const { closeModal } = useModalContext();
  const { changeScreen } = useScreenContext();
  const { reflectProducts } = useProductsContext();

  async function confirm() {
    if (category === null) {
      throw new Error("Impossible; nothing to delete if no category");
    }

    const { name } = category;
    await ipcInvoke("db:deleteProduct", name);
    changeScreen("inv-mgmt");
    reflectProducts();
  }

  return (
    <Prompt onClose={closeModal}>
      <>Are you sure you want to delete the following category?</>

      {/* <div className={cls$div}>
        {category !== null && <ProductCard category={category} />}
      </div> */}

      <>
        <button type="button" className={cls$button$confirm} onClick={confirm}>
          Yes
        </button>
      </>
    </Prompt>
  );
}

const cls$button$save = C("px-4 py-1", cls$button$primary, "transition");
const cls$button$delete = C("px-4 py-1", cls$button$secondary, "transition");

function Buttons() {
  const { category } = useCategoryFormBasisContext();
  const { showOnModal } = useModalContext();

  function showDeletePrompt() {
    showOnModal(<DeletePrompt />);
  }

  return (
    <footer className="flex flex-row-reverse gap-3">
      <button className={cls$button$save}>Save</button>
      {category !== null && (
        <button
          className={cls$button$delete}
          type="button"
          onClick={showDeletePrompt}
        >
          Delete
        </button>
      )}
    </footer>
  );
}

const cls$form = C(
  "h-full",
  "flex flex-col [&>*:nth-child(1)]:flex-1 gap-6",
  "p-6 pt-0",
);
function Form() {
  const values = useCategoryFormContext();
  const { name, description } = values;
  const { changeScreen } = useScreenContext();
  const { reflectProducts } = useProductsContext();
  const { category } = useCategoryFormBasisContext();

  async function trySave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    await runValidations();
    const isFormValid = form.reportValidity();
    if (!isFormValid) return;

    if (category === null) saveNew();
    if (category !== null) saveEdit();
  }
  async function saveNew() {
    const category = { name, description };
    await ipcInvoke("db:addCategory", category);
    changeScreen("inv-mgmt");
    await reflectProducts();
  }
  async function saveEdit() {
    const edited = { name, description };
    await ipcInvoke("db:editCategory", edited);
    changeScreen("inv-mgmt");
    await reflectProducts();
  }

  return (
    <form className={cls$form} onSubmit={trySave}>
      <Fieldset />
      <Buttons />
    </form>
  );
}

export function CategoryFormScreen() {
  return (
    <CategoryFormBasisProvider>
      <CategoryFormProvider>
        <Screen withLogoutButton withFeaturesButton withInventoryManagementButton>
          <Form />
        </Screen>
      </CategoryFormProvider>
    </CategoryFormBasisProvider>
  );
}
