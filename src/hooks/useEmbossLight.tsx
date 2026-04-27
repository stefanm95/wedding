// hooks/useEmbossLight.ts
import { useScroll, useTransform } from "framer-motion";

export function useEmbossLight(target?: React.RefObject<HTMLElement>) {
  const { scrollYProgress } = useScroll({
    target,
    offset: ["start end", "end start"],
  });

  // lumina se mișcă subtil stânga-dreapta + sus-jos
  const x = useTransform(scrollYProgress, [0, 1], [1, -1]);
  const y = useTransform(scrollYProgress, [0, 1], [1, -1]);

  return { x, y };
}
