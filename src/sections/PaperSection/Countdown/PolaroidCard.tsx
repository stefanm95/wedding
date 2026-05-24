import { optimizeCloudinaryUrl } from "@/utils/cloudinary";
import { motion } from "framer-motion";

const polaroidSrc = optimizeCloudinaryUrl(
  "https://res.cloudinary.com/djzw55eub/image/upload/v1779354943/wedding/couple/lavanda_zokn81_apl1rp.jpg",
  900,
);

export default function PolaroidCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      viewport={{ once: true }}
      className="relative"
    >
      <div className="relative w-full max-w-[340px] md:max-w-[520px]">
        <div className="relative overflow-hidden">
          <img
            alt="prima amintire"
            src={polaroidSrc}
            loading="lazy"
            decoding="async"
            sizes="(min-width: 768px) 520px, 340px"
            className="h-[240px] w-full object-cover brightness-[0.98] contrast-[0.92] saturate-[0.9] md:h-[420px]"
          />

          <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.15)]" />
          <div className="pointer-events-none absolute inset-0 bg-[#f4f1ea]/20 mix-blend-multiply" />
        </div>

        <p
          className="script-gary-display mt-5 text-center text-[#6b1f2b]/90 md:text-3xl"
          style={{ transform: "rotate(-0.6deg)" }}
        ></p>
      </div>
    </motion.div>
  );
}
