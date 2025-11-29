import currency from "currency.js";
import { Dispatch, SetStateAction, useRef } from "react";

export function formatPrice(price: number): string {
  return currency(price).toString();
}

export function useNewRef<T>() {
  const ref = useRef<T | null>(null);
  function accessRef() {
    const value = ref.current;
    if (value === null) {
      throw new Error("Ref possibly not assigned");
    }
    return value;
  }

  return [ref, accessRef] as const;
}

/**
 * Return type of `useState<T>(initializer)`
 *
 * `ReturnType<useState<T>>` only gives an uninitalized version,
 * which attaches `undefined` to the type.
 */
export type State<T> = [T, Dispatch<SetStateAction<T>>];
