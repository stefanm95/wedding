import { motion, useMotionTemplate, useTransform } from "framer-motion";
import { useEmbossLight } from "../../../hooks/useEmbossLight";
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
          className="text-[15px] text-[#6b1f2b]/80 font-serif tracking-wide"
        >
          {item.time}
        </motion.p>
      </div>

      {/* DOT */}
      <div
        className={`
    w-3 h-3 rotate-45
    ${isTransport ? "bg-[#c9a46c]" : "bg-[#6b1f2b]"}
  `}
        style={{
          boxShadow: "0.5px 0.5px 1px rgba(0,0,0,0.25)",
        }}
      />

      {/* CONTENT */}
      <div className="max-w-[420px]">
        {/* TYPE */}
        <motion.p
          style={{ textShadow: shadowSoft }}
          className="text-[10px] tracking-[0.5em] text-[#6b1f2b] mb-3 uppercase"
        >
          {isTransport ? "Transport" : "Eveniment"}
        </motion.p>

        {/* TITLE */}
        <motion.h3
          style={{ textShadow: shadowMain }}
          className="text-[26px] text-[#3d2b1f] script-cormorant-display mb-2 leading-snug"
        >
          {item.title}
        </motion.h3>

        {/* LOCATION */}
        {item.location && (
          <motion.p
            style={{ textShadow: shadowSoft }}
            className="text-[15px] text-[#3d2b1f]/80 mb-3"
          >
            {item.location}
          </motion.p>
        )}

        {/* NOTE */}
        {item.note && (
          <motion.p
            style={{ textShadow: shadowDeboss }}
            className="text-[14px] text-[#6b1f2b]/60 italic mb-3"
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
            className="
    relative
    inline-flex items-center gap-2
    text-[12px]
    tracking-[0.3em]
    uppercase
    font-medium
    text-[#4a1c24]
    transition
    group
  "
          >
            {/* mic marker tipografic */}
            <span className="text-[#c9a46c] text-[9px] translate-y-[-1px]">
              ◆
            </span>

            {/* TEXT */}
            <span
              className="
      relative
      z-10
      transition
      group-hover:text-[#6b1f2b]
      group-hover:tracking-[0.35em]
    "
              style={{
                textShadow: "0.3px 0.3px 0 rgba(0,0,0,0.15)", // 🔥 emboss feel
              }}
            >
              Vezi pe hartă
            </span>

            {/* 🔥 underline premium (nu mai mișcă layout) */}
            <span
              className="
      absolute left-0 bottom-0
      h-[1px] w-full
      bg-[#c9a46c]/70
      origin-left
      scale-x-0
      group-hover:scale-x-100
      transition-transform duration-300
    "
            />
          </a>
        )}
      </div>
    </div>
  );
}
