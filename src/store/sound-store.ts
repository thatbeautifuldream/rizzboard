"use client"

import { create } from "zustand"

type Controls = {
  play: () => void
  pause: () => void
  stop: () => void
}

type SoundState = {
  currentKey: string | null
  isPlaying: boolean
  currentControls?: Controls
  // Actions
  toggle: (key: string, controls: Controls) => void
  stopCurrent: () => void
  onEnded: (key: string) => void
  triggerSound: (key: string) => void // New function for speed dial
  registerControls: (key: string, controls: Controls) => void
}

export const useSoundStore = create<SoundState>()((set, get) => {
  // Store registered controls for each sound key
  const registeredControls = new Map<string, Controls>()

  return {
    currentKey: null,
    isPlaying: false,
    currentControls: undefined,

    registerControls: (key: string, controls: Controls) => {
      registeredControls.set(key, controls)
    },

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

    triggerSound: (key: string) => {
      const controls = registeredControls.get(key)
      if (controls) {
        get().toggle(key, controls)
      }
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
  }
})
