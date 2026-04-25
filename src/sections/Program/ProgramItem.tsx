type Props = {
  time: string;
  label: string;
  title: string;
  subtitle?: string;
  note?: string;
  link?: string;
};

function ProgramItem({ time, label, title, subtitle, note, link }: Props) {
  return (
    <div className='grid grid-cols-[80px_1fr] gap-6 items-start'>
      {/* 🕰️ TIME */}
      <div className='text-[#6b1f2b] text-xl font-serif'>{time}</div>

      {/* 📄 TEXT */}
      <div>
        <p className='text-xs tracking-[0.3em] text-[#6b1f2b]/60 mb-1'>
          {label}
        </p>

        <p className='text-xl font-serif text-[#6b1f2b]'>{title}</p>

        {subtitle && (
          <p className='text-sm text-[#6b1f2b]/70 mt-1'>{subtitle}</p>
        )}

        {note && (
          <p className='text-sm italic text-[#6b1f2b]/60 mt-2'>{note}</p>
        )}

        {link && (
          <a href={link} className='text-gold underline mt-2 inline-block'>
            Vezi pe hartă
          </a>
        )}
      </div>
    </div>
  );
}

export default ProgramItem;
