import type { Variants } from "framer-motion";

export const stepVariants: Variants = {
  initial: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 80 : -80, // 👉 vine din dreapta / stânga
    scale: 0.98,
    filter: "blur(6px)",
  }),

  animate: {
    opacity: 1,
    x: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },

  exit: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? -60 : 60, // 👉 iese invers
    scale: 0.98,
    filter: "blur(6px)",
    transition: {
      duration: 0.35,
      ease: [0.4, 0, 1, 1] as const,
    },
  }),
};
