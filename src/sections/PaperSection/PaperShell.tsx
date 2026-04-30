import { motion, type MotionValue } from "framer-motion";
import type { ReactNode, Ref } from "react";
import { cn } from "@utils/cn";

type Props = {
  sectionRef: Ref<HTMLElement>;
  className?: string;
  y: MotionValue<number>;
  scale: MotionValue<number>;
  shadow: MotionValue<string>;
  children: ReactNode;
};

export default function PaperShell({ sectionRef, className, y, scale, shadow, children }: Props) {
  return (
    <section ref={sectionRef} className={cn("relative z-20", className)}>
      <motion.div
        className="relative min-h-full overflow-hidden"
        style={{
          y,
          scale,
          boxShadow: shadow,
        }}
      >
        {children}
      </motion.div>
    </section>
  );
}
