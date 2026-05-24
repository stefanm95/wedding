import EmbossSeal from "@/components/EmbossSeal";
import PaperGrain from "@/components/PaperGrain";
import type { PaperBlockProps } from "@/types/paper";
import { optimizeCloudinaryUrl } from "@/utils/cloudinary";
import type { PaperVariant } from "@/utils/paperThemes";
import { MotionValue } from "framer-motion";
import Details from "../Details/Details";

type Props = PaperBlockProps & {
  variant: PaperVariant;
  progress: MotionValue<number>;
};

const paperCardsSrc = optimizeCloudinaryUrl(
  "https://res.cloudinary.com/djzw55eub/image/upload/v1779354888/wedding/paper/paper-cards_pa7rid_q6q8zq.jpg",
  1400,
);

export default function PaperDetailsBlock({ variant, progress }: Props) {
  return (
    <section
      id="details"
      data-paper-variant={variant}
      className="relative z-20 mb-32 overflow-visible pt-2 md:pt-4 lg:pt-4"
    >
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

      <EmbossSeal
        progress={progress}
        className="absolute left-[60%] top-[15%] z-[5] -translate-x-1/2 -translate-y-1/2"
      />

      <PaperGrain />

      <div className="max-w-8xl relative z-30 mx-auto px-6 pb-2">
        <Details />
      </div>
    </section>
  );
}
