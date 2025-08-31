"use client"

import { create } from "zustand"

type Controls = {
  play: () => void
  pause: () => void
  stop: () => void
}

type SoundState = {
  currentId: string | null
  isPlaying: boolean
  currentControls?: Controls
  // Actions
  toggle: (id: string, controls: Controls) => void
  stopCurrent: () => void
  onEnded: (id: string) => void
}

export const useSoundStore = create<SoundState>((set, get) => ({
  currentId: null,
  isPlaying: false,
  currentControls: undefined,

  toggle: (id, controls) => {
    const { currentId, isPlaying, currentControls } = get()

    // If a different sound is playing, stop it and start new one
    if (currentId && currentId !== id) {
      currentControls?.stop()
      controls.play()
      set({ currentId: id, isPlaying: true, currentControls: controls })
      return
    }

    // Same sound: toggle pause/play
    if (currentId === id) {
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
    set({ currentId: id, isPlaying: true, currentControls: controls })
  },

  stopCurrent: () => {
    const { currentControls } = get()
    currentControls?.stop()
    set({ currentId: null, isPlaying: false, currentControls: undefined })
  },

  onEnded: (id: string) => {
    const { currentId } = get()
    if (currentId === id) {
      set({ currentId: null, isPlaying: false, currentControls: undefined })
    }
  },
}))
