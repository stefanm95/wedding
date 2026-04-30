import { useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { useRef, useState, type RefObject } from "react";
import type { PaperVariant } from "@utils/paperThemes";

const getVariantFromProgress = (progress: number): PaperVariant => {
  if (progress < 0.3) return "day";
  if (progress < 0.7) return "golden";
  return "evening";
};

export const usePaperScroll = (target: RefObject<HTMLElement | null>) => {
  const { scrollYProgress } = useScroll({
    target,
    offset: ["start end", "start start"],
  });

  const [variant, setVariant] = useState<PaperVariant>("day");
  const variantRef = useRef<PaperVariant>("day");

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const nextVariant = getVariantFromProgress(progress);

    if (variantRef.current === nextVariant) return;

    variantRef.current = nextVariant;
    setVariant(nextVariant);
  });

  const y = useTransform(scrollYProgress, [0, 1], [120, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.98, 1]);
  const shadow = useTransform(
    scrollYProgress,
    [0, 0.4, 1],
    [
      "0px -10px 40px rgba(0,0,0,0.15)",
      "0px -20px 80px rgba(0,0,0,0.25)",
      "0px -30px 120px rgba(0,0,0,0.35)",
    ],
  );

  return {
    progress: scrollYProgress,
    variant,
    y,
    scale,
    shadow,
  };
};
