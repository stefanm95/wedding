import { motion } from "framer-motion";

type Props = {
  points: { x: number; y: number }[];
};

export default function ProgramPath({ points }: Props) {
  if (!points.length) return null;

  const path = points.reduce((acc, point, i) => {
    if (i === 0) return `M ${point.x} ${point.y}`;

    const prev = points[i - 1];

    return acc + ` L ${prev.x} ${point.y}` + ` L ${point.x} ${point.y}`;
  }, "");

  return (
    <svg className="pointer-events-none absolute inset-0 h-full w-full">
      <motion.path
        d={path}
        fill="none"
        stroke="rgba(107,31,43,0.2)"
        strokeWidth="1.2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          duration: 1.6,
          ease: "easeInOut",
        }}
      />
    </svg>
  );
}
