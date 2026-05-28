import { useEffect, useState } from "react";

/* ---------------- GLOBAL AUDIO ---------------- */

const audio = new Audio("/public/assets/audio/melody.mp3");

audio.loop = true;
audio.preload = "auto";

/* ---------------- HOOK ---------------- */

export function useAudio() {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const sync = () => {
      setIsPlaying(!audio.paused);
    };

    audio.addEventListener("play", sync);
    audio.addEventListener("pause", sync);
    audio.addEventListener("ended", sync);

    sync();

    return () => {
      audio.removeEventListener("play", sync);
      audio.removeEventListener("pause", sync);
      audio.removeEventListener("ended", sync);
    };
  }, []);

  /* ---------------- FADE IN ---------------- */

  const fadeIn = async () => {
    try {
      if (audio.paused) {
        await audio.play();
      }

      clearFade();

      fadeInterval = window.setInterval(() => {
        if (audio.volume >= 0.35) {
          audio.volume = 0.35;

          clearFade();
          return;
        }

        audio.volume += 0.02;
      }, 80);
    } catch (err) {
      console.error("Audio play failed:", err);
    }
  };

  /* ---------------- FADE OUT ---------------- */

  const fadeOut = () => {
    clearFade();

    fadeInterval = window.setInterval(() => {
      if (audio.volume <= 0.02) {
        audio.volume = 0;

        audio.pause();

        clearFade();
        return;
      }

      audio.volume -= 0.02;
    }, 80);
  };

  /* ---------------- TOGGLE ---------------- */

  const toggle = async () => {
    if (audio.paused) {
      await fadeIn();
    } else {
      fadeOut();
    }
  };

  return {
    isPlaying,
    toggle,
    fadeIn,
    fadeOut,
  };
}

/* ---------------- FADE CONTROL ---------------- */

let fadeInterval: number | null = null;

function clearFade() {
  if (fadeInterval) {
    clearInterval(fadeInterval);
    fadeInterval = null;
  }
}
