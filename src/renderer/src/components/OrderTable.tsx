import { useCartContext } from "@renderer/contexts/CartContext.js";
import { CartTable } from "./CartTable.js";
import { MachineInfo } from "./MachineInfo.js";
import { MapTable } from "./MapTable.js";

export function OrderTable() {
  const { receiptRef } = useCartContext();

  return (
    // <section ref={receiptRef}>
      <CartTable />
      // <br />
    // </section>
  );
}
