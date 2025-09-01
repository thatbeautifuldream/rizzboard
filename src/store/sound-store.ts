"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

type Controls = {
  play: () => void
  pause: () => void
  stop: () => void
}

type SoundUsage = {
  [soundKey: string]: number
}

type SoundState = {
  currentKey: string | null
  isPlaying: boolean
  currentControls?: Controls
  usageCounts: SoundUsage
  // Actions
  toggle: (key: string, controls: Controls) => void
  stopCurrent: () => void
  onEnded: (key: string) => void
  incrementUsage: (key: string) => void
}

export const useSoundStore = create<SoundState>()(
  persist(
    (set, get) => ({
      currentKey: null,
      isPlaying: false,
      currentControls: undefined,
      usageCounts: {},

      toggle: (key, controls) => {
        const { currentKey, isPlaying, currentControls } = get()

        // If a different sound is playing, stop it and start new one
        if (currentKey && currentKey !== key) {
          currentControls?.stop()
          controls.play()
          set({ currentKey: key, isPlaying: true, currentControls: controls })
          return
        }

        // Same sound: toggle pause/play
        if (currentKey === key) {
          if (isPlaying) {
            controls.pause()
            set({ isPlaying: false })
          } else {
            controls.play()
            set({ isPlaying: true })
          }
          return
        }

        // No sound currently playing
        controls.play()
        set({ currentKey: key, isPlaying: true, currentControls: controls })
      },

      stopCurrent: () => {
        const { currentControls } = get()
        currentControls?.stop()
        set({ currentKey: null, isPlaying: false, currentControls: undefined })
      },

      onEnded: (key: string) => {
        const { currentKey } = get()
        if (currentKey === key) {
          set({ currentKey: null, isPlaying: false, currentControls: undefined })
        }
      },

      incrementUsage: (key: string) => {
        set((state) => ({
          usageCounts: {
            ...state.usageCounts,
            [key]: (state.usageCounts[key] || 0) + 1,
          },
        }))
      },
    }),
    {
      name: "sound-usage-storage",
      partialize: (state) => ({ usageCounts: state.usageCounts }),
    }
  )
)
