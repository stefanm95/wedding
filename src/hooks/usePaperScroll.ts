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
    offset: ["start end", "end start"], // 🔥 smoother full-section tracking
  });

  const [variant, setVariant] = useState<PaperVariant>("day");
  const variantRef = useRef<PaperVariant>("day");

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const next = getVariantFromProgress(progress);

    if (variantRef.current !== next) {
      variantRef.current = next;
      setVariant(next);
    }
  });

  // 🎬 cinematic transforms
  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.96, 1]);

  const shadow = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [
      "0px -10px 40px rgba(0,0,0,0.12)",
      "0px -30px 100px rgba(0,0,0,0.25)",
      "0px -60px 160px rgba(0,0,0,0.35)",
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
