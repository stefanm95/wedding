import { motion, useTransform } from "framer-motion";
import { useSectionScroll } from "../../../hooks/useSectionScroll";
import PaperImage from "../../../components/PaperImage";
import type { StoryItemType } from "./storyData";

type Props = {
  item: StoryItemType;
  index: number;
};

export default function StoryItem({ item, index }: Props) {
  const isLeft = index % 2 === 0;
  const type = item.type || "story";

  const { ref, progress } = useSectionScroll({
    offset: ["start 85%", "end 20%"],
  });

  const y = useTransform(progress, [0, 1], [60, 0]);
  const opacity = useTransform(progress, [0, 0.4], [0, 1]);

  // ✅ SAFE IMAGE
  const imageSrc: string | null =
    typeof item.image === "string" ? item.image : null;

  const hasImage = imageSrc !== null;

  if (type === "transition") return null;

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity }}
      className={`
    relative
    ${index === 1 ? "mb-56 md:mb-72" : "mb-40 md:mb-52"}
  `}
    >
      {/* 🔥 WIDE CONTAINER */}
      <div className='max-w-[1600px] mx-auto px-6 md:px-16'>
        <div
          className={`
            grid
            ${hasImage ? "md:grid-cols-2" : "md:grid-cols-1"}
            items-center
            gap-16 md:gap-28
          `}
        >
          {/* ✍️ TEXT */}
          <div
            className={`
              ${
                hasImage
                  ? isLeft
                    ? "md:order-1 md:pr-20"
                    : "md:order-2 md:pl-20"
                  : "mx-auto text-center"
              }
            `}
          >
            <div
              className={`
                ${hasImage ? (isLeft ? "mr-auto" : "ml-auto") : "mx-auto"}
                max-w-[640px]
              `}
            >
              {/* DATE */}
              {item.date && (
                <p className='text-[12px] tracking-[0.5em] text-[#5a1e28]/60 mb-6'>
                  {item.date}
                </p>
              )}

              {/* TITLE */}
              <h3
                className='
                  text-[28px] md:text-[38px]
                  leading-[1.35]
                  tracking-[0.08em]
                  text-[#5a1e28]
                  script-cormorant-display
                  mb-6
                '
              >
                {item.title}
              </h3>

              {/* TEXT */}
              <p
                className='
                  text-[17px] md:text-[19px]
                  leading-[2.0]
                  text-[#5a1e28]/75
                  script-cormorant-body
                '
              >
                {item.text}
              </p>

              {index === 1 && (
                <div className='h-16 md:h-44 opacity-30'>
                  <div className='w-[1px] h-full bg-[#6b1f2b]/20 mx-auto' />
                </div>
              )}

              {/* EVENT */}
              {type === "event" && (
                <div className='mt-6 text-sm text-[#5a1e28]/70 space-y-2'>
                  {item.location && <p>{item.location}</p>}

                  {item.mapLink && (
                    <a
                      href={item.mapLink}
                      target='_blank'
                      className='inline-block mt-3 underline text-[#6b1f2b]'
                    >
                      Vezi pe hartă
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* 🖼 IMAGE */}
          {hasImage && (
            <div
              className={`
                ${
                  isLeft ? "md:order-2 justify-start" : "md:order-1 justify-end"
                }
                flex
              `}
            >
              <div
                className='
                  w-full max-w-[520px]
                  shadow-[0_40px_100px_rgba(0,0,0,0.2)]
                '
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
