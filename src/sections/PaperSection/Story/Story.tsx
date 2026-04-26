import { storyData } from "./storyData";
import StoryItem from "./StoryItem";

export default function Story() {
  return (
    <section className='relative -mt-10 pt-8 md:pt-16'>
      {/* 🧭 HEADER */}
      <div className='max-w-3xl mx-auto px-6 mb-16 text-center'>
        <p className='font-[Castlegar_Caps] tracking-[0.4em] uppercase text-[#6b1f2b]/60 mb-4'>
          Povestea noastră
        </p>

        <h2 className='script-castlegar text-4xl md:text-5xl text-[#6b1f2b]'>
          Cum a început totul
        </h2>
      </div>

      {/* 📄 FLOW */}
      <div className='max-w-6xl mx-auto px-6 space-y-28'>
        {storyData.map((item, index) => (
          <StoryItem key={index} item={item} index={index} />
        ))}
      </div>
    </section>
  );
}
