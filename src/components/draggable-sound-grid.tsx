"use client"

import React, { useEffect, useMemo } from "react"
import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter"

import { SOUNDS } from "@/data/sounds"
import { useSoundStore } from "@/store/sound-store"
import DraggableSoundCard from "./draggable-sound-card"
import { motion } from "motion/react"
import { useDragInstanceId } from "@/contexts/drag-context"

export function DraggableSoundGrid() {
  const instanceId = useDragInstanceId()
  const soundOrder = useSoundStore((state) => state.soundOrder)
  const reorderSounds = useSoundStore((state) => state.reorderSounds)

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

  useEffect(() => {
    return monitorForElements({
      canMonitor({ source }) {
        return source.data.instanceId === instanceId
      },
      onDrop({ source, location }) {
        const destination = location.current.dropTargets[0]
        if (!destination) return

        const destinationIndex = destination.data.index
        const sourceIndex = source.data.index

        if (typeof destinationIndex !== "number" || typeof sourceIndex !== "number") return
        if (destinationIndex === sourceIndex) return

        reorderSounds(sourceIndex, destinationIndex)
      },
    })
  }, [instanceId, reorderSounds])

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {orderedSounds.map((sound, index) => {
        const isSpeedDial = index < 10
        const shortcutKey = isSpeedDial ? (index === 9 ? "0" : (index + 1).toString()) : null

        return (
          <motion.div
            key={sound.key}
            layout
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="h-full"
          >
            <DraggableSoundCard
              sound={sound}
              index={index}
              shortcutKey={shortcutKey}
            />
          </motion.div>
        )
      })}
    </div>
  )
}