import type { PaperBlockProps } from "@/types/paper";
import { cn } from "@/utils/cn";
import Story from "@paper/Story/Story";

export default function PaperStoryBlock({ variant }: PaperBlockProps) {
  return (
    <section
      id="story"
      data-paper-variant={variant}
      className="relative bg-transparent pb-24 pt-16 opacity-90 md:pb-32 md:pt-24 lg:pb-40"
    >
      {/* HEADER */}
      <div className="mx-auto mb-8 mt-[4em] h-[12vh] max-w-3xl px-6 text-center md:mb-6 lg:mb-8">
        <p className="mb-4 text-3xl font-[Castlegar_Caps] uppercase tracking-[0.4em] text-[#6b1f2b]/60">
          Povestea noastră
        </p>

        <h2 className="script-gary-display text-4xl text-[#6b1f2b] md:text-5xl"></h2>
      </div>
      {/* 🧻 BACKGROUND ELEMENT */}
      <div className="pointer-events-none absolute inset-0 flex justify-center opacity-90">
        <img
          alt="paper"
          src="https://res.cloudinary.com/djzw55eub/image/upload/v1779354886/wedding/paper/paper-split6_ufskgd_dzxttz.avif"
          className={cn(
            "w-full max-w-[1400px] mix-blend-multiply",
            variant === "day" && "opacity-20",
            variant === "golden" && "opacity-30",
            variant === "evening" && "opacity-40",
          )}
        />
      </div>

      {/* 📄 CONTENT */}
      <div className="relative z-10 mx-auto max-w-6xl">
        <Story />
      </div>
    </section>
  );
}
