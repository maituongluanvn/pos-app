import { Table } from "@radix-ui/themes";
import { useCartContext } from "@renderer/contexts/CartContext.js";
import { Product } from "@renderer/contexts/ProductsContext.js";
import { formatPrice } from "@renderer/utils.js";
import { raise, sum } from "@renderer/utils/stdlib-ext.js";

function TableEntry(props: { product: Product }) {
  const { product } = props;
  const { sku, name, price } = product;
  const { cart } = useCartContext();

  const qty = cart.get(sku) ?? raise(`Product SKU "${sku}" not found in cart`);
  const subtotal = qty * price;

  return (
    <>
      <Table.Row className="mb-2">
        <Table.Cell className="mb-2">
          {name}
        </Table.Cell>
        <Table.Cell>{qty}</Table.Cell>
        <Table.Cell>{formatPrice(price)}</Table.Cell>
        <Table.Cell>{formatPrice(subtotal)}</Table.Cell>
      </Table.Row>
    </>
  );
}

export function CartTable() {
  const { cart, generateCartProductAndQty, totalCartPrice, payment } =
    useCartContext();
  const products = Array.from(
    generateCartProductAndQty(),
    ([product]) => product,
  );

  const totalQty = sum(...cart.values());
  const cash = payment ?? totalCartPrice;
  const change = cash - totalCartPrice;

  return (
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Item</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Qty.</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Price</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Subtotal</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body className="w-full">
        {products.map((product) => (
          <TableEntry key={product.sku} product={product} />
        ))}
        <Table.Row className="mb-2">
          <Table.Cell colSpan={4}>
            <hr className="border-t-2 border-gray-400 border-dashed my-2" />
          </Table.Cell>
        </Table.Row>
        <Table.Row className="mb-2">
          <Table.RowHeaderCell>Total</Table.RowHeaderCell>
          <Table.Cell>{totalQty}</Table.Cell>
          <Table.Cell></Table.Cell>
          <Table.Cell>{formatPrice(totalCartPrice)}</Table.Cell>
        </Table.Row>
        {payment !== null && (
          <Table.Row className="mb-2">
            <Table.RowHeaderCell>Cash</Table.RowHeaderCell>
            <Table.Cell></Table.Cell>
            <Table.Cell></Table.Cell>
            <Table.Cell>{formatPrice(cash)}</Table.Cell>
          </Table.Row>
        )}
        {payment !== null && (
          <Table.Row className="mb-2">
            <Table.RowHeaderCell>Change</Table.RowHeaderCell>
            <Table.Cell></Table.Cell>
            <Table.Cell></Table.Cell>
            <Table.Cell>{formatPrice(change)}</Table.Cell>
          </Table.Row>
        )}
      </Table.Body>
    </Table.Root>
  );
}
