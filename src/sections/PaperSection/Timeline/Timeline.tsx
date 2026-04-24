type TimelineItemType = {
  type: "event" | "transport";
  label: string;
  title: string;
  time: string;
  location?: string;
  note?: string;
  mapLink?: string;
};

const timelineData: TimelineItemType[] = [
  {
    type: "transport",
    label: "TRANSPORT",
    title: "Plecare cu autobuzul",
    time: "14:30",
    location: "Piața Victoriei",
    note: "Autobuz pus la dispoziție pentru invitati",
  },
  {
    type: "event",
    label: "CEREMONIE",
    title: "Biserica X",
    time: "16:00",
    mapLink: "#",
  },
  {
    type: "event",
    label: "RECEPȚIE",
    title: "Pădurile Regale",
    time: "18:00",
    mapLink: "#",
  },
  {
    type: "transport",
    label: "TRANSPORT",
    title: "Întoarcere",
    time: "02:00",
    note: "Autobuz spre București",
  },
];

export default function Timeline(): React.ReactNode {
  return (
    <section className='py-32'>
      {/* TITLE */}
      <div className='text-center mb-20'>
        <h2 className='heading-lg script-cormorant-display text-[#6b1f2b]'>
          Programul zilei
        </h2>
      </div>

      {/* CONTENT */}
      <div className='max-w-3xl mx-auto space-y-16'>
        {timelineData.map((item, index) => {
          const isEvent = item.type === "event";

          return (
            <div key={index} className='grid grid-cols-[80px_1fr] gap-6'>
              {/* 🕒 TIME COLUMN */}
              <div className='text-right'>
                <p className='text-sm tracking-[0.2em] text-[#6b1f2b]/60'>
                  {item.time}
                </p>
              </div>

              {/* 📜 CONTENT */}
              <div>
                {/* LABEL */}
                <p
                  className={`text-[11px] tracking-[0.35em] mb-2 ${
                    isEvent ? "text-[#6b1f2b]" : "text-[#6b1f2b]/50 italic"
                  }`}
                >
                  {item.label}
                </p>

                {/* TITLE */}
                <p className='text-xl font-serif text-[#6b1f2b]'>
                  {item.title}
                </p>

                {/* LOCATION */}
                {item.location && (
                  <p className='text-sm text-[#6b1f2b]/70'>{item.location}</p>
                )}

                {/* NOTE */}
                {item.note && (
                  <p className='text-xs text-[#6b1f2b]/50 mt-1 italic'>
                    {item.note}
                  </p>
                )}

                {/* MAP */}
                {item.mapLink && (
                  <a
                    href={item.mapLink}
                    target='_blank'
                    className='text-xs underline text-gold mt-2 inline-block'
                  >
                    Vezi pe hartă
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
