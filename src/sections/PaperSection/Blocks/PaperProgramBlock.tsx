import PaperGrain from "@/components/PaperGrain";
import PaperLight from "@/components/PaperLight";
import type { PaperBlockProps } from "@/types/paper";
import { optimizeCloudinaryUrl } from "@/utils/cloudinary";
import type { PaperVariant } from "@/utils/paperThemes";
import Program from "@paper/Program/Program";

type Props = PaperBlockProps & {
  variant: PaperVariant;
};

const paperCardsSrc = optimizeCloudinaryUrl(
  "https://res.cloudinary.com/djzw55eub/image/upload/v1779354888/wedding/paper/paper-cards_pa7rid_q6q8zq.jpg",
  1400,
);

export default function PaperProgramBlock({ variant }: Props) {
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
          src={paperCardsSrc}
          loading="lazy"
          decoding="async"
          sizes="100vw"
          className="h-full w-full object-cover object-[center_30%] opacity-10 md:object-[center_35%] lg:object-[center_40%]"
        />
      </div>

      {/* GRAIN */}
      <PaperGrain />

      {/* LIGHT */}
      <PaperLight />

      {/* 📄 CONTENT */}
      <div className="max-w-8xl relative z-30 mx-auto px-6 pb-2">
        <Program />
      </div>
    </section>
  );
}
