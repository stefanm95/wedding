import { useTransform, type MotionValue } from "framer-motion";

type Options = {
  inputRange?: [number, number];
};

type Return = {
  smoothProgress: MotionValue<number>;
  isActive: MotionValue<number>;
  yParallax: MotionValue<number>;
};

export function useSectionScroll(progress: MotionValue<number>, options?: Options): Return {
  const range = options?.inputRange ?? [0, 1];

  // 🔥 normalize section slice
  const smoothProgress = useTransform(progress, range, [0, 1]);

  const isActive = useTransform(smoothProgress, [0.2, 0.5, 0.8], [0, 1, 0]);

  const yParallax = useTransform(smoothProgress, [0, 1], [40, -40]);

  return {
    smoothProgress,
    isActive,
    yParallax,
  };
}
