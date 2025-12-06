"use client"

import React, { useCallback, useEffect, useRef, useState } from "react"
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine"
import { draggable, dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter"
import invariant from "tiny-invariant"

import { cn } from "@/lib/utils"
import { useSoundStore } from "@/store/sound-store"
import { useAudio } from "@/hooks/use-audio"
import { formatSoundName } from "@/data/sounds"
import { Pause, Play, GripVertical } from "lucide-react"
import type { Sound } from "@/data/sounds"
import { useDragInstanceId } from "@/contexts/drag-context"

type State = "idle" | "dragging" | "over"

interface Props {
  sound: Sound
  index: number
  shortcutKey?: string | null
}

export function DraggableSoundCard({ sound, index, shortcutKey }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [state, setState] = useState<State>("idle")
  const instanceId = useDragInstanceId()

  const currentKey = useSoundStore((s) => s.currentKey)
  const toggle = useSoundStore((s) => s.toggle)
  const onEnded = useSoundStore((s) => s.onEnded)
  const registerControls = useSoundStore((s) => s.registerControls)

  const displayName = formatSoundName(sound.name)
  const handleEnded = useCallback(() => onEnded(sound.key), [onEnded, sound.key])

  const { play, pause, stop, isPlaying: audioPlaying, isLoading } = useAudio(sound.url, {
    onEnded: handleEnded,
  })

  const active = currentKey === sound.key && audioPlaying
  const controls = React.useMemo(() => ({ play, pause, stop }), [play, pause, stop])

  React.useEffect(() => {
    registerControls(sound.key, controls)
  }, [sound.key, controls, registerControls])

  const handleToggle = useCallback(() => {
    if (state === "dragging") return
    toggle(sound.key, { play, pause, stop })
  }, [sound.key, toggle, play, pause, stop, state])

  useEffect(() => {
    const el = ref.current
    invariant(el)

    return combine(
      draggable({
        element: el,
        getInitialData: () => ({
          type: "sound-item",
          soundKey: sound.key,
          index,
          instanceId,
        }),
        onDragStart: () => setState("dragging"),
        onDrop: () => setState("idle"),
      }),
      dropTargetForElements({
        element: el,
        getData: () => ({ soundKey: sound.key, index }),
        getIsSticky: () => true,
        canDrop: ({ source }) =>
          source.data.instanceId === instanceId &&
          source.data.type === "sound-item" &&
          source.data.soundKey !== sound.key,
        onDragEnter: () => setState("over"),
        onDragLeave: () => setState("idle"),
        onDrop: () => setState("idle"),
      }),
    )
  }, [instanceId, sound.key, index])

  const getDragStyles = (): string => {
    switch (state) {
      case "dragging":
        return "opacity-50 rotate-2 scale-95 cursor-grabbing"
      case "over":
        return "scale-105 -rotate-1 shadow-lg ring-2 ring-primary/20"
      default:
        return "hover:scale-102 hover:opacity-90"
    }
  }

  return (
    <div
      ref={ref}
      className={cn(
        "rounded-lg border bg-card text-card-foreground shadow-sm",
        "transition-all duration-200 ease-in-out cursor-grab hover:shadow-md",
        "p-3 flex flex-col justify-between h-full min-h-[80px] relative group select-none touch-none",
        active
          ? "border-primary ring-1 ring-primary bg-primary/5"
          : "hover:border-primary/50",
        getDragStyles()
      )}
      role="button"
      tabIndex={0}
      onClick={handleToggle}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " " || e.key === "Spacebar") {
          e.preventDefault()
          handleToggle()
        }
      }}
      aria-pressed={active}
      aria-busy={isLoading}
      aria-label={active ? `Pause ${displayName}` : `Play ${displayName}`}
    >
      <div className="absolute top-1 left-1 opacity-0 group-hover:opacity-50 transition-opacity duration-200">
        <GripVertical className="w-3 h-3 text-muted-foreground" />
      </div>

      {shortcutKey && (
        <div className="absolute top-2 right-2 flex items-center justify-center w-5 h-5 text-xs font-semibold bg-muted text-muted-foreground rounded-full border border-border">
          {shortcutKey}
        </div>
      )}

      <div className="flex-1">
        <h2 className="text-sm sm:text-base leading-tight line-clamp-2 break-words pl-4">
          {displayName}
        </h2>
      </div>

      <div className="flex justify-end mt-2">
        <div
          className={cn(
            "p-1.5 rounded-full transition-colors duration-200",
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
  )
}

export default DraggableSoundCard