import { motion } from "framer-motion";
import type { StoryItemType } from "./storyData";

type Props = {
  item: StoryItemType;
  index: number;
};

export default function StoryItem({ item, index }: Props) {
  const isLeft = index % 2 === 0;

  // 🔥 DEFAULT TYPE (fallback pentru ce aveai deja)
  const type = item.type || "story";

  // 🔥 TRANSITION BLOCK (full width, fără linie)
  if (type === "transition") {
    return (
      <div className='relative w-full my-40 text-center'>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h3 className='heading-md script-cormorant-display tracking-[0.06em] text-[#6b1f2b] mb-4'>
            {item.title}
          </h3>
          <p className='body-lg script-cormorant-body text-[#6b1f2b] tracking-[0.06em] max-w-xl mx-auto'>
            {item.text}
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className='relative flex items-center justify-between w-full mb-40'>
      {/* LINE DOT */}
      <div className='absolute left-1/2 -translate-x-1/2 z-10 flex items-center justify-center'>
        {/* 🧵 BASE LINE (full height) */}
        <div className='w-[1px] bg-[#6b1f2b]/30 h-40 mx-auto mb-10' />
      </div>
      {/* TEXT */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className={`w-1/2 px-8 ${isLeft ? "text-right" : "order-2 text-left"}`}
      >
        <h3 className='heading-md script-cormorant-display text-center tracking-[0.06em] text-[#6b1f2b] mb-4'>
          {item.title}
        </h3>

        <p className='body-lg script-cormorant-body text-center text-[#6b1f2b] tracking-[0.06em]'>
          {item.text}
        </p>

        {/* 🔥 EVENT EXTRA INFO */}
        {type === "event" && (
          <div className='mt-6 text-sm text-[#6b1f2b] text-center pointer-events-none opacity-80'>
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
        )}
      </motion.div>

      {/* IMAGE (doar dacă există) */}
      {item.image && (
        <motion.div
          initial={{ opacity: 0, x: isLeft ? 60 : -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className='w-1/2 px-8'
        >
          <div className='overflow-hidden rounded-2xl shadow-lg'>
            <img
              src={item.image}
              alt={item.title}
              className='w-full h-auto object-cover'
            />
          </div>
        </motion.div>
      )}
    </div>
  );
}
