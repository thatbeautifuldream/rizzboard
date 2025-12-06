"use client"

import { useHotkeys } from "react-hotkeys-hook"
import { useMemo } from "react"

import { SOUNDS } from "@/data/sounds"
import { useSoundStore } from "@/store/sound-store"

export function SpeedDial() {
  const triggerSound = useSoundStore((s) => s.triggerSound)
  const soundOrder = useSoundStore((s) => s.soundOrder)

  const orderedSounds = useMemo(() => {
    if (soundOrder.length === 0) {
      return SOUNDS
    }

    const soundMap = new Map(SOUNDS.map(sound => [sound.key, sound]))
    const ordered = soundOrder
      .filter(key => soundMap.has(key))
      .map(key => soundMap.get(key)!)

    const existingKeys = new Set(ordered.map(s => s.key))
    const newSounds = SOUNDS.filter(sound => !existingKeys.has(sound.key))

    return [...ordered, ...newSounds]
  }, [soundOrder])

  const speedDialSounds = orderedSounds.slice(0, 10)

  speedDialSounds.forEach((sound, index) => {
    const key = index === 9 ? "0" : (index + 1).toString()

    useHotkeys(
      key,
      () => triggerSound(sound.key),
      {
        description: `Play ${sound.name}`,
        preventDefault: true,
      },
      [sound.key, triggerSound]
    )
  })

  return null
}