import Story from "@paper/Story/Story";
import type { PaperBlockProps } from "@/types/paper";
import { cn } from "@/utils/cn";

export default function PaperStoryBlock({ variant }: PaperBlockProps) {
  return (
    <section
      id="story"
      data-paper-variant={variant}
      className="relative bg-transparent pb-24 pt-20 opacity-90 md:pb-32 md:pt-32 lg:pb-40"
    >
      {/* HEADER */}
      <div className="mx-auto mb-12 mt-[4em] h-[12vh] max-w-3xl px-6 text-center md:mb-14 lg:mb-16">
        <p className="mb-4 font-[Castlegar_Caps] uppercase tracking-[0.4em] text-[#6b1f2b]/60">
          Povestea noastră
        </p>

        <h2 className="script-castlegar text-4xl text-[#6b1f2b] md:text-5xl">
          Cum a început totul
        </h2>
      </div>
      {/* 🧻 BACKGROUND ELEMENT */}
      <div className="pointer-events-none absolute inset-0 flex justify-center opacity-90">
        <img
          alt="paper"
          src="/assets/paper/paper-split6.avif"
          className={cn(
            "w-full max-w-[1400px] mix-blend-multiply",
            variant === "day" && "opacity-20",
            variant === "golden" && "opacity-30",
            variant === "evening" && "opacity-40",
          )}
        />
      </div>

      {/* 📄 CONTENT */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 md:px-12">
        <Story />
      </div>
    </section>
  );
}
