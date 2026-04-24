import { motion } from "framer-motion";

export default function StoryBlock(): React.ReactNode {
  return (
    <div className="text-center mb-40 max-w-2xl mx-auto">
      <h2 className="heading-lg text-[#6b1f2b] mb-8">Povestea noastră</h2>

      <motion.p
        initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="text-center text-[#6b1f2b]/80 leading-relaxed"
      >
        Ne-am întâlnit într-un mod simplu...
      </motion.p>
    </div>
  );
}
