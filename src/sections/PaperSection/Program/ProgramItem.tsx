import { motion, useMotionTemplate, useTransform } from "framer-motion";
import { useEmbossLight } from "@hooks/useEmbossLight";
import { cn } from "@utils/cn";
import type { ProgramItemType } from "./programData";

type Props = {
  item: ProgramItemType;
};

export default function ProgramItem({ item }: Props) {
  const isTransport = item.type === "transport";

  const { x, y } = useEmbossLight();

  const shadowMain = useMotionTemplate`
    ${x}px ${y}px 0 rgba(0,0,0,0.18)
  `;

  const shadowSoft = useMotionTemplate`
    ${x}px ${y}px 0 rgba(0,0,0,0.12)
  `;

  const xInverse = useTransform(x, (v) => -v);
  const yInverse = useTransform(y, (v) => -v);

  const shadowDeboss = useMotionTemplate`
  ${xInverse}px ${yInverse}px 0 rgba(255,255,255,0.4)
`;

  return (
    <div className="relative flex items-start gap-8">
      {/* TIME */}
      <div className="w-[70px] text-right">
        <motion.p
          style={{ textShadow: shadowMain }}
          className="font-serif text-[15px] tracking-wide text-[#6b1f2b]/80"
        >
          {item.time}
        </motion.p>
      </div>

      {/* DOT */}
      <div
        className={cn("h-3 w-3 rotate-45", isTransport ? "bg-[#c9a46c]" : "bg-[#6b1f2b]")}
        style={{
          boxShadow: "0.5px 0.5px 1px rgba(0,0,0,0.25)",
        }}
      />

      {/* CONTENT */}
      <div className="max-w-[420px]">
        {/* TYPE */}
        <motion.p
          style={{ textShadow: shadowSoft }}
          className="mb-3 text-[10px] uppercase tracking-[0.5em] text-[#6b1f2b]"
        >
          {isTransport ? "Transport" : "Eveniment"}
        </motion.p>

        {/* TITLE */}
        <motion.h3
          style={{ textShadow: shadowMain }}
          className="script-cormorant-display mb-2 text-[26px] leading-snug text-[#3d2b1f]"
        >
          {item.title}
        </motion.h3>

        {/* LOCATION */}
        {item.location && (
          <motion.p
            style={{ textShadow: shadowSoft }}
            className="mb-3 text-[15px] text-[#3d2b1f]/80"
          >
            {item.location}
          </motion.p>
        )}

        {/* NOTE */}
        {item.note && (
          <motion.p
            style={{ textShadow: shadowDeboss }}
            className="mb-3 text-[14px] italic text-[#6b1f2b]/60"
          >
            {item.note}
          </motion.p>
        )}

        {/* MAP LINK (🔥 refined) */}
        {item.mapLink && (
          <a
            href={item.mapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.3em] text-[#4a1c24] transition"
          >
            {/* mic marker tipografic */}
            <span className="translate-y-[-1px] text-[9px] text-[#c9a46c]">◆</span>

            {/* TEXT */}
            <span
              className="relative z-10 transition group-hover:tracking-[0.35em] group-hover:text-[#6b1f2b]"
              style={{
                textShadow: "0.3px 0.3px 0 rgba(0,0,0,0.15)", // 🔥 emboss feel
              }}
            >
              Vezi pe hartă
            </span>

            {/* 🔥 underline premium (nu mai mișcă layout) */}
            <span className="absolute bottom-0 left-0 h-[1px] w-full origin-left scale-x-0 bg-[#c9a46c]/70 transition-transform duration-300 group-hover:scale-x-100" />
          </a>
        )}
      </div>
    </div>
  );
}
