import { useEffect, useState } from "react";

export function useHeroLight() {
  const [light, setLight] = useState(0);

  useEffect(() => {
    let rafId: number;
    let current = 0;
    let frame = 0;

    const animate = () => {
      const target =
        typeof window !== "undefined" && typeof window.__heroLight === "number"
          ? window.__heroLight
          : 0;

      current += (target - current) * 0.1;

      if (frame % 2 === 0) {
        setLight((prev) => (Math.abs(prev - current) > 0.01 ? current : prev));
      }

      frame += 1;

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return light;
}
