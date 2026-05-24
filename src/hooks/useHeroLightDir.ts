import { useEffect, useState } from "react";

export function useHeroLightDir() {
  const [dir, setDir] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let raf: number;
    let current = { x: 0, y: 0 };
    let frame = 0;

    const loop = () => {
      if (window.__heroLightDir) {
        current = window.__heroLightDir;

        if (frame % 2 === 0) {
          setDir((prev) =>
            Math.abs(prev.x - current.x) > 0.01 || Math.abs(prev.y - current.y) > 0.01
              ? current
              : prev,
          );
        }
      }

      frame += 1;
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return dir;
}
