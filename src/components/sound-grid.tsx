"use client"

import { SOUNDS } from "@/data/sounds"
import { SoundCard } from "@/components/sound-card"

export function SoundGrid() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {SOUNDS.map((s) => (
        <SoundCard key={s.id} id={s.id} name={s.name} url={s.url} />
      ))}
    </div>
  )
}
