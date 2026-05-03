import { useEffect, useRef, useState } from "react";
import { useSectionProgress, type Section } from "@/hooks/useSectionProgress";
import { getSectionColor } from "@/utils/sectionThemes";

type Props = {
  sections: Section[];
  opened: boolean;
};

export default function FloatingNav({ sections, opened }: Props) {
  const { active, visited } = useSectionProgress(sections);

  const [revealed, setRevealed] = useState<string[]>([]);
  const [isIdle, setIsIdle] = useState(false);

  const prevVisited = useRef<string[]>([]);
  const scrollTimeout = useRef<number | null>(null);

  // 🎯 detect NEW visited (auto reveal)
  useEffect(() => {
    const newOnes = visited.filter((id) => !prevVisited.current.includes(id));

    if (newOnes.length) {
      newOnes.forEach((id) => {
        setRevealed((prev) => [...prev, id]);

        setTimeout(() => {
          setRevealed((prev) => prev.filter((x) => x !== id));
        }, 1400);
      });
    }

    prevVisited.current = visited;
  }, [visited]);

  // 🧠 detect scroll idle (this is the magic)
  useEffect(() => {
    const handleScroll = () => {
      setIsIdle(false);

      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }

      scrollTimeout.current = window.setTimeout(() => {
        setIsIdle(true);
      }, 250); // tweak: 150–250ms sweet spot
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, []);

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
    <div
      className={`fixed left-6 top-1/2 z-50 -translate-y-1/2 transition-opacity duration-700 ${
        opened ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
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
                      ? "scale-125"
                      : "opacity-70 hover:opacity-100"
                    : "scale-75 bg-black/10 blur-[1px]"
                }`}
                style={{
                  backgroundColor: isVisible ? getSectionColor(s.id) : undefined,
                }}
              />

              {/* LABEL / TOOLTIP */}
              <div
                onClick={() => isVisible && scrollTo(s.id)}
                className={`absolute left-6 cursor-pointer whitespace-nowrap text-xs uppercase tracking-[0.3em] text-[#6b1f2b]/80 transition-all duration-500 ${
                  !isVisible
                    ? "pointer-events-none opacity-0"
                    : isRevealed || isIdle
                      ? "pointer-events-auto translate-x-0 opacity-100"
                      : "pointer-events-none translate-x-2 opacity-0 group-hover:pointer-events-auto group-hover:translate-x-0 group-hover:opacity-100"
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
