import { useEffect, useRef, useState } from "react";
import { useSectionProgress, type Section } from "@/hooks/useSectionProgress";

type Props = {
  sections: Section[];
};

export default function FloatingNav({ sections }: Props) {
  const { active, visited } = useSectionProgress(sections);

  const [revealed, setRevealed] = useState<string[]>([]);
  const prevVisited = useRef<string[]>([]);

  // 🎯 detect NEW visited sections
  useEffect(() => {
    const newOnes = visited.filter((id) => !prevVisited.current.includes(id));

    if (newOnes.length) {
      newOnes.forEach((id) => {
        // add to revealed
        setRevealed((prev) => [...prev, id]);

        // remove after animation
        setTimeout(() => {
          setRevealed((prev) => prev.filter((x) => x !== id));
        }, 1600);
      });
    }

    prevVisited.current = visited;
  }, [visited]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    const y = el.getBoundingClientRect().top + window.scrollY;

    window.scrollTo({
      top: y - 20,
      behavior: "smooth",
    });
  };

  return (
    <div className="fixed left-6 top-1/2 z-50 -translate-y-1/2">
      <div className="flex flex-col gap-6">
        {sections.map((s) => {
          const isVisible = visited.includes(s.id);
          const isActive = active === s.id;
          const isRevealed = revealed.includes(s.id);

          return (
            <div key={s.id} className="group relative flex items-center">
              {/* DOT */}
              <button
                onClick={() => isVisible && scrollTo(s.id)}
                className={`h-2.5 w-2.5 rounded-full transition-all duration-500 ${
                  isVisible
                    ? isActive
                      ? "scale-125 bg-[#6b1f2b]"
                      : "bg-[#6b1f2b]/40 hover:bg-[#6b1f2b]/70"
                    : "scale-75 bg-black/10 blur-[1px]"
                }`}
              />

              {/* TOOLTIP */}
              <div
                className={`pointer-events-none absolute left-6 whitespace-nowrap text-xs uppercase tracking-[0.3em] text-[#6b1f2b]/80 transition-all duration-500 ${
                  isVisible
                    ? isRevealed
                      ? "translate-x-0 opacity-100" // 🔥 auto reveal
                      : "translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                    : "opacity-0"
                } `}
              >
                {s.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
