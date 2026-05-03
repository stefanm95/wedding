import { useEffect, useState } from "react";

type Section = {
  id: string;
  label: string;
};

type FloatingNavProps = {
  sections: Section[];
};

export default function FloatingNav({ sections }: FloatingNavProps) {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      let current = "hero";

      sections.forEach((section) => {
        const el = document.getElementById(section.id);
        if (!el) return;

        const rect = el.getBoundingClientRect();

        if (rect.top <= window.innerHeight * 0.4) {
          current = section.id;
        }
      });

      setActive(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    el.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="fixed right-6 top-1/2 z-50 flex -translate-y-1/2 flex-col gap-4">
      {sections.map((s) => (
        <button
          key={s.id}
          onClick={() => scrollTo(s.id)}
          className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${active === s.id ? "scale-125 bg-[#6b1f2b]" : "bg-white/40 hover:bg-white/70"} `}
        />
      ))}
    </div>
  );
}
