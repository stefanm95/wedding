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
};

function getDeviceState(): DeviceState {
  if (typeof window === "undefined") {
    return {
      isMobile: false,
      isTablet: false,
      isDesktop: true,
      isTouch: false,
      orientation: "landscape",
    };
  }

  const width = window.innerWidth;

  return {
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
        setDevice(getDeviceState());
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
