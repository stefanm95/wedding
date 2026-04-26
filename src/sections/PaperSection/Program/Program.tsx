import { programData } from "./programData";
import ProgramItem from "./ProgramItem";

export default function Program() {
  return (
    <section className='relative pt-32 md:pt-32 pb-32'>
      <div className='max-w-[1400px] mx-auto px-6 md:px-16'>
        {/* HEADER */}
        <div className='mb-20'>
          <h2 className='text-[36px] md:text-[44px] tracking-[0.25em] text-[#6b1f2b] font-serif'>
            PROGRAMUL ZILEI
          </h2>

          <div className='mt-8 flex items-center gap-4'>
            <div className='w-24 h-[1px] bg-[#c9a46c]' />
            <div className='w-2 h-2 bg-[#c9a46c] rotate-45' />
            <div className='w-24 h-[1px] bg-[#c9a46c]' />
          </div>
        </div>

        {/* LAYOUT */}
        <div className='grid lg:grid-cols-[1fr_0.8fr] gap-16 items-start'>
          {/* 🔥 TIMELINE */}
          <div className='relative pl-14'>
            {/* LINE */}
            <div className='absolute left-[22px] top-2 bottom-2 w-[1px] bg-[#6b1f2b]/20' />

            <div className='space-y-16 md:space-y-20'>
              {programData.map((item, index) => (
                <ProgramItem key={index} item={item} />
              ))}
            </div>
          </div>

          {/* 🪶 DECOR (folosești asset-urile tale) */}
          <div className='hidden lg:flex justify-center'>
            <div className='relative w-[420px] h-[420px] opacity-80'>
              <img
                src='/assets/paper/monogram-emboss.png'
                alt='decor'
                className='w-full h-full object-contain opacity-40'
              />

              <img
                src='/assets/paper/wax-seal.png'
                alt='seal'
                className='absolute bottom-[-20px] right-[-10px] w-28'
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
