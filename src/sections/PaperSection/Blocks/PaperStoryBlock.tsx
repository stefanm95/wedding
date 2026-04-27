import Story from "../Story/Story";

export default function PaperStoryBlock() {
  return (
    <section className='relative pt-12 md:pt-16 pb-8 md:pb-12'>
      <div className='flex flex-col'>
        {/* 🔥 FOCUS ELEMENT */}
        <div className='absolute inset-0 flex justify-center pointer-events-none'>
          <img
          alt="paper"
            src='/assets/paper/paper-mid-split.jpg'
            className='
            w-full max-w-[1400px]
            opacity-60
          '
          />
        </div>

        <div className='relative z-10 max-w-none mx-auto px-6'>
          <Story />
        </div>
      </div>
    </section>
  );
}
