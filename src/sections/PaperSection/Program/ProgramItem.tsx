import type { ProgramItemType } from "./programData";

type Props = {
  item: ProgramItemType;
};

export default function ProgramItem({ item }: Props) {
  const isTransport = item.type === "transport";

  return (
    <div className='relative flex items-start gap-8'>
      {/* TIME */}
      <div className='w-[70px] text-right'>
        <p className='text-[15px] text-[#6b1f2b]/70 font-serif tracking-wide'>
          {item.time}
        </p>
      </div>

      {/* DOT */}
      <div className='relative mt-[6px]'>
        <div
          className={`
            w-3 h-3 rotate-45
            ${isTransport ? "bg-[#c9a46c]" : "bg-[#6b1f2b]"}
          `}
        />
      </div>

      {/* CONTENT */}
      <div className='max-w-[420px]'>
        {/* TYPE */}
        <p className='text-[10px] tracking-[0.5em] text-[#6b1f2b] mb-3 uppercase'>
          {isTransport ? "Transport" : "Eveniment"}
        </p>

        {/* TITLE */}
        <h3 className='text-[26px] text-[#3d2b1f] font-serif mb-2 leading-snug'>
          {item.title}
        </h3>

        {/* LOCATION */}
        {item.location && (
          <p className='text-[15px] text-[#3d2b1f]/70 mb-3'>
            {item.location}
          </p>
        )}

        {/* NOTE */}
        {item.note && (
          <p className='text-[14px] text-[#6b1f2b]/60 italic mb-3'>
            {item.note}
          </p>
        )}

        {/* MAP LINK (🔥 refined) */}
        {item.mapLink && (
          <a
  href={item.mapLink}
  target='_blank'
  rel='noopener noreferrer'
  className='
    relative
    inline-flex items-center gap-2
    text-[12px]
    tracking-[0.25em]
    uppercase
    text-[#5a1e28]
    hover:text-[#6b1f2b]
    transition
    group
  '
>
  <span className='text-[#c9a46c] text-[10px]'>◆</span>

  <span className='relative z-10'>
    Vezi pe hartă
  </span>

  {/* 🔥 subtle paper highlight */}
  <span
    className='
      absolute inset-0
      bg-[#c9a46c]/10
      opacity-0
      group-hover:opacity-100
      transition
      blur-[2px]
    '
  />

  {/* underline FIXED */}
  <span
    className='
      absolute left-0 bottom-0
      h-[1px] w-full
      bg-[#c9a46c]
      origin-left
      scale-x-0
      group-hover:scale-x-100
      transition-transform duration-300
    '
  />
</a>
        )}
      </div>
    </div>
  );
}
