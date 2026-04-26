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

  const y = useTransform(progress, [0, 1], [50, 0]);
  const opacity = useTransform(progress, [0, 0.4], [0, 1]);

  // ✅ SAFE IMAGE (NO TS ERROR)
  const imageSrc: string | null =
    typeof item.image === "string" ? item.image : null;

  const hasImage = imageSrc !== null;

  if (type === "transition") return null;

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity }}
      className='relative mb-32 md:mb-44'
    >
      <div className='mx-auto px-6 md:px-10'>
        <div
          className={`
            grid gap-12 md:gap-20
            ${hasImage ? "md:grid-cols-2" : "md:grid-cols-1"}
            items-start
          `}
        >
          {/* ✍️ TEXT */}
          <div
            className={`
              ${
                hasImage
                  ? isLeft
                    ? "md:col-start-1 md:pr-16"
                    : "md:col-start-2 md:pl-16"
                  : "mx-auto text-center"
              }
            `}
          >
            <div
              className={`
                ${
                  hasImage
                    ? isLeft
                      ? "mr-auto ml-0"
                      : "ml-auto mr-0"
                    : "mx-auto"
                }
                max-w-[560px]
              `}
            >
              {/* DATE */}
              {item.date && (
                <p
                  className={`
                    text-[12px]
                    tracking-[0.5em]
                    text-[#5a1e28]/60
                    mb-6
                  `}
                >
                  {item.date}
                </p>
              )}
              {/* TITLE */}
              <h3
                className={`
                  text-[26px] md:text-[34px]
                  leading-[1.3]
                  tracking-[0.12em]
                  text-[#5a1e28]
                  script-castlegar-title
                  mb-5
                `}
              >
                {item.title}
              </h3>

              {/* TEXT */}
              <p
                className='
                  text-[24px]
                  leading-[2.1]
                  tracking-[0.01em]
                  text-[#5a1e28]/75
                  script-cormorant-display
                  text-left
                '
              >
                {item.text}
              </p>

              {/* EVENT */}
              {type === "event" && (
                <div className='mt-6 text-sm text-[#5a1e28]/70 space-y-2 text-left'>
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
          {imageSrc && (
            <div
              className={`
                ${
                  isLeft
                    ? "md:col-start-2 justify-start md:pl-6"
                    : "md:col-start-1 justify-end md:pr-6"
                }
                flex items-start
              `}
            >
              <div
                className='
                  w-full max-w-[420px]
                  shadow-[0_30px_80px_rgba(0,0,0,0.18)]
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
