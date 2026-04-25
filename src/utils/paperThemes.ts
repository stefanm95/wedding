export type PaperVariant = "golden" | "evening" | "day";

export const paperThemes: Record<
  PaperVariant,
  {
    baseColor: string;
    lightGradient: string;
    overlay: string;

    // 🔥 NEW (material control)
    paperOpacity: number;
    depthOpacity: number;

    grainOpacity: number;
    grainSize: string;

    vignette: string;
    filter: string;
  }
> = {
  golden: {
    baseColor: "#f3efe7",

    lightGradient: `
      radial-gradient(
        circle at 28% 22%,
        rgba(255, 240, 200, 0.65),
        rgba(255, 220, 170, 0.25) 35%,
        transparent 65%
      ),
      linear-gradient(
        120deg,
        rgba(0,0,0,0.12),
        transparent 40%
      )
    `,

    overlay: "bg-white/20",

    paperOpacity: 0.24,
    depthOpacity: 0.12,

    grainOpacity: 0.06,
    grainSize: "180px",

    vignette: `
      radial-gradient(
        circle at 50% 40%,
        transparent 40%,
        rgba(0,0,0,0.14) 100%
      )
    `,

    filter: "contrast(1.05) brightness(1.04) saturate(1.02)",
  },

  evening: {
    baseColor: "#f2ebe5",

    lightGradient: `
  radial-gradient(
    circle at 30% 20%,
    rgba(255, 240, 200, 0.55),
    rgba(255, 220, 170, 0.25) 30%,
    transparent 60%
  ),
  radial-gradient(
    circle at 70% 80%,   // 🔥 NEW (jos)
    rgba(255, 240, 210, 0.25),
    transparent 60%
  ),
  linear-gradient(
    180deg,
    rgba(255,255,255,0.05),
    rgba(0,0,0,0.08)
  )
`,

    overlay: "bg-[#ffe4d6]/10",

    paperOpacity: 0.22,
    depthOpacity: 0.1,

    grainOpacity: 0.07,
    grainSize: "180px",

    vignette: `
  radial-gradient(
    circle at 50% 50%,   // 🔥 mutat din 40%
    transparent 55%,
    rgba(0,0,0,0.10) 100%
  )
`,

    filter: "contrast(1.05) brightness(1.02) saturate(0.98)",
  },

  day: {
    baseColor: "#f3efe7",

    lightGradient: `
      radial-gradient(
        circle at 28% 18%,
        rgba(255,255,255,0.7),
        rgba(255,255,255,0.3) 35%,
        transparent 65%
      ),
      linear-gradient(
        115deg,
        rgba(0,0,0,0.1),
        transparent 40%
      )
    `,

    overlay: "bg-white/15",

    paperOpacity: 0.22,
    depthOpacity: 0.1,

    grainOpacity: 0.05,
    grainSize: "180px",

    vignette: `
      radial-gradient(
        circle at 50% 35%,
        transparent 45%,
        rgba(0,0,0,0.12) 100%
      )
    `,

    filter: "contrast(1.04) brightness(1.03) saturate(0.98)",
  },
};
