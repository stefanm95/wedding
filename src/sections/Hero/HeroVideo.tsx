import { motion } from "framer-motion";

type Props = {
  opened: boolean;
};

export default function HeroVideo({ opened }: Props) {
  return (
    <motion.div
      className="absolute inset-0 z-0 overflow-hidden"
      animate={opened ? { scale: 1.05 } : { scale: 1 }}
      transition={{ duration: 2.5, ease: "easeOut" }}
    >
      {/* 🎬 VIDEO */}
      <video autoPlay muted loop className="w-full h-full object-cover">
        <source src="assets/video/hero.mp4" type="video/mp4" />
      </video>

      {/* 🌑 DARK CINEMATIC OVERLAY */}
      <div className="absolute inset-0 bg-black/50" />

      {/* 🌫 LIGHT FOCUS */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 40%, rgba(255,255,255,0.18), transparent 60%)",
        }}
      />

      {/* 🌿 PARTICLES (fake petals) */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white/70 rounded-full"
            style={{
              width: "6px",
              height: "6px",
              left: `${Math.random() * 100}%`,
              top: "-10%",
            }}
            animate={{
              y: "120vh",
              x: [0, Math.random() * 40 - 20],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* ✨ TEXT */}
      <div className="absolute inset-0 flex items-center justify-center text-center px-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={opened ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
        >
          {/* SCRIPT */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={opened ? { opacity: 0.8, y: 0 } : {}}
            transition={{ delay: 0.8 }}
            className="script-castlegar text-8xl tracking-[0.6em] text-white/90 mb-12"
          >
            noi doi
          </motion.p>

          {/* MAIN */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={
              opened
                ? {
                    opacity: 1,
                    y: 0,
                  }
                : {}
            }
            transition={{ duration: 1.4 }}
            className="script-cormorant-body text-7xl text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
          >
            Denisa & Iuli
          </motion.h1>

          {/* SUBTEXT - NASI */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={opened ? { opacity: 0.9, y: 0 } : {}}
            transition={{ delay: 1.4 }}
            className="script-cormorant-body text-base mb-8 text-white"
          >
            Alaturi de x si y, ne bucuram de acest inceput nou si plin de speranta.
          </motion.p>

          {/* SUBTEXT - DATA */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={opened ? { opacity: 0.9, y: 0 } : {}}
            transition={{ delay: 1.4 }}
            className="script-cormorant-display mt-6 text-3xl text-white/90"
          >
            20 August 2026
          </motion.p>

          {/* SUBTEXT - RESTAURANT */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={opened ? { opacity: 0.9, y: 0 } : {}}
            transition={{ delay: 1.4 }}
            className="script-cormorant-body text-lg text-white/90"
          >
            Padurile Regale
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  );
}