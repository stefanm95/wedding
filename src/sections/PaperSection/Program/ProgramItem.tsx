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
        <p className='text-[18px] text-[#6b1f2b] font-serif'>{item.time}</p>
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
        <p className='text-[11px] tracking-[0.4em] text-[#6b1f2b]/60 mb-2 uppercase'>
          {isTransport ? "Transport" : "Eveniment"}
        </p>

        {/* TITLE */}
        <h3 className='text-[24px] text-[#3d2b1f] font-serif mb-2'>
          {item.title}
        </h3>

        {/* LOCATION */}
        {item.location && (
          <p className='text-[15px] text-[#3d2b1f]/70'>{item.location}</p>
        )}

        {/* NOTE */}
        {item.note && (
          <p className='text-[14px] text-[#6b1f2b]/70 italic mt-2'>
            {item.note}
          </p>
        )}

        {/* MAP */}
        {item.mapLink && (
          <a
            href={item.mapLink}
            target='_blank'
            rel='noopener noreferrer'
            className='inline-block mt-2 text-[#c9a46c] underline text-sm'
          >
            Vezi pe hartă
          </a>
        )}
      </div>
    </div>
  );
}
