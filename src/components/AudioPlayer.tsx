import { useAudio } from "@/hooks/useAudio";
import { motion } from "framer-motion";

export default function AudioPlayer() {
  const { isPlaying, toggle } = useAudio();

  return (
    <motion.button
      onClick={toggle}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2 }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.96 }}
      className="fixed bottom-10 right-6 z-[999] flex items-center gap-3 rounded-full border border-white/10 bg-black/30 px-4 py-3 text-white backdrop-blur-md"
    >
      <motion.div
        animate={{
          scale: isPlaying ? [1, 1.2, 1] : 1,
          opacity: isPlaying ? 1 : 0.5,
        }}
        transition={{
          duration: 1.8,
          repeat: isPlaying ? Infinity : 0,
        }}
        className={`h-2 w-2 rounded-full ${isPlaying ? "bg-[#c9a46c]" : "bg-white/40"} `}
      />

      <span className="text-[11px] uppercase tracking-[0.25em]">
        {isPlaying ? "Music On" : "Music Off"}
      </span>
    </motion.button>
  );
}
