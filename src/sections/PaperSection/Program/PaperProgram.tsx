export default function PaperProgram() {
  return (
    <div className='mt-40'>
      {/* 🧾 HEADER */}
      <div className='text-center mb-20'>
        <h2 className='text-4xl font-serif tracking-[0.2em] text-[#6b1f2b]'>
          PROGRAMUL ZILEI
        </h2>
      </div>

      {/* 🧻 PAPER CARD */}
      <div className='relative max-w-5xl mx-auto'>
        {/* BACKGROUND IMAGE */}
        <img
          src='/assets/program-bg.png'
          className='w-full h-auto rounded-sm shadow-[0_20px_60px_rgba(0,0,0,0.2)]'
        />

        {/* CONTENT OVERLAY */}
        <div className='absolute inset-0 flex'>
          {/* LEFT SIDE */}
          <div className='w-1/2 p-16 flex flex-col justify-center'>
            {/* items */}
          </div>

          {/* RIGHT SIDE (gol - e decor) */}
          <div className='w-1/2' />
        </div>
      </div>
    </div>
  );
}
