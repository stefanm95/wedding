type Props = {
  className?: string;
};

export default function TimelineLine({ className = "" }: Props) {
  return (
    <div
      className={`
        absolute left-1/2 -translate-x-1/2
        pointer-events-none
        flex justify-center
        ${className}
      `}
    >
      <img
        src='/embroided-line.png'
        alt='ornament'
        className='
          w-[110px]
          h-auto
          object-contain
          opacity-60
          select-none
        '
        style={{
          mixBlendMode: "multiply",
        }}
      />
    </div>
  );
}
