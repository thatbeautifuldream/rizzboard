"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause } from "lucide-react"
import useSound from "use-sound"
import { useSoundStore } from "@/store/sound-store"
import { cn } from "@/lib/utils"
import * as React from "react"

type Props = {
  id: string
  name: string
  url: string
}

export function SoundCard({ id, name, url }: Props) {
  // Select primitives/functions separately to ensure stable snapshots
  const currentId = useSoundStore((s) => s.currentId)
  const isPlaying = useSoundStore((s) => s.isPlaying)
  const toggle = useSoundStore((s) => s.toggle)
  const onEnded = useSoundStore((s) => s.onEnded)

  // Memoize onend and options so use-sound doesn't recreate on every render
  const handleEnded = React.useCallback(() => onEnded(id), [onEnded, id])
  const soundOptions = React.useMemo(
    () => ({
      interrupt: true,
      onend: handleEnded,
    }),
    [handleEnded],
  )

  const [play, { pause, stop }] = useSound(url, soundOptions)

  const active = currentId === id && isPlaying

  return (
    <Card className={cn("transition-colors", active ? "border-primary ring-1 ring-primary" : "")} role="group">
      <CardContent className="p-3">
        <Button
          type="button"
          onClick={() => toggle(id, { play, pause, stop })}
          className={cn("w-full justify-between")}
          variant={active ? "default" : "outline"}
          aria-pressed={active}
          aria-label={active ? `Pause ${name}` : `Play ${name}`}
        >
          <span className="font-medium text-pretty">{name}</span>
          {active ? <Pause className="size-4" aria-hidden="true" /> : <Play className="size-4" aria-hidden="true" />}
        </Button>
      </CardContent>
    </Card>
  )
}
