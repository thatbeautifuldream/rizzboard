"use client";

import { cn } from "@/lib/utils";
import { useSoundStore } from "@/store/sound-store";
import { Pause, Play } from "lucide-react";
import * as React from "react";
import useSound from "use-sound";

type Props = {
  sound: import("@/data/sounds").Sound;
};

export function SoundCard({ sound }: Props) {
  // Select primitives/functions separately to ensure stable snapshots
  const currentKey = useSoundStore((s) => s.currentKey);
  const isPlaying = useSoundStore((s) => s.isPlaying);
  const toggle = useSoundStore((s) => s.toggle);
  const onEnded = useSoundStore((s) => s.onEnded);
  const incrementUsage = useSoundStore((s) => s.incrementUsage);

  // Import utility functions
  const { formatSoundName, getSoundId } = React.useMemo(() => {
    return {
      formatSoundName: (filename: string) => {
        return filename
          .replace('.mp3', '')
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
      },
      getSoundId: (filename: string) => filename.replace('.mp3', '')
    };
  }, []);

  const displayName = formatSoundName(sound.name);
  const soundId = getSoundId(sound.name);

  // Memoize onend and options so use-sound doesn't recreate on every render
  const handleEnded = React.useCallback(() => onEnded(sound.key), [onEnded, sound.key]);
  const soundOptions = React.useMemo(
    () => ({
      interrupt: true,
      onend: handleEnded,
    }),
    [handleEnded]
  );

  const [play, { pause, stop }] = useSound(sound.url, soundOptions);

  const active = currentKey === sound.key && isPlaying;

  const handleToggle = React.useCallback(() => {
    const wasPlaying = active;
    toggle(sound.key, { play, pause, stop });
    
    // Only increment usage when starting to play (not when pausing)
    if (!wasPlaying && (!currentKey || currentKey !== sound.key)) {
      incrementUsage(sound.key);
    }
  }, [sound.key, active, currentKey, toggle, play, pause, stop, incrementUsage]);

  return (
    <div
      className={cn(
        "rounded-lg border bg-card text-card-foreground shadow-sm",
        "transition-all cursor-pointer hover:shadow-md hover:scale-[1.02]",
        "p-3 flex flex-col justify-between h-full min-h-[80px]",
        active
          ? "border-primary ring-1 ring-primary bg-primary/5"
          : "hover:border-primary/50"
      )}
      role="button"
      tabIndex={0}
      onClick={handleToggle}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleToggle();
        }
      }}
      aria-pressed={active}
      aria-label={active ? `Pause ${displayName}` : `Play ${displayName}`}
    >
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
            <Pause className="size-4" aria-hidden="true" />
          ) : (
            <Play className="size-4" aria-hidden="true" />
          )}
        </div>
      </div>
    </div>
  );
}
