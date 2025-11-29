import { Product } from "@renderer/contexts/ProductsContext.js";
import { useScreenContext } from "@renderer/contexts/ScreenContext.js";
import { formatPrice } from "@renderer/utils.js";

export function ProductCard(props: { product: Product }) {
  const { product } = props;
  const { name, category, price } = product;
  const { screen } = useScreenContext();

  // const imgUrl = `pos-app:///data/images/${sku}.png`;
  // const imgAlt = `Image of product "${name}"`;

  // const cls = C(
  //   "grid gap-4",
  //   screen === "pos" && "grid-cols-[1fr_4fr_1fr]",
  //   screen === "inv-mgmt" && "grid-cols-[1fr_6fr_1fr]",
  //   screen === "product-form" && "grid-cols-[1fr_4fr_1fr]",
  // );
  return (
    <section>
      {/* {imgUrl &&<img src={imgUrl} alt={imgAlt} />} */}
      <div className="grid gap-1 auto-rows-min">
        <h2 className="text-lg font-head leading-tight">{name}</h2>
      </div>
      <div className="w-full h-full">
        <p className="text-xs tracking-widest text-right font-bold">
          {formatPrice(price)}
        </p>
      </div>
    </section>
  );
}
