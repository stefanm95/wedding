import type { PaperVariant } from "@utils/paperThemes";
import type { MotionValue } from "framer-motion";

export type PaperBlockProps = {
  variant: PaperVariant;
  progress: MotionValue<number>;
};
