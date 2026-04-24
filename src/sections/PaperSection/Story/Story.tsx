import { motion, useTransform } from "framer-motion";
import StoryItem from "./StoryItem";
import { storyData } from "./storyData";
import { useSectionScroll } from "../../../hooks/useSectionScroll";

export default function Story() {
  const { ref, smoothProgress } = useSectionScroll();

  // 🔥 progres principal
  const pathLength = useTransform(smoothProgress, [1, 1], [1, 1]);

  return (
    <section ref={ref} className='relative text-center'>
      <div className='relative max-w-5xl mx-auto'>
        {/*line*/}
        <svg
          className='absolute left-[48%] top-0 -translate-x-1/2 h-full'
          width='80'
          viewBox='0 0 80 1400'
          preserveAspectRatio='none'
        >
          {/* ✨ GLOW FOLLOWING TIP */}
          <motion.path
            d='
              M40 0 
              C 35 120, 45 240, 38 360
              C 42 520, 36 680, 44 820
              C 38 980, 45 1100, 40 1400
            '
            fill='none'
            stroke='#6b1f2b'
            strokeWidth='8'
            strokeLinecap='round'
            style={{
              opacity: 0.2,
              filter: "blur(8px)",
            }}
          />
        </svg>
        {/* ITEMS */}
        {storyData.map((item, index) => (
          <StoryItem key={index} item={item} index={index} />
        ))}
      </div>
    </section>
  );
}
