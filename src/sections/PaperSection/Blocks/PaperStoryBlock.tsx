import Story from "@paper/Story/Story";
import type { PaperBlockProps } from "@/types/paper";
import { cn } from "@/utils/cn";

export default function PaperStoryBlock({ variant }: PaperBlockProps) {
  return (
    <section
      data-paper-variant={variant}
      className="relative bg-transparent pb-24 pt-20 opacity-90 md:pb-32 md:pt-32 lg:pb-40"
    >
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
