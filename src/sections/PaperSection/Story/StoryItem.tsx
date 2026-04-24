import { motion, useTransform } from "framer-motion";
import { useSectionScroll } from "../../../hooks/useSectionScroll";
import InkRevealText from "../../../components/InkRevealText";
import type { StoryItemType } from "./storyData";

type Props = {
  item: StoryItemType;
  index: number;
};

export default function StoryItem({ item, index }: Props) {
  const isLeft = index % 2 === 0;

  const { ref, progress, yParallax } = useSectionScroll({
    offset: ["start 80%", "end 20%"],
  });

  const tilt = index % 2 === 0 ? -0.6 : 0.6;

  const type = item.type || "story";

  if (type === "transition") {
    return (
      <div ref={ref} className='relative w-full my-40 text-center'>
        <InkRevealText progress={progress} align='center'>
          <h3 className='heading-md script-cormorant-display text-[#6b1f2b] mb-4'>
            {item.title}
          </h3>

          <p className='body-lg script-cormorant-body text-[#6b1f2b] max-w-xl mx-auto'>
            {item.text}
          </p>
        </InkRevealText>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className='relative flex items-center justify-between w-full mb-40'
    >
      {/* TEXT */}
      <div
        className={`w-[55%] ${
          isLeft
            ? "ml-auto text-right pr-28"
            : "mr-auto order-2 text-left pl-28"
        }`}
        style={{
          transform: `rotate(${tilt}deg)`,
        }}
      >
        <InkRevealText progress={progress} align={isLeft ? "right" : "left"}>
          <h3 className='heading-md script-cormorant-display text-[#6b1f2b] tracking-[0.04em] mb-4'>
            {item.title}
          </h3>
        </InkRevealText>

        <InkRevealText progress={progress} align={isLeft ? "right" : "left"}>
          <p
            className='body-lg script-cormorant-body leading-relaxed
                    tracking-[0.02em]
                    max-w-[420px] text-[#6b1f2b]'
          >
            {item.text}
          </p>
        </InkRevealText>

        {type === "event" && (
          <InkRevealText progress={progress} align={isLeft ? "right" : "left"}>
            <div className='mt-6 text-sm text-[#6b1f2b] opacity-80'>
              {item.date && <p>{item.date}</p>}
              {item.location && (
                <p className='text-accent-red mt-1'>{item.location}</p>
              )}
              {item.mapLink && (
                <a
                  href={item.mapLink}
                  target='_blank'
                  className='underline text-gold mt-2 inline-block'
                >
                  Vezi pe hartă
                </a>
              )}
            </div>
          </InkRevealText>
        )}
      </div>

      {/* IMAGE */}
      {item.image && (
        <motion.div style={{ y: yParallax }} className='w-1/2 px-8'>
          <div className='overflow-hidden rounded-2xl shadow-lg'>
            <img
              src={item.image}
              alt={item.title}
              className='w-full object-cover'
            />
          </div>
        </motion.div>
      )}
    </div>
  );
}
