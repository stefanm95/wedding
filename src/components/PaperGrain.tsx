import { motion } from "framer-motion";
import { optimizeCloudinaryUrl } from "@/utils/cloudinary";

const grainSrc = optimizeCloudinaryUrl(
  "https://res.cloudinary.com/djzw55eub/image/upload/v1779354916/wedding/grain/grain2_icfdek_ycvbqh.jpg",
  320,
);

export default function PaperGrain() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.25 }}
      transition={{ duration: 1 }}
      className="pointer-events-none absolute inset-0 z-[1]"
      style={{
        backgroundImage:
          `url('${grainSrc}')`,
        backgroundSize: "300px",
        mixBlendMode: "multiply",
      }}
    />
  );
}
