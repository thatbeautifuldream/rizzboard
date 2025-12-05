"use client";

import { useHotkeys } from "react-hotkeys-hook";
import { SOUNDS } from "@/data/sounds";
import { useSoundStore } from "@/store/sound-store";

export function SpeedDial() {
  const triggerSound = useSoundStore((s) => s.triggerSound);

  // Get the first 10 sounds for speed dial
  const speedDialSounds = SOUNDS.slice(0, 10);

  // Set up hotkeys for keys 1-9 and 0
  speedDialSounds.forEach((sound, index) => {
    const key = index === 9 ? "0" : (index + 1).toString();

    useHotkeys(
      key,
      () => {
        triggerSound(sound.key);
      },
      {
        description: `Play ${sound.name}`,
        preventDefault: true,
      },
      [sound.key, triggerSound]
    );
  });

  // This component doesn't render anything visible
  // It just handles the keyboard shortcuts
  return null;
}