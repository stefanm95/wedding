import { useScrollSystem, type Section } from "@/hooks/useScrollSystem";

type Props = {
  sections: Section[];
};

export default function FloatingNav({ sections }: Props) {
  const { active, visited, scrollTo } = useScrollSystem(sections);

  return (
    <div className="fixed bottom-1/4 left-8 z-50 -translate-y-1/4 opacity-80">
      <div className="flex flex-col gap-3">
        {sections.map((s) => {
          const isVisited = visited.includes(s.id);
          const isActive = active === s.id;

          return (
            <button
              key={s.id}
              onClick={() => isVisited && scrollTo(s.id)}
              className={`text-left text-[11px] uppercase tracking-[0.35em] transition-all duration-500 ease-out ${
                isVisited
                  ? isActive
                    ? "text-[#6b1f2b]"
                    : "text-[#6b1f2b]/60 hover:text-[#6b1f2b]"
                  : "text-black/10"
              } ${isActive ? "translate-x-1" : ""}`}
            >
              {s.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
