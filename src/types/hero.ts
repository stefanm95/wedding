// types/hero.ts
import type { RefObject } from "react";

export type HeroProps = {
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
  paperRef: RefObject<HTMLElement | null>;
};

export type HeroVideoProps = {
  opened: boolean;
  paperRef: RefObject<HTMLElement | null>;
};

export type HeroIntroProps = {
  onOpen: () => void;
  progress: number;
  setProgress: (v: number) => void;
};
