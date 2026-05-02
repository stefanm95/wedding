import { cn } from "@utils/cn";
import type { ProgramItemType } from "./programData";

type Props = {
  item: ProgramItemType;
  index: number;
};

export default function ProgramItem({ item, index }: Props) {
  const isTransport = item.type === "transport";

  // 🔥 stair offset (safe for responsiveness)
  const offset = Math.min(index * 32, 96);

  return (
    <div
      className="relative flex items-start gap-6"
      style={{
        marginLeft: offset,
      }}
    >
      {/* TIME */}
      <div className="w-[65px] text-right">
        <p className="font-serif text-[14px] text-[#6b1f2b]/70">{item.time}</p>
      </div>

      {/* DOT */}
      <div
        className={cn("mt-[6px] h-3 w-3 rotate-45", isTransport ? "bg-[#c9a46c]" : "bg-[#6b1f2b]")}
      />

      {/* CONTENT */}
      <div className="max-w-[420px]">
        {/* TYPE */}
        <p className="mb-2 text-[9px] uppercase tracking-[0.45em] text-[#6b1f2b]/70">
          {isTransport ? "Transport" : "Eveniment"}
        </p>

        {/* TITLE */}
        <h3 className="script-cormorant-display mb-1 text-[24px] text-[#3d2b1f]">{item.title}</h3>

        {/* LOCATION */}
        {item.location && <p className="mb-2 text-[14px] text-[#3d2b1f]/70">{item.location}</p>}

        {/* NOTE */}
        {item.note && <p className="mb-2 text-[13px] italic text-[#6b1f2b]/60">{item.note}</p>}

        {/* MAP */}
        {item.mapLink && (
          <a
            href={item.mapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-[#4a1c24]"
          >
            <span className="text-[8px] text-[#c9a46c]">◆</span>

            <span className="transition group-hover:tracking-[0.3em] group-hover:text-[#6b1f2b]">
              Vezi pe hartă
            </span>

            <span className="absolute bottom-0 left-0 h-[1px] w-full origin-left scale-x-0 bg-[#c9a46c]/70 transition-transform duration-300 group-hover:scale-x-100" />
          </a>
        )}
      </div>
    </div>
  );
}
