"use client";

import { cn } from "@/lib/utils";
import { useSoundStore } from "@/store/sound-store";
import { useAudio } from "@/hooks/use-audio";
import { formatSoundName } from "@/data/sounds";
import { Pause, Play } from "lucide-react";
import * as React from "react";
import { SOUNDS } from "@/data/sounds";

type Props = {
  sound: import("@/data/sounds").Sound;
};

export function SoundCard({ sound }: Props) {
  // Select primitives/functions separately to ensure stable snapshots
  const currentKey = useSoundStore((s) => s.currentKey);
  const toggle = useSoundStore((s) => s.toggle);
  const onEnded = useSoundStore((s) => s.onEnded);
  const registerControls = useSoundStore((s) => s.registerControls);

  const displayName = formatSoundName(sound.name);

  // Find the index of this sound to determine keyboard shortcut
  const soundIndex = SOUNDS.findIndex(s => s.key === sound.key);
  const isSpeedDial = soundIndex < 10;
  const shortcutKey = isSpeedDial ? (soundIndex === 9 ? "0" : (soundIndex + 1).toString()) : null;

  // Memoize onend callback for our custom audio hook
  const handleEnded = React.useCallback(() => onEnded(sound.key), [onEnded, sound.key]);

  const { play, pause, stop, isPlaying: audioPlaying, isLoading } = useAudio(sound.url, {
    onEnded: handleEnded,
  });

  const active = currentKey === sound.key && audioPlaying;

  const controls = React.useMemo(() => ({ play, pause, stop }), [play, pause, stop]);

  // Register controls for speed dial
  React.useEffect(() => {
    registerControls(sound.key, controls);
  }, [sound.key, controls, registerControls]);

  const handleToggle = React.useCallback(() => {
    toggle(sound.key, { play, pause, stop });
  }, [sound.key, toggle, play, pause, stop]);

  return (
    <div
      className={cn(
        "rounded-lg border bg-card text-card-foreground shadow-sm",
        "transition-all cursor-pointer hover:shadow-md hover:scale-[1.02]",
        "p-3 flex flex-col justify-between h-full min-h-[80px]",
        "relative",
        active
          ? "border-primary ring-1 ring-primary bg-primary/5"
          : "hover:border-primary/50"
      )}
      role="button"
      tabIndex={0}
      onClick={handleToggle}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " " || e.key === "Spacebar") {
          e.preventDefault();
          handleToggle();
        }
      }}
      aria-pressed={active}
      aria-busy={isLoading}
      aria-label={active ? `Pause ${displayName}` : `Play ${displayName}`}
    >
      {shortcutKey && (
        <div className="absolute top-2 right-2 flex items-center justify-center w-5 h-5 text-xs font-semibold bg-muted text-muted-foreground rounded-full border border-border">
          {shortcutKey}
        </div>
      )}
      <div className="flex-1">
        <h2 className="text-sm sm:text-base leading-tight line-clamp-2 break-words">
          {displayName}
        </h2>
      </div>
      <div className="flex justify-end mt-2">
        <div
          className={cn(
            "p-1.5 rounded-full transition-colors",
            active ? "bg-primary text-primary-foreground" : "bg-muted"
          )}
        >
          {active ? (
            <Pause className="size-4" fill="currentColor" aria-hidden="true" />
          ) : (
            <Play className="size-4" fill="currentColor" aria-hidden="true" />
          )}
        </div>
      </div>
    </div>
  );
}
