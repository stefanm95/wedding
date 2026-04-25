export default function PaperDivider() {
  return (
    <div className='relative w-full h-[220px] my-32 overflow-hidden'>
      {/* 🧻 TEXTURĂ NOUĂ */}
      <div
        className='absolute inset-0'
        style={{
          backgroundImage: "url('/assets/transition/transition2.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.9,
        }}
      />

      {/* ✂️ EDGE RUPT */}
      <div
        className='absolute top-0 left-0 w-full h-full pointer-events-none'
        style={{
          background: `
            radial-gradient(circle at 20% 0%, transparent 40%, rgba(0,0,0,0.15) 100%),
            linear-gradient(to bottom, #f4f1ea 0%, transparent 60%)
          `,
          mixBlendMode: "multiply",
          opacity: 0.5,
        }}
      />

      {/* ✨ EMBOSS FAKE */}
      <div
        className='absolute inset-0 pointer-events-none'
        style={{
          background: `
            radial-gradient(circle at 70% 50%, rgba(0,0,0,0.08), transparent 60%)
          `,
        }}
      />

      {/* 🌿 CENTER ORNAMENT (subtil) */}
      <div className='absolute inset-0 flex items-center justify-center opacity-40'>
        <img src='/embroided-line.png' className='w-[60px] object-contain' />
      </div>
    </div>
  );
}
