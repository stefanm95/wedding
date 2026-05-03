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

  const y = useTransform(scrollYProgress, [0, 1], [0, -180]);

  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.6, 0.9], [1, 1, 0.7, 0]);

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  const blurText = useTransform(scrollYProgress, [0.7, 1], ["blur(0px)", "blur(14px)"]);

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

  const revealProgress = useTransform(scrollYProgress, [0, 0.15], [0, 1]);
  const navY = useTransform(revealProgress, [0, 1], [10, 0]);
  const navOpacity = useTransform(revealProgress, [0, 1], [0, 1]);

  const navItemY1 = useTransform(revealProgress, [0, 1], [12, 0]);
  const navItemY2 = useTransform(revealProgress, [0, 1], [18, 0]);
  const navItemY3 = useTransform(revealProgress, [0, 1], [24, 0]);
  const navItemY4 = useTransform(revealProgress, [0, 1], [30, 0]);

  const navItemOpacity = useTransform(revealProgress, [0, 1], [0, 1]);

  const navItems = [
    { id: "paper-hero", label: "invitație", y: navItemY1 },
    { id: "story", label: "poveste", y: navItemY2 },
    { id: "program", label: "program", y: navItemY3 },
    { id: "rsvp", label: "rsvp", y: navItemY4 },
  ];

  return (
    <div>
      <div className="pointer-events-none absolute inset-0 z-20">
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
              className="script-cormorant-body text-7xl text-white"
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
              className="mt-6 text-base tracking-[0.3em] text-white/80"
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 0.9, y: 0 },
              }}
            >
              22 August 2026
            </motion.p>

            <motion.p
              className="script-cormorant tracking-[0.125em] text-white/80"
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
      <motion.div
        className="pointer-events-auto absolute left-10 top-12 z-30 flex gap-6 text-[11px] tracking-[0.4em] text-white/70"
        style={{
          opacity: opened ? navOpacity : 0,
          y: navY,
        }}
      >
        {navItems.map((item) => (
          <motion.button
            key={item.id}
            style={{
              opacity: navItemOpacity,
              y: item.y,
            }}
            onClick={() => {
              const el = document.getElementById(item.id);
              if (!el) return;

              const y = el.getBoundingClientRect().top + window.scrollY;

              window.scrollTo({
                top: y - 40,
                behavior: "smooth",
              });
            }}
            className="text-left transition-all duration-500 hover:tracking-[0.5em] hover:text-white"
          >
            {item.label}
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
}
