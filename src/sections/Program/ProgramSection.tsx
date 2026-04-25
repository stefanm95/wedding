export default function ProgramSection() {
  return (
    <section className='relative min-h-[110vh] md:min-h-[120vh] z-40 px-4 sm:px-6 overflow-hidden'>
      {/* 🧻 PAPER IMAGE */}
      <div
        className='
          absolute inset-0 flex
          justify-start lg:justify-center
          items-start
        '
      >
        <img
          src='/assets/program-bg.png'
          alt=''
          className='
            pointer-events-none   // 🔥 DOAR aici
            
            w-[200%] sm:w-[150%] md:w-full
            max-w-none md:max-w-[1024px]
            h-auto
            object-contain
            opacity-90
            
            translate-y-12 sm:translate-y-6 md:translate-y-0
          '
        />
      </div>

      {/* ✨ OVERLAY */}
      <div className='absolute inset-0 bg-white/20 pointer-events-none' />

      {/* 📜 CONTENT (clickable) */}
      <div className='relative z-10 max-w-4xl mx-auto'>
        <a
          href='https://maps.google.com'
          target='_blank'
          className='underline text-[#6b1f2b]'
        >
          Vezi pe hartă
        </a>
      </div>
    </section>
  );
}
