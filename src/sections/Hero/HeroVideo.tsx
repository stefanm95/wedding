import { motion } from "framer-motion";
import { useEffect, useState } from "react";


type Props = {
  opened: boolean;
};

export default function HeroVideo({ opened }: Props) {
  const [light, setLight] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      // @ts-ignore
      setLight(window.__heroLight || 0);
    }, 16);

    return () => clearInterval(id);
  }, []);

  return (
    <div className="absolute inset-0 z-10 pointer-events-none">
      {/* 🌑 overlay */}
      <div className="absolute inset-0 bg-black/45" />

      

      {/* ✨ TEXT */}
      <div className="absolute inset-0 flex items-center justify-center text-center px-6">
        <motion.div
          initial="hidden"
          animate={opened ? "show" : "hidden"}
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.12, // 🔥 rapid, cinematic
              },
            },
          }}
        >
          {/* SCRIPT */}
          <motion.p
            className="script-castlegar text-8xl tracking-[0.6em] text-white/90 mb-12"
            variants={{
              hidden: { opacity: 0, y: 10, filter: "blur(8px)" },
              show: {
                opacity: 0.8,
                y: 0,
                filter: "blur(0px)",
                transition: { duration: 0.8, ease: "easeOut" },
              },
            }}
          >
            noi doi
          </motion.p>

          {/* MAIN */}
          <motion.h1
            className="script-cormorant-body text-7xl text-white/80"
            variants={{
              hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
              show: {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                transition: { duration: 1, ease: "easeOut" },
              },
            }}
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

          {/* DATE */}
          <motion.p
            className="script-cormorant-body tracking-[0.6em] text-base mt-6 text-white/70"
            variants={{
              hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
              show: {
                opacity: 0.9,
                y: 0,
                filter: "blur(0px)",
                transition: { duration: 0.7 },
              },
            }}
          >
            22 August 2026
          </motion.p>

          {/* LOCATION */}
          <motion.p
            className="script-cormorant-body text-white/70"
            variants={{
              hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
              show: {
                opacity: 0.9,
                y: 0,
                filter: "blur(0px)",
                transition: { duration: 0.7 },
              },
            }}
          >
            Padurile Regale
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}