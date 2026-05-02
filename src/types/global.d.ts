export {};

declare global {
  interface Window {
    __heroLight?: number;
    __heroLightDir?: {
      x: number;
      y: number;
    };
    __heroInteract?: number;
  }
}
