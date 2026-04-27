import { motion, useTransform, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import type { HeroVideoProps } from "@/types/hero";

export default function HeroVideo({ opened, paperRef }: HeroVideoProps) {
  const [light, setLight] = useState(0);

  // 🔥 SINGLE SOURCE OF TRUTH
  const { scrollYProgress } = useScroll({
    target: paperRef,
    offset: ["start end", "start start"],
  });

  // 🎬 TEXT MOVE
  const y = useTransform(scrollYProgress, [0, 1], [0, 220]);

  // 🎬 FADE OUT
  const opacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 0.4, 0]);

  // 🎬 SCALE
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);

  // 🎬 TEXT BLUR
  const blurText = useTransform(scrollYProgress, [0.6, 1], ["blur(0px)", "blur(10px)"]);

  // 🔥 păstrăm glow-ul tău
  useEffect(() => {
    let rafId: number;

    const animate = () => {
      const target = typeof window.__heroLight === "number" ? window.__heroLight : 0;

      setLight((prev) => prev + (target - prev) * 0.12);

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, []);

  const boosted = light + Math.pow(light, 3) * 0.5;

  return (
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute inset-0 flex items-center justify-center text-center">
        <motion.div
          style={{
            y,
            opacity,
            scale,
            filter: blurText,
          }}
          initial="hidden"
          animate={opened ? "show" : "hidden"}
          variants={{
            hidden: {},
            show: {
              transition: { staggerChildren: 0.12 },
            },
          }}
        >
          <motion.p
            className="script-castlegar mb-12 text-8xl text-white/90"
            variants={{
              hidden: { opacity: 0, y: 10, filter: "blur(8px)" },
              show: {
                opacity: 0.8,
                y: 0,
                filter: "blur(0px)",
                transition: { duration: 0.8 },
              },
            }}
          >
            noi doi
          </motion.p>

          <motion.h1
            className="script-cormorant-body text-7xl text-white/80"
            variants={{
              hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
              show: {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                transition: { duration: 1 },
              },
            }}
            style={{
              textShadow: `
                0 0 ${30 + boosted * 80}px rgba(255,220,160,${0.2 + boosted * 0.5}),
                0 0 ${80 + boosted * 160}px rgba(255,200,120,${0.1 + boosted * 0.35})
              `,
            }}
          >
            Denisa & Iuli
          </motion.h1>

          <motion.p
            className="mt-6 text-base tracking-[0.6em] text-white/70"
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 0.9, y: 0 },
            }}
          >
            22 August 2026
          </motion.p>

          <motion.p
            className="script-cormorant tracking-[0.08em] text-white/70"
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 0.9, y: 0 },
            }}
          >
            Padurile Regale
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
