export default function Monogram() {
  return (
    <div className='relative w-[160px] h-[160px] flex items-center justify-center'>
      {/* CIRCLE */}
      <div className='absolute inset-0 rounded-full border border-[#6b1f2b]/30' />

      {/* EMBOSS EFFECT */}
      <span
        className='
          text-6xl font-serif text-[#6b1f2b]
        '
        style={{
          textShadow: `
            0 1px 0 rgba(255,255,255,0.4),
            0 -1px 2px rgba(0,0,0,0.2)
          `,
          filter: "contrast(1.05)",
        }}
      >
        D&nbsp;&nbsp;I
      </span>
    </div>
  );
}
