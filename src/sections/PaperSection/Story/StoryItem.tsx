// StoryItem.tsx
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
    offset: ["start 80%", "end 20%"],
  });

  const y = useTransform(progress, [0, 1], [40, 0]);
  const opacity = useTransform(progress, [0, 0.4], [0, 1]);

  /**
   * 🔥 TRANSITION
   */
  if (type === "transition") {
    return (
      <motion.div
        ref={ref}
        style={{ y, opacity }}
        className='grid grid-cols-2 items-center gap-16 my-32 relative'
      >
        {/* DOT */}
        <div className='absolute left-1/2 -translate-x-1/2 w-[6px] h-[6px] bg-[#6b1f2b] rounded-full z-20' />

        {/* TEXT */}
        <div className='text-right pr-12'>
          <h3 className='text-[26px] tracking-[0.08em] font-serif text-[#5a1e28] mb-4'>
            {item.title}
          </h3>

          <p className='text-[15px] leading-[1.9] text-[#5a1e28]/75 max-w-[380px] inline-block'>
            {item.text}
          </p>
        </div>

        {/* DECOR */}
        <div className='pl-12 opacity-70'>
          <div className='w-[120px] h-[120px] border border-[#6b1f2b]/30 rounded-full flex items-center justify-center text-[#6b1f2b] text-4xl font-serif'>
            D I
          </div>
        </div>
      </motion.div>
    );
  }

  /**
   * 🔥 NORMAL / EVENT
   */
  return (
    <motion.div
      ref={ref}
      style={{ y, opacity }}
      className='grid grid-cols-2 gap-16 items-center mb-32 relative'
    >
      {/* TEXT */}
      <div
        className={`
    ${isLeft ? "text-left" : "order-2 text-left"}
    flex
    ${isLeft ? "justify-end pr-20" : "justify-start pl-20"}
  `}
      >
        <div className='max-w-[380px]'>
          <h3 className='text-[20px]  tracking-[0.06em] font-serif text-[#5a1e28] mb-2'>
            {item.title}
          </h3>

          {item.date && (
            <p className='text-lg tracking-[0.3em] italic text-[#5a1e28]/60 mb-3'>
              {item.date}
            </p>
          )}

          <p className='text-[15px] leading-[1.9] text-[#5a1e28]/75 max-w-[380px] inline-block'>
            {item.text}
          </p>

          {type === "event" && (
            <div className='mt-4 text-sm text-[#5a1e28]/70 space-y-1'>
              {item.location && <p>{item.location}</p>}

              {item.mapLink && (
                <a
                  href={item.mapLink}
                  target='_blank'
                  className='inline-block mt-2 text-[#6b1f2b] underline'
                >
                  Vezi pe hartă
                </a>
              )}
            </div>
          )}
        </div>
      </div>
      {/* IMAGE */}
      <div
        className={`
    ${isLeft ? "" : "order-1"}
    flex
    ${isLeft ? "justify-start pl-20" : "justify-end pr-20"}
  `}
      >
        {item.image && <PaperImage src={item.image} alt={item.title} />}
      </div>
    </motion.div>
  );
}
