import { useEffect, useState } from "react";

export function useHeroLight() {
  const [light, setLight] = useState(0);

  useEffect(() => {
    let rafId: number;

    const animate = () => {
      const target =
        typeof window !== "undefined" && typeof window.__heroLight === "number"
          ? window.__heroLight
          : 0;

      setLight((prev) => prev + (target - prev) * 0.1);

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return light;
}
