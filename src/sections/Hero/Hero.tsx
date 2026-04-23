import { useState } from "react";
import HeroVideo from "./HeroVideo";
import HeroIntro from "./HeroIntro";
import { motion } from "framer-motion";

export default function Hero() {
  const [opened, setOpened] = useState(false);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black">
      
      {/* 🎬 VIDEO BACKGROUND */}
      <HeroVideo opened={opened} />

      {/* 🎭 INTRO OVERLAY */}
      {!opened && (
        <HeroIntro onOpen={() => setOpened(true)} />
      )}

      {/* 🕯 subtle fade in (optional polish) */}
      {!opened && (
        <motion.div
          className="absolute inset-0 bg-black z-30 pointer-events-none"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1 }}
        />
      )}
    </div>
  );
}