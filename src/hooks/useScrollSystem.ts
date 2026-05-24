// hooks/useScrollSystem.ts
import { useCallback, useEffect, useMemo, useState } from "react";

export type Section = {
  id: string;
  label: string;
};

type TrackedSection = Section & {
  el: HTMLElement | null;
};

type Snapshot = {
  active: string;
  visited: string[];
};

const subscribers = new Set<() => void>();
let trackedSections: TrackedSection[] = [];
let sectionsKey = "";
let active = "hero";
let visited = new Set<string>(["hero"]);
let rafId: number | null = null;
let listening = false;

const getSnapshot = (): Snapshot => ({
  active,
  visited: Array.from(visited),
});

const notify = () => {
  subscribers.forEach((subscriber) => subscriber());
};

const calculateActiveSection = () => {
  rafId = null;

  let current = "hero";
  let closest = Infinity;
  const activationLine = window.innerHeight * 0.55;

  trackedSections.forEach((section) => {
    if (!section.el) {
      return;
    }

    const rect = section.el.getBoundingClientRect();
    const distance = Math.abs(rect.top);

    if (rect.top <= activationLine && distance < closest) {
      closest = distance;
      current = section.id;
    }
  });

  const activeChanged = active !== current;
  const visitedChanged = !visited.has(current);

  if (activeChanged) {
    active = current;
  }

  if (visitedChanged) {
    visited = new Set(visited).add(current);
  }

  if (activeChanged || visitedChanged) {
    notify();
  }
};

const scheduleActiveSectionCalculation = () => {
  if (rafId != null) {
    return;
  }

  rafId = requestAnimationFrame(calculateActiveSection);
};

const ensureScrollListener = () => {
  if (listening) {
    return;
  }

  window.addEventListener("scroll", scheduleActiveSectionCalculation, { passive: true });
  window.addEventListener("resize", refreshSectionElements, { passive: true });
  listening = true;
};

function refreshSectionElements() {
  trackedSections = trackedSections.map((section) => ({
    ...section,
    el: document.getElementById(section.id),
  }));

  scheduleActiveSectionCalculation();
}

const configureSections = (sections: Section[]) => {
  const nextKey = sections.map((section) => section.id).join("|");

  if (nextKey === sectionsKey) {
    return;
  }

  sectionsKey = nextKey;
  trackedSections = sections.map((section) => ({
    ...section,
    el: document.getElementById(section.id),
  }));

  scheduleActiveSectionCalculation();
};

const subscribe = (subscriber: () => void) => {
  subscribers.add(subscriber);
  ensureScrollListener();

  return () => {
    subscribers.delete(subscriber);

    if (subscribers.size === 0 && listening) {
      window.removeEventListener("scroll", scheduleActiveSectionCalculation);
      window.removeEventListener("resize", refreshSectionElements);
      listening = false;

      if (rafId != null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    }
  };
};

export function useScrollSystem(sections: Section[]) {
  const stableSectionsKey = useMemo(() => sections.map((section) => section.id).join("|"), [sections]);
  const [snapshot, setSnapshot] = useState(getSnapshot);

  useEffect(() => {
    configureSections(sections);

    return subscribe(() => {
      setSnapshot(getSnapshot());
    });
  }, [sections, stableSectionsKey]);

  const scrollTo = useCallback((id: string) => {
    const cached = trackedSections.find((section) => section.id === id)?.el;
    const el = cached || document.getElementById(id);

    if (!el) {
      return;
    }

    const y = el.getBoundingClientRect().top + window.scrollY;

    window.scrollTo({
      top: y - 40,
      behavior: "smooth",
    });
  }, []);

  return {
    active: snapshot.active,
    visited: snapshot.visited,
    scrollTo,
  };
}
