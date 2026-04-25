// src/components/PaperImage.tsx

type Props = {
  src: string;
  alt: string;
};

export default function PaperImage({ src, alt }: Props) {
  return (
    <div
      className='
        relative inline-block
        bg-[#f4f1ea]
        p-2
        shadow-[0_10px_30px_rgba(0,0,0,0.18)]
      '
      style={{
        transform: "rotate(-1.2deg)",
      }}
    >
      <img src={src} alt={alt} className='block w-full object-cover' />

      {/* grain subtil */}
      <div
        className='absolute inset-0 pointer-events-none opacity-[0.05] mix-blend-multiply'
        style={{
          backgroundImage: "url('/assets/base-grain/grain2.jpg')",
          backgroundSize: "220px",
        }}
      />
    </div>
  );
}
