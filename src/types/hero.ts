// types/hero.ts
import type { RefObject } from "react";

export type HeroProps = {
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
  heroRef: RefObject<HTMLElement | null>;
  paperRef: RefObject<HTMLElement | null>;
};

export type HeroVideoProps = {
  opened: boolean;
  heroRef: RefObject<HTMLElement | null>;
  paperRef: RefObject<HTMLElement | null>;
};

export type HeroIntroProps = {
  onOpen: () => void;
  progress: number;
  setProgress: (v: number) => void;
};
