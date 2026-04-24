export type PaperVariant = "golden" | "evening" | "day";

export const paperThemes: Record<
  PaperVariant,
  {
    baseColor: string;
    lightGradient: string;
    overlay: string;
  }
> = {
  golden: {
    baseColor: "#f3efe7",
    lightGradient:
      "radial-gradient(circle at 50% 20%, rgba(255, 240, 200, 0.6), transparent 60%)",
    overlay: "bg-white/20",
  },

  evening: {
    baseColor: "#f2ebe5",
    lightGradient:
      "radial-gradient(circle at 50% 25%, rgba(255, 210, 190, 0.45), transparent 65%)",
    overlay: "bg-[#ffe4d6]/10",
  },

  day: {
    baseColor: "#f6f3ed",
    lightGradient:
      "radial-gradient(circle at 50% 15%, rgba(255, 255, 255, 0.6), transparent 55%)",
    overlay: "bg-white/25",
  },
};
