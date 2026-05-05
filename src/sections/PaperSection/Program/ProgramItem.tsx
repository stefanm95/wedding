import { useDevice } from "@/hooks/useDevice";
import { cn } from "@utils/cn";
import { motion } from "framer-motion";
import type { ProgramItemType } from "./programData";

type Variant = "cinematic" | "mobile";

type LayoutPreset = {
  X: string[];
  Y: string[];
  content: string;
};

/* ========================= */
/* 🎯 PRESETS */
/* ========================= */

const presets: Record<"desktop" | "laptop" | "tablet", LayoutPreset> = {
  desktop: {
    X: ["0%", "20%", "52%", "80%"],
    Y: ["0%", "30%", "0%", "30%"],
    content: "max-w-[320px]",
  },

  laptop: {
    // 🔥 1024–1279
    X: ["0%", "20%", "58%", "80%"],
    Y: ["0%", "38%", "68%", "24%"],
    content: "max-w-[260px]",
  },

  tablet: {
    X: ["0%", "0", "30%", "70%"],
    Y: ["15%", "35%", "55%", "70%"],
    content: "max-w-[240px]",
  },
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

type Props = {
  item: ProgramItemType;
  index: number;
  variant: Variant;
};

export default function ProgramItem({ item, index, variant }: Props) {
  const isTransport = item.type === "transport";
  const device = useDevice();

  /* ========================= */
  /* 🎯 PRESET SELECTION */
  /* ========================= */

  const preset = device.isDesktop
    ? device.isTablet
      ? presets.laptop // fallback safety (rare)
      : presets.desktop
    : device.isTablet
      ? presets.laptop
      : presets.tablet;

  const { X, Y, content } = preset;

  /* ========================= */
  /* 🎬 CINEMATIC */
  /* ========================= */

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
          transform: "translate(-50%, -50%)",
        }}
      >
        <ItemBlock item={item} isTransport={isTransport} contentClass={content} />
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

      <div className={cn("pl-4", content)}>
        <Content item={item} isTransport={isTransport} />
      </div>
    </motion.div>
  );
}

/* ========================= */
/* 🎯 ITEM BLOCK */
/* ========================= */

function ItemBlock({
  item,
  isTransport,
  contentClass,
}: {
  item: ProgramItemType;
  isTransport: boolean;
  contentClass: string;
}) {
  return (
    <div className="relative">
      {/* line */}
      <div className="absolute left-0 top-[14px] h-[1px] w-10 bg-[#6b1f2b]/20" />

      {/* dot */}
      <div className="absolute -left-[6px] top-[10px]">
        <Dot isTransport={isTransport} />
      </div>

      {/* content */}
      <div className={cn("pl-12", contentClass)}>
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
      <p className="text-[12px] text-[#6b1f2b]/70 lg:text-[13px]">{item.time}</p>

      <p className="mt-2 text-[10px] uppercase tracking-[0.35em] text-[#6b1f2b]/60 lg:text-[11px]">
        {isTransport ? "Transport" : "Eveniment"}
      </p>

      <h3 className="script-cormorant-display mt-2 text-[24px] leading-tight text-[#3d2b1f] lg:text-[30px]">
        {item.title}
      </h3>

      {item.location && (
        <p className="mt-1 text-[13px] text-[#3d2b1f]/75 lg:text-[15px]">{item.location}</p>
      )}

      {item.note && (
        <p className="mt-1 text-[11px] italic text-[#6b1f2b]/60 lg:text-[12px]">{item.note}</p>
      )}

      {item.mapLink && (
        <a
          href={item.mapLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-block text-[9px] uppercase tracking-[0.25em] text-[#4a1c24] hover:text-[#6b1f2b] lg:text-[10px]"
        >
          ◆ Vezi pe hartă
        </a>
      )}
    </>
  );
}
