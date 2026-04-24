const PaperBackground = () => {
  return (
    <div className='absolute inset-0 z-0'>
      {/* 🟤 BASE COLOR */}
      <div className='absolute inset-0 bg-[#f3efe7]' />

      {/* 🧻 PAPER SOFT */}
      <div
        className='absolute inset-0 opacity-[0.45]'
        style={{
          backgroundImage: "url('/assets/base-paper/base-paper5.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* 🌫 SECOND PAPER LAYER */}
      <div
        className='absolute inset-0 opacity-[0.25]'
        style={{
          backgroundImage: "url('/assets/base-paper/base-paper7.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* ✨ FINE GRAIN */}
      <div
        className='absolute inset-0 pointer-events-none'
        style={{
          backgroundImage: "url('/assets/base-grain/grain3.jpg')",
          backgroundSize: "300px",
          opacity: 0.18,
          mixBlendMode: "overlay",
        }}
      />

      {/* 💡 LIGHT OVERLAY */}
      <div className='absolute inset-0 pointer-events-none'>
        <div className='absolute inset-0 bg-white/20 mix-blend-soft-light' />

        <div
          className='absolute inset-0'
          style={{
            background:
              "radial-gradient(circle at 50% 30%, rgba(255,255,255,0.35), transparent 60%)",
          }}
        />
      </div>

      {/* 🧻 PAPER EDGE */}
      <div className='absolute top-0 left-0 w-full h-40 pointer-events-none'>
        <div className='absolute top-0 left-0 w-full h-[2px] bg-white/40' />
        <div className='absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-white/20 to-transparent' />
        <div className='absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-black/30 to-transparent' />
        <div className='absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-[#f4f1ea] via-[#f4f1ea]/80 to-transparent' />
      </div>
    </div>
  );
};

export default PaperBackground;
