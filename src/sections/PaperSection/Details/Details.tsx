import { detailsData } from "./detailsData";

export default function Details() {
  return (
    <section className="relative overflow-hidden py-12 text-[#6b1f2b] md:py-16">
      <div className="mx-auto max-w-5xl px-6">
        {/* ========================= */}
        {/* ✨ HEADER */}
        {/* ========================= */}

        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div>
            <h2 className="script-cormorant-display text-[30px] tracking-[0.08em] text-[#6b1f2b] sm:text-[34px] md:text-[40px]">
              DETALII SUPLIMENTARE
            </h2>

            <div className="mb-8 mt-3 flex items-center gap-3">
              <div className="h-[1px] w-10 bg-[#c9a46c]" />
              <div className="h-2 w-2 rotate-45 bg-[#c9a46c]" />
              <div className="h-[1px] w-10 bg-[#c9a46c]" />
            </div>
          </div>
        </div>

        {/* ========================= */}
        {/* ✨ INTRODUCTION */}
        {/* ========================= */}

        <div className="mx-auto max-w-3xl">
          <div className="grid gap-10 md:grid-cols-2 md:gap-x-16 md:gap-y-12">
            {detailsData.introduction.map((paragraph) => (
              <div key={paragraph} className="relative border-l border-[#c9a46c]/35 pl-5">
                <p className="text-[#6b1f2b]/68 text-[14px] leading-[2] md:text-[15px]">
                  {paragraph}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ========================= */}
        {/* ✨ TRANSPORT */}
        {/* ========================= */}

        <div className="mt-32">
          {/* transport header */}
          <div className="mb-16 text-center">
            <p className="text-[10px] uppercase tracking-[0.38em] text-[#6b1f2b]/40">
              Organizare transport
            </p>

            <h3 className="mt-4 text-[32px] text-[#6b1f2b] md:text-[42px]">Transport</h3>
          </div>

          {/* transport grid */}
          <div className="grid gap-20 md:grid-cols-2 md:gap-24">
            <TransportBlock
              title={detailsData.transport.toEvent.title}
              items={detailsData.transport.toEvent.items}
            />

            <TransportBlock
              title={detailsData.transport.return.title}
              items={detailsData.transport.return.items}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

type TransportItem = {
  label: string;
  value: string;
};

type TransportBlockProps = {
  title: string;
  items: TransportItem[];
};

function TransportBlock({ title, items }: TransportBlockProps) {
  return (
    <div>
      {/* title */}
      <div className="mb-10">
        <h4 className="text-[24px] leading-none text-[#6b1f2b]">{title}</h4>

        <div className="mt-4 h-[1px] w-16 bg-[#c9a46c]/40" />
      </div>

      {/* rows */}
      <div className="space-y-6">
        {items.map((item) => (
          <div
            key={item.label}
            className="border-[#6b1f2b]/8 flex items-end justify-between gap-8 border-b pb-4"
          >
            {/* label */}
            <span className="text-[#6b1f2b]/42 text-[10px] uppercase tracking-[0.24em]">
              {item.label}
            </span>

            {/* value */}
            <span className="text-right text-[15px] text-[#6b1f2b]/80">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
