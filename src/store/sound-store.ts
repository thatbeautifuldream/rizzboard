"use client"

import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

type Controls = {
  play: () => void
  pause: () => void
  stop: () => void
}

type SoundState = {
  currentKey: string | null
  isPlaying: boolean
  currentControls?: Controls
  soundOrder: string[]
  toggle: (key: string, controls: Controls) => void
  stopCurrent: () => void
  onEnded: (key: string) => void
  triggerSound: (key: string) => void
  registerControls: (key: string, controls: Controls) => void
  reorderSounds: (fromIndex: number, toIndex: number) => void
  setSoundOrder: (order: string[]) => void
  resetSoundOrder: () => void
}

export const useSoundStore = create<SoundState>()(
  persist(
    (set, get) => {
      const registeredControls = new Map<string, Controls>()

      return {
        currentKey: null,
        isPlaying: false,
        currentControls: undefined,
        soundOrder: [],

        registerControls: (key: string, controls: Controls) => {
          registeredControls.set(key, controls)
        },

        toggle: (key: string, controls: Controls) => {
          const { currentKey, isPlaying, currentControls } = get()

          if (currentKey && currentKey !== key) {
            currentControls?.stop()
            controls.play()
            set({ currentKey: key, isPlaying: true, currentControls: controls })
            return
          }

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

        reorderSounds: (fromIndex: number, toIndex: number) => {
          const { soundOrder } = get()
          const newOrder = [...soundOrder]
          const [movedItem] = newOrder.splice(fromIndex, 1)
          newOrder.splice(toIndex, 0, movedItem)
          set({ soundOrder: newOrder })
        },

        setSoundOrder: (order: string[]) => {
          set({ soundOrder: order })
        },

        resetSoundOrder: () => {
          set({ soundOrder: [] })
        },
      }
    },
    {
      name: 'rizzboard-sound-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ soundOrder: state.soundOrder }),
      onRehydrateStorage: () => (state) => {
        if (state && !state.soundOrder) {
          state.soundOrder = []
        }
      }
    }
  )
)