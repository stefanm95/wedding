import { motion, useTransform, type MotionValue } from "framer-motion";
import { paperThemes, type PaperVariant } from "@utils/paperThemes";

type PaperTexture = "premium" | "premium2";

type Props = {
  progress: MotionValue<number>;
  texture?: PaperTexture;
};

const variants: PaperVariant[] = ["day", "golden", "evening"];

const PaperBackgroundLayer = ({
  variant,
  opacity,
}: {
  variant: PaperVariant;
  opacity: MotionValue<number> | number;
}) => {
  const theme = paperThemes[variant];

  return (
    <motion.div
      className="absolute inset-0"
      style={{
        opacity,
        filter: theme.filter,
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: theme.baseColor,
          backgroundImage: "url('/assets/paper/paper.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "20% 20%",
          backgroundRepeat: "no-repeat",
        }}
      />

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: theme.lightGradient,
          opacity: 0.6,
        }}
      />

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(
              circle at 50% 40%,
              rgba(255,255,255,0.12),
              transparent 60%
            )
          `,
          mixBlendMode: "soft-light",
        }}
      />

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "url('/assets/base-grain/grain1.jpg')",
          backgroundSize: theme.grainSize,
          opacity: theme.grainOpacity,
          mixBlendMode: "overlay",
        }}
      />

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: theme.vignette,
        }}
      />
    </motion.div>
  );
};

const PaperBackground = ({ progress, texture = "premium" }: Props) => {
  const dayOpacity = useTransform(progress, [0, 0.3, 0.5], [1, 0.35, 0]);
  const goldenOpacity = useTransform(progress, [0.15, 0.45, 0.75], [0, 1, 0]);
  const eveningOpacity = useTransform(progress, [0.5, 0.8, 1], [0, 0.75, 1]);

  const opacities = {
    day: dayOpacity,
    golden: goldenOpacity,
    evening: eveningOpacity,
  };

  return (
    <div data-paper-texture={texture} className="absolute inset-0 z-0 bg-[#f4efe6]">
      {variants.map((layer) => (
        <PaperBackgroundLayer key={layer} variant={layer} opacity={opacities[layer]} />
      ))}
    </div>
  );
};

export default PaperBackground;
