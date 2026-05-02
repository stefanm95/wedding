import Program from "@paper/Program/Program";
import type { PaperBlockProps } from "@/types/paper";

export default function PaperProgramBlock({ variant }: PaperBlockProps) {
  return (
    <section
      data-paper-variant={variant}
      className="relative overflow-hidden pt-24 md:pt-32 lg:pt-40"
    >
      {/* 🧻 BACKGROUND TEXTURE */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <img
          alt="paper"
          src="/assets/paper/paper-cards.jpg"
          className="h-full w-full object-cover object-[center_30%] opacity-50 md:object-[center_35%] lg:object-[center_40%]"
        />
      </div>

      {/* 📄 CONTENT */}
      <div className="max-w-8xl relative z-10 mx-auto px-6 pb-[20vh]">
        <Program />
      </div>
    </section>
  );
}
