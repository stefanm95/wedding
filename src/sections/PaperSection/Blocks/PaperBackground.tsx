import { paperThemes, type PaperVariant } from "../../../utils/paperThemes";

type PaperTexture = "premium" | "premium2";

type Props = {
  variant?: PaperVariant;
  texture?: PaperTexture;
};

const PaperBackground = ({ variant = "golden" }: Props) => {
  const theme = paperThemes[variant];

  return (
    <div className='absolute inset-0 z-0'>
      {/* 🧻 BASE PAPER */}
      <div
        className='absolute inset-0'
        style={{
          backgroundColor: theme.baseColor,
          backgroundImage: "url('/assets/paper/paper.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* ✨ LIGHT */}
      <div
        className='absolute inset-0 pointer-events-none'
        style={{
          background: theme.lightGradient,
          opacity: 0.6,
        }}
      />

      {/* 🌫 DEPTH LIGHT */}
      <div
        className='absolute inset-0 pointer-events-none'
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

      {/* 🎞 GRAIN */}
      <div
        className='absolute inset-0 pointer-events-none'
        style={{
          backgroundImage: "url('/assets/base-grain/grain1.jpg')",
          opacity: 0.08,
          mixBlendMode: "overlay",
        }}
      />

      {/* 🌑 VIGNETTE */}
      <div
        className='absolute inset-0 pointer-events-none'
        style={{
          background: `
            radial-gradient(
              ellipse at center,
              transparent 55%,
              rgba(0,0,0,0.15) 100%
            )
          `,
        }}
      />
    </div>
  );
};

export default PaperBackground;
