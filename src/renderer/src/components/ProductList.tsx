import { Button } from "@radix-ui/themes";
import { Product } from "@renderer/contexts/ProductsContext.js";
import { ComponentProps } from "react";
import { ProductCard } from "./ProductCard.js";

function ProductButton(props: {
  product: Product;
  onClick: ComponentProps<"button">["onClick"];
}) {
  const { product, onClick } = props;

  return (
    <Button onClick={onClick}>
      <ProductCard product={product} />
    </Button>
  );
}

export function ProductList(props: {
  products: Product[];
  onItemClick: (product: Product) => void;
}) {
  const { products, onItemClick } = props;
  const categories = [...new Set(products.map(product => product.category))];

  return (
    <div className="space-y-6">
      <section className="grid gap-3">
      <header className="font-head text-2xl">Categories:</header>
      <div className="flex flex-row gap-2 flex-wrap">
        {categories.map((category) => (
        <Button key={category} className="min-w-[180px] border">
          {category}
        </Button>
        ))}
      </div>
      </section>
      <div className="grid grid-cols-4 gap-4">
      {products.map((product) => (
        <div key={product.sku} className="border rounded-lg p-2">
        <ProductButton
          product={product}
          onClick={() => onItemClick(product)}
        />
        </div>
      ))}
      </div>
    </div>
  );
}
