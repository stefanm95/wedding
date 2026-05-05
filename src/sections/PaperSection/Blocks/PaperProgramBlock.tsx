import EmbossSeal from "@/components/EmbossSeal";
import PaperGrain from "@/components/PaperGrain";
import PaperLight from "@/components/PaperLight";
import type { PaperBlockProps } from "@/types/paper";
import type { PaperVariant } from "@/utils/paperThemes";
import Program from "@paper/Program/Program";
import { MotionValue } from "framer-motion";

type Props = PaperBlockProps & {
  variant: PaperVariant;
  onOpenRsvp: () => void;
  progress: MotionValue<number>;
};

export default function PaperProgramBlock({ variant, onOpenRsvp, progress }: Props) {
  return (
    <section
      id="program"
      data-paper-variant={variant}
      className="relative z-20 overflow-visible pt-2 md:pt-4 lg:pt-4"
    >
      {/* 🧻 BACKGROUND TEXTURE */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <img
          alt="paper"
          src="https://res.cloudinary.com/dswwhzem5/image/upload/v1777958076/paper-cards_pa7rid.jpg"
          className="h-full w-full object-cover object-[center_30%] opacity-10 md:object-[center_35%] lg:object-[center_40%]"
        />
      </div>

      {/* EMBOSS */}
      <EmbossSeal
        progress={progress}
        className="absolute right-[55%] top-[100%] z-[5] -translate-x-1/2 -translate-y-1/2"
      />

      {/* GRAIN */}
      <PaperGrain />

      {/* LIGHT */}
      <PaperLight />

      {/* 📄 CONTENT */}
      <div className="max-w-8xl relative z-30 mx-auto px-6 pb-2">
        <Program onOpenRsvp={onOpenRsvp} />
      </div>
    </section>
  );
}
