import { motion, useTransform } from "framer-motion";
import PaperImage from "@components/PaperImage";
import { useSectionScroll } from "@hooks/useSectionScroll";
import { cn } from "@utils/cn";
import type { StoryItemType } from "./storyData";

type Props = {
  item: StoryItemType;
  index: number;
};

export default function StoryItem({ item, index }: Props) {
  const isLeft = index % 2 === 0;

  const { ref, progress } = useSectionScroll({
    offset: ["start 85%", "end 20%"],
  });

  const y = useTransform(progress, [0, 1], [50, 0]);
  const opacity = useTransform(progress, [0, 0.4], [0, 1]);

  const imageSrc: string | null = typeof item.image === "string" ? item.image : null;

  return (
    <motion.div ref={ref} style={{ y, opacity }} className="relative mb-28 md:mb-32 lg:mb-44">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-16">
        {/* ========================= */}
        {/* 📱 MOBILE + TABLET (STACKED) */}
        {/* ========================= */}
        <div className="flex flex-col gap-10 md:gap-12 lg:hidden">
          {/* TEXT */}
          <div className={cn("max-w-[520px]", isLeft ? "mr-auto text-left" : "ml-auto text-right")}>
            {item.date && (
              <p className="mb-4 text-[12px] tracking-[0.4em] text-[#5a1e28]/60">{item.date}</p>
            )}

            <h3 className="script-castlegar-title mb-4 text-[26px] leading-[1.3] text-[#5a1e28]">
              {item.title}
            </h3>

            <p className="script-cormorant-display text-[24px] leading-[1.8] text-[#5a1e28]/75">
              {item.text}
            </p>
          </div>

          {/* IMAGE */}
          {imageSrc && (
            <div className={cn("flex", isLeft ? "justify-start" : "justify-end")}>
              <div
                className="w-full max-w-[320px] shadow-xl"
                style={{
                  transform: `rotate(${isLeft ? "1deg" : "-1deg"})`,
                }}
              >
                <PaperImage src={imageSrc} alt={item.title} />
              </div>
            </div>
          )}
        </div>

        {/* ========================= */}
        {/* 🖥 DESKTOP (GRID) */}
        {/* ========================= */}
        <div className="hidden items-center gap-24 lg:grid lg:grid-cols-2">
          {/* TEXT */}
          <div className={cn(isLeft ? "pr-20" : "order-2 pl-20")}>
            <div className="max-w-[640px]">
              {item.date && (
                <p className="mb-6 text-[12px] tracking-[0.5em] text-[#5a1e28]/60">{item.date}</p>
              )}

              <h3 className="script-castlegar-title mb-6 text-[38px] leading-[1.35] text-[#5a1e28]">
                {item.title}
              </h3>

              <p className="script-cormorant-display text-[19px] leading-[2.0] text-[#5a1e28]/75">
                {item.text}
              </p>
            </div>
          </div>

          {/* IMAGE */}
          {imageSrc && (
            <div className={cn("flex", isLeft ? "justify-start" : "order-1 justify-end")}>
              <div
                className="w-full max-w-[520px] shadow-[0_40px_100px_rgba(0,0,0,0.2)]"
                style={{
                  transform: `rotate(${isLeft ? "1deg" : "-1deg"})`,
                }}
              >
                <PaperImage src={imageSrc} alt={item.title} />
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
