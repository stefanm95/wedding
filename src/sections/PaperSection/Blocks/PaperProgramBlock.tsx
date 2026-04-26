import ProgramInline from "../Program/ProgramInline";

export default function PaperProgramBlock() {
  return (
    <section className='relative py-32 md:py-40 text-center'>
      {/* 🔥 subtle separator */}
      <div className='absolute inset-0 bg-white/10' />

      <div className='relative z-10 max-w-3xl mx-auto px-6'>
        <p className='italic text-[#6b1f2b]/70 mb-12'>
          Vă invităm să fiți alături de noi
        </p>

        <ProgramInline />
      </div>
    </section>
  );
}
