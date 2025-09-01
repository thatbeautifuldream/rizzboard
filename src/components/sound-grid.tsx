"use client"

import { SOUNDS } from "@/data/sounds"
import { SoundCard } from "@/components/sound-card"
import { useSoundStore } from "@/store/sound-store"
import { motion } from "motion/react"
import { useMemo } from "react"

export function SoundGrid() {
  const usageCounts = useSoundStore((s) => s.usageCounts)
  
  const sortedSounds = useMemo(() => {
    return [...SOUNDS].sort((a, b) => {
      const aCount = usageCounts[a.key] || 0
      const bCount = usageCounts[b.key] || 0
      return bCount - aCount
    })
  }, [usageCounts])

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {sortedSounds.map((s) => (
        <motion.div
          key={s.key}
          layout
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="h-full"
        >
          <SoundCard sound={s} />
        </motion.div>
      ))}
    </div>
  )
}
