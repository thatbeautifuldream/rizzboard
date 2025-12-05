"use client"

import { SOUNDS } from "@/data/sounds"
import { SoundCard } from "@/components/sound-card"
import { motion } from "motion/react"

export function SoundGrid() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {SOUNDS.map((s) => (
        <motion.div
          key={s.key}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="h-full"
        >
          <SoundCard sound={s} />
        </motion.div>
      ))}
    </div>
  )
}
