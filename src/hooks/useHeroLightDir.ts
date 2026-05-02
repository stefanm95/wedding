import { useEffect, useState } from "react";

export function useHeroLightDir() {
  const [dir, setDir] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let raf: number;

    const loop = () => {
      if (window.__heroLightDir) {
        setDir(window.__heroLightDir);
      }
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return dir;
}
