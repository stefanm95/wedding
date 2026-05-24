import { useHeroLight } from "@/hooks/useHeroLight";
import { paperThemes, type PaperVariant } from "@utils/paperThemes";
import { motion, useTransform, type MotionValue } from "framer-motion";

type Props = {
  progress: MotionValue<number>;
};

const variants: PaperVariant[] = ["day", "golden", "evening"];

const PaperBackgroundLayer = ({
  variant,
  opacity,
  light,
}: {
  variant: PaperVariant;
  opacity: MotionValue<number>;
  light: number;
}) => {
  const theme = paperThemes[variant];

  const boosted = light + Math.pow(light, 2) * 0.4;

  // 🔥 clamp (foarte important)
  const safeLight = Math.min(Math.max(boosted, 0), 2);

  // 🎯 poziție light fake (simplu dar stabil)
  const lightX = 55 + safeLight * 10;
  const lightY = 40 - safeLight * 5;

  return (
    <motion.div
      className="absolute inset-0"
      style={{
        opacity,
      }}
    >
      {/* BASE PAPER */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: theme.baseColor,
          backgroundImage:
            "url('https://res.cloudinary.com/djzw55eub/image/upload/v1779354887/wedding/paper/paper-white_j5m3t2_mpjo04.avif')",
          backgroundSize: "600px auto",
          backgroundRepeat: "repeat",
          backgroundPosition: "0 0",
        }}
      />

      {/* LIGHT (ONLY ONE SYSTEM) */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: 0.18 + safeLight * 0.25,
          background: `
  radial-gradient(
    circle at ${lightX}% ${lightY}%,
    rgba(255,255,255,0.18),
    transparent 60%
  )
`,
          mixBlendMode: "soft-light",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "rgba(107, 31, 43, 0.06)", // your deep red
          mixBlendMode: "multiply",
        }}
      />
    </motion.div>
  );
};

const PaperBackground = ({ progress }: Props) => {
  const light = useHeroLight();
  const dayOpacity = useTransform(progress, [0, 0.3, 0.5], [1, 0.4, 0]);
  const goldenOpacity = useTransform(progress, [0.2, 0.5, 0.8], [0, 1, 0]);
  const eveningOpacity = useTransform(progress, [0.6, 0.85, 1], [0, 0.6, 1]);

  return (
    <div className="absolute inset-0 z-0 bg-[#f4efe6]">
      {variants.map((variant) => (
        <PaperBackgroundLayer
          key={variant}
          variant={variant}
          light={light}
          opacity={
            variant === "day" ? dayOpacity : variant === "golden" ? goldenOpacity : eveningOpacity
          }
        />
      ))}
    </div>
  );
};

export default PaperBackground;
