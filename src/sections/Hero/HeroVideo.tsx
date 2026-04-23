import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import CinematicOverlay from "../../components/CinematicOverlay";

type Props = {
  opened: boolean;
};

export default function HeroVideo({ opened }: Props) {
  const [ready, setReady] = useState(false);
  const [light, setLight] = useState(0);

  // 🔥 light sync din WebGL
  useEffect(() => {
    const id = setInterval(() => {
      // @ts-ignore
      setLight(window.__heroLight || 0);
    }, 16);

    return () => clearInterval(id);
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* 🎬 VIDEO */}
      <motion.video
        autoPlay
        muted
        loop
        playsInline
        onCanPlay={() => setReady(true)}
        className="w-full h-full object-cover"
        initial={{ opacity: 0, scale: 1.08 }}
        animate={
          opened && ready
            ? { opacity: 1, scale: 1.02 }
            : {}
        }
        transition={{ duration: 1.6, ease: "easeOut" }}
      >
        <source src="/assets/video/hero.mp4" type="video/mp4" />
      </motion.video>

      {/* 🌫 exposure + focus */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 1 }}
        animate={opened && ready ? { opacity: 0 } : {}}
        transition={{ duration: 1.8 }}
        style={{
          background: `
            radial-gradient(circle at 50% 40%, rgba(255,255,255,0.25), transparent 60%),
            rgba(0,0,0,0.55)
          `,
          backdropFilter: "blur(6px)",
        }}
      />

      {/* 🌑 final overlay */}
      <div className="absolute inset-0 bg-black/45" />

      <CinematicOverlay intensity={1} />

      {/* ✨ TEXT */}
      <div className="absolute inset-0 flex items-center justify-center text-center px-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={opened && ready ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
        >
          {/* SCRIPT */}
          <motion.p
            className="script-castlegar text-8xl tracking-[0.6em] text-white/90 mb-12"
            initial={{ opacity: 0, y: 10 }}
            animate={opened && ready ? { opacity: 0.8, y: 0 } : {}}
            transition={{ delay: 0.8 }}
          >
            noi doi
          </motion.p>

          {/* MAIN */}
          <motion.h1
            className="script-cormorant-body text-7xl text-white/80"
            initial={{ opacity: 0, y: 40 }}
            animate={opened && ready ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.2 }}
            style={{
              textShadow: `
                0 0 ${20 + light * 40}px rgba(255,220,160,${
                0.15 + light * 0.3
              }),
                0 0 ${60 + light * 80}px rgba(255,200,120,${
                0.08 + light * 0.2
              })
              `,
            }}
          >
            Denisa & Iuli
          </motion.h1>

          {/* SUBTEXT */}
          <motion.p
            className="script-cormorant-body tracking-[0.6em] text-base mt-6 text-white/70"
            initial={{ opacity: 0, y: 20 }}
            animate={opened && ready ? { opacity: 0.9, y: 0 } : {}}
            transition={{ delay: 1.5 }}
          >
            22 August 2026
          </motion.p>
          <motion.p
            className="script-cormorant-body text-white/70"
            initial={{ opacity: 0, y: 20 }}
            animate={opened && ready ? { opacity: 0.9, y: 0 } : {}}
            transition={{ delay: 1.5 }}
          >
            Padurile Regale
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}