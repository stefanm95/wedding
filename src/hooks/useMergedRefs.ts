import { useCallback } from "react";
import type { Ref, MutableRefObject } from "react";

export function useMergedRefs<T>(...refs: Array<Ref<T> | undefined>) {
  return useCallback(
    (node: T | null) => {
      refs.forEach((ref) => {
        if (!ref) return;

        if (typeof ref === "function") {
          ref(node);
        } else {
          (ref as MutableRefObject<T | null>).current = node;
        }
      });
    },
    [refs],
  );
}
