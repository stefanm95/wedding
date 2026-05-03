import { useEffect, useState } from "react";

const BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
};

type DeviceState = {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isTouch: boolean;
  orientation: "portrait" | "landscape";
  width: number;
};

function getDeviceState(): DeviceState {
  if (typeof window === "undefined") {
    return {
      width: 0,
      isMobile: false,
      isTablet: false,
      isDesktop: true,
      isTouch: false,
      orientation: "landscape",
    };
  }

  const width = window.innerWidth;

  return {
    width,
    isMobile: width < BREAKPOINTS.mobile,
    isTablet: width >= BREAKPOINTS.mobile && width < BREAKPOINTS.tablet,
    isDesktop: width >= BREAKPOINTS.tablet,
    isTouch: "ontouchstart" in window || navigator.maxTouchPoints > 0,
    orientation: window.innerHeight > window.innerWidth ? "portrait" : "landscape",
  };
}

export function useDevice() {
  const [device, setDevice] = useState<DeviceState>(() => getDeviceState());

  useEffect(() => {
    if (typeof window === "undefined") return;

    let frame = 0;

    const update = () => {
      cancelAnimationFrame(frame);

      frame = requestAnimationFrame(() => {
        const next = getDeviceState();

        setDevice((prev) => {
          // prevent unnecessary re-renders
          if (prev.width === next.width && prev.orientation === next.orientation) {
            return prev;
          }
          return next;
        });
      });
    };

    window.addEventListener("resize", update);
    window.addEventListener("orientationchange", update);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", update);
      window.removeEventListener("orientationchange", update);
    };
  }, []);

  return device;
}
