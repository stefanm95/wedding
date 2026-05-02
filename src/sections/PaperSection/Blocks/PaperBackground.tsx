import { motion, useTransform, type MotionValue } from "framer-motion";
import { paperThemes, type PaperVariant } from "@utils/paperThemes";

type Props = {
  progress: MotionValue<number>;
};

const variants: PaperVariant[] = ["day", "golden", "evening"];

const PaperBackgroundLayer = ({
  variant,
  opacity,
}: {
  variant: PaperVariant;
  opacity: MotionValue<number>;
}) => {
  const theme = paperThemes[variant];

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
          backgroundImage: "url('/assets/paper/paper-white.avif')",
          backgroundSize: "600px auto",
          backgroundRepeat: "repeat",
          backgroundPosition: "0 0",
        }}
      />

      {/* LIGHT (ONLY ONE SYSTEM) */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: theme.lightGradient,
          opacity: 0.25,
        }}
      />
    </motion.div>
  );
};

const PaperBackground = ({ progress }: Props) => {
  const dayOpacity = useTransform(progress, [0, 0.3, 0.5], [1, 0.4, 0]);
  const goldenOpacity = useTransform(progress, [0.2, 0.5, 0.8], [0, 1, 0]);
  const eveningOpacity = useTransform(progress, [0.6, 0.85, 1], [0, 0.6, 1]);

  return (
    <div className="absolute inset-0 z-0 bg-[#f4efe6]">
      {variants.map((variant) => (
        <PaperBackgroundLayer
          key={variant}
          variant={variant}
          opacity={
            variant === "day" ? dayOpacity : variant === "golden" ? goldenOpacity : eveningOpacity
          }
        />
      ))}
    </div>
  );
};

export default PaperBackground;
