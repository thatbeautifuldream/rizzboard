"use client";

import { cn } from "@/lib/utils";
import { useSoundStore } from "@/store/sound-store";
import { Pause, Play } from "lucide-react";
import * as React from "react";
import useSound from "use-sound";

type Props = {
  id: string;
  name: string;
  url: string;
};

export function SoundCard({ id, name, url }: Props) {
  // Select primitives/functions separately to ensure stable snapshots
  const currentId = useSoundStore((s) => s.currentId);
  const isPlaying = useSoundStore((s) => s.isPlaying);
  const toggle = useSoundStore((s) => s.toggle);
  const onEnded = useSoundStore((s) => s.onEnded);

  // Memoize onend and options so use-sound doesn't recreate on every render
  const handleEnded = React.useCallback(() => onEnded(id), [onEnded, id]);
  const soundOptions = React.useMemo(
    () => ({
      interrupt: true,
      onend: handleEnded,
    }),
    [handleEnded]
  );

  const [play, { pause, stop }] = useSound(url, soundOptions);

  const active = currentId === id && isPlaying;

  return (
    <div
      className={cn(
        "rounded-lg border bg-card text-card-foreground shadow-sm",
        "transition-all cursor-pointer hover:shadow-md hover:scale-[1.02] min-h-[80px]",
        "p-3 flex flex-col justify-between",
        active
          ? "border-primary ring-1 ring-primary bg-primary/5"
          : "hover:border-primary/50"
      )}
      role="button"
      tabIndex={0}
      onClick={() => toggle(id, { play, pause, stop })}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggle(id, { play, pause, stop });
        }
      }}
      aria-pressed={active}
      aria-label={active ? `Pause ${name}` : `Play ${name}`}
    >
      <div className="flex-1">
        <h2 className="text-sm sm:text-base leading-tight line-clamp-2 break-words">
          {name}
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
