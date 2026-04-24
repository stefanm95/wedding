import { useRef } from "react";
import { useScroll, useTransform, type MotionValue } from "framer-motion";

type Offset = NonNullable<Parameters<typeof useScroll>[0]>["offset"];

type Options = {
  offset?: Offset;
};

type Return = {
  ref: React.RefObject<HTMLElement | null>;
  progress: MotionValue<number>;
  smoothProgress: MotionValue<number>;
  isActive: MotionValue<number>;
  yParallax: MotionValue<number>;
};

export function useSectionScroll(options?: Options): Return {
  const ref = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: options?.offset ?? ["start end", "end start"],
  });

  // 🔥 smooth cinematic curve
  const smoothProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // 🔥 active zone (middle)
  const isActive = useTransform(scrollYProgress, [0.3, 0.5, 0.7], [0, 1, 0]);

  // 🔥 parallax
  const yParallax = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return {
    ref,
    progress: scrollYProgress,
    smoothProgress,
    isActive,
    yParallax,
  };
}
