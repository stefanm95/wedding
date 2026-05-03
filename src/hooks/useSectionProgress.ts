import { useEffect, useState } from "react";

export type Section = {
  id: string;
  label: string;
};

export function useSectionProgress(sections: Section[]) {
  const [active, setActive] = useState("hero");
  const [visited, setVisited] = useState<string[]>(["hero"]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    // ❌ exclude hero from observer system
    const filteredSections = sections.filter((s) => s.id !== "hero");

    filteredSections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActive(section.id);

            setVisited((prev) => (prev.includes(section.id) ? prev : [...prev, section.id]));
          }
        },
        {
          root: null,
          threshold: 0,
          rootMargin: "-20% 0px -40% 0px",
        },
      );

      observer.observe(el);
      observers.push(observer);
    });

    // 🔥 HERO fallback based on scroll position
    const handleScroll = () => {
      if (window.scrollY < window.innerHeight * 0.3) {
        setActive("hero");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observers.forEach((o) => o.disconnect());
      window.removeEventListener("scroll", handleScroll);
    };
  }, [sections]);

  return { active, visited };
}
