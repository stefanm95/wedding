import Story from "@paper/Story/Story";
import type { PaperBlockProps } from "@/types/paper";
import { cn } from "@/utils/cn";

export default function PaperStoryBlock({ variant }: PaperBlockProps) {
  return (
    <section
      data-paper-variant={variant}
      className="relative pb-24 pt-20 md:pb-32 md:pt-32 lg:pb-40"
    >
      {/* 🧻 BACKGROUND ELEMENT */}
      <div className="pointer-events-none absolute inset-0 flex justify-center">
        <img
          alt="paper"
          src="/assets/paper/paper-mid-split.jpg"
          className={cn(
            "w-full max-w-[1400px] mix-blend-multiply",
            variant === "day" && "opacity-30",
            variant === "golden" && "opacity-40",
            variant === "evening" && "opacity-50",
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
