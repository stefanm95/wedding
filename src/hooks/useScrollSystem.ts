// hooks/useScrollSystem.ts
import { useEffect, useState } from "react";

export type Section = {
  id: string;
  label: string;
};

export function useScrollSystem(sections: Section[]) {
  const [active, setActive] = useState("hero");
  const [visited, setVisited] = useState<string[]>(["hero"]);

  useEffect(() => {
    const handleScroll = () => {
      let current = "hero";
      let closest = Infinity;

      sections.forEach((section) => {
        const el = document.getElementById(section.id);
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const distance = Math.abs(rect.top);

        // 🔥 THIS is the fix for "story not activating"
        if (rect.top <= window.innerHeight * 0.55 && distance < closest) {
          closest = distance;
          current = section.id;
        }
      });

      setActive(current);

      setVisited((prev) => (prev.includes(current) ? prev : [...prev, current]));
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    const y = el.getBoundingClientRect().top + window.scrollY;

    window.scrollTo({
      top: y - 40,
      behavior: "smooth",
    });
  };

  return {
    active,
    visited,
    scrollTo,
  };
}
