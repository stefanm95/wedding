import { cn } from "@utils/cn";
import { motion } from "framer-motion";
import type { ProgramItemType } from "./programData";

type Variant = "cinematic" | "mobile";

type Props = {
  item: ProgramItemType;
  index: number;
  variant: Variant;
};

/* ========================= */
/* 🎬 ANIMATION */
/* ========================= */

const itemAnim = {
  hidden: { opacity: 0, y: 60 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.3 + i * 0.25,
      duration: 0.7,
      ease: "easeOut" as const,
    },
  }),
};
export default function ProgramItem({ item, index, variant }: Props) {
  const isTransport = item.type === "transport";

  /* ========================= */
  /* 🎬 CINEMATIC (desktop + tablet) */
  /* ========================= */

  const X = [0, 260, 660, 960];
  const Y = [0, 220, 260, 120];

  if (variant === "cinematic") {
    return (
      <motion.div
        custom={index}
        initial="hidden"
        animate="visible"
        variants={itemAnim}
        className="absolute"
        style={{
          left: X[index],
          top: Y[index],
        }}
      >
        <ItemBlock item={item} isTransport={isTransport} />
      </motion.div>
    );
  }

  /* ========================= */
  /* 📱 MOBILE */
  /* ========================= */

  const mobileOffset = ["ml-0", "ml-5", "ml-2", "ml-6"];

  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={itemAnim}
      className={cn("relative flex items-start gap-4", mobileOffset[index], "mt-10 first:mt-0")}
    >
      <Dot isTransport={isTransport} />

      <div className="max-w-[260px]">
        <Content item={item} isTransport={isTransport} />
      </div>
    </motion.div>
  );
}

/* ========================= */
/* 🎯 ITEM BLOCK */
/* ========================= */

function ItemBlock({ item, isTransport }: { item: ProgramItemType; isTransport: boolean }) {
  return (
    <div className="relative">
      {/* subtle anchor line */}
      <div className="absolute left-0 top-[14px] h-[1px] w-10 bg-[#6b1f2b]/20" />

      {/* dot */}
      <div className="absolute -left-[6px] top-[10px]">
        <Dot isTransport={isTransport} />
      </div>

      {/* content */}
      <div className="max-w-[320px] pl-12">
        <Content item={item} isTransport={isTransport} />
      </div>
    </div>
  );
}

/* ========================= */
/* 🔧 DOT */
/* ========================= */

function Dot({ isTransport }: { isTransport: boolean }) {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.3 }}
      className={cn("h-3 w-3 rotate-45", isTransport ? "bg-[#c9a46c]" : "bg-[#6b1f2b]")}
    />
  );
}

/* ========================= */
/* ✍️ CONTENT */
/* ========================= */

function Content({ item, isTransport }: { item: ProgramItemType; isTransport: boolean }) {
  return (
    <>
      <p className="text-[13px] text-[#6b1f2b]/70">{item.time}</p>

      <p className="mt-2 text-[11px] uppercase tracking-[0.35em] text-[#6b1f2b]/60">
        {isTransport ? "Transport" : "Eveniment"}
      </p>

      <h3 className="script-cormorant-display mt-2 text-[30px] leading-tight text-[#3d2b1f]">
        {item.title}
      </h3>

      {item.location && <p className="mt-1 text-[15px] text-[#3d2b1f]/75">{item.location}</p>}

      {item.note && <p className="mt-1 text-[12px] italic text-[#6b1f2b]/60">{item.note}</p>}

      {item.mapLink && (
        <a
          href={item.mapLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-block text-[10px] uppercase tracking-[0.25em] text-[#4a1c24] hover:text-[#6b1f2b]"
        >
          ◆ Vezi pe hartă
        </a>
      )}
    </>
  );
}
