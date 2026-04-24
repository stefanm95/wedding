import { forwardRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default forwardRef(function PaperSection({ children }: any, ref) {
  const { scrollY } = useScroll();

  const y = useTransform(scrollY, [0, 500], [0, -40]);

  return (
    <motion.section
      ref={ref}
      className="relative z-20 min-h-screen py-32 px-6 overflow-hidden"
      style={{ y }}
    >
      {/* texture */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/assets/base-paper/paperboard-texture.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="absolute inset-0 bg-black/10 z-0" />

      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/assets/base-grain2.jpg')",
          opacity: 0.05,
          mixBlendMode: "overlay",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto">{children}</div>
    </motion.section>
  );
})
