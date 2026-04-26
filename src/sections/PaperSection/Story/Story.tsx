import { storyData } from "./storyData";
import StoryItem from "./StoryItem";

export default function Story() {
  return (
    <section className='relative -mt-10 pt-8 md:pt-16'>
      {/* HEADER */}
      <div className='max-w-3xl mx-auto px-6 mb-24 md:mb-32 text-center'>
        <p className='font-[Castlegar_Caps] tracking-[0.4em] uppercase text-[#6b1f2b]/60 mb-4'>
          Povestea noastră
        </p>

        <h2 className='script-castlegar text-4xl md:text-5xl text-[#6b1f2b]'>
          Cum a început totul
        </h2>
      </div>

      <div className='max-w-[1600px] mx-auto px-6 md:px-16'>
        {/* 🔥 FIRST HALF (CONTROLLED HEIGHT) */}
        <div className='space-y-16 md:space-y-20'>
          {storyData.slice(0, 3).map((item, index) => (
            <div key={index} className={index === 2 ? "mt-12 md:mt-20" : ""}>
              <StoryItem item={item} index={index} />
            </div>
          ))}
        </div>

        {/* 🔥 GAP EXACT CA SĂ EVIȚI FOLD */}
        <div className='h-99 md:h-99' />

        {/* 🔥 REST */}
        <div className='space-y-24 md:space-y-32'>
          {storyData.slice(3).map((item, index) => (
            <StoryItem key={index + 3} item={item} index={index + 3} />
          ))}
        </div>
      </div>
    </section>
  );
}
