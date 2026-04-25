type Props = {
  time: string;
  title: string;
  location?: string;
  note?: string;
};

export default function ProgramItem({ time, title, location, note }: Props) {
  return (
    <div className='mb-10 flex gap-6'>
      {/* TIME */}
      <div className='w-16 text-[#6b1f2b] text-xl font-serif'>{time}</div>

      {/* CONTENT */}
      <div>
        <p className='uppercase text-xs tracking-[0.3em] text-[#6b1f2b]/60'>
          {note}
        </p>

        <h3 className='text-xl font-serif text-[#6b1f2b]'>{title}</h3>

        {location && <p className='text-sm text-[#6b1f2b]/70'>{location}</p>}
      </div>
    </div>
  );
}
