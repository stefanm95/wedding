import Program from "../Program/Program";

export default function PaperProgramBlock() {
  return (
    <section className='relative py-32 md:py-40 overflow-hidden'>
      {/* 🧻 BACKGROUND TEXTURE */}
      <div className='absolute inset-0 z-0 pointer-events-none'>
        <img
          src='/assets/paper/paper-mid-split.jpg'
          className='
            w-full h-full object-cover
            opacity-50
            object-[center_30%] md:object-[center_35%] lg:object-[center_40%]
          '
        />
      </div>

      {/* 📄 CONTENT */}
      <div className='relative z-10 max-w-8xl mx-auto px-6'>
        <Program />
      </div>
    </section>
  );
}
