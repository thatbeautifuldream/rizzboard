import { DraggableSoundGrid } from "@/components/draggable-sound-grid"
import { ThemeToggle } from "@/components/theme-toggle"
import { Footer } from "@/components/footer"
import { HotkeysWrapper } from "@/components/hotkeys-wrapper"
import { DragInstanceIdProvider } from "@/contexts/drag-context"

export default function Page() {
  return (
    <DragInstanceIdProvider>
      <main className="container mx-auto max-w-5xl px-4 py-8">
        <header className="mb-8 flex items-center justify-between">
          <h1 className="text-balance text-2xl font-semibold tracking-tight">
            Rizzboard
          </h1>
          <ThemeToggle />
        </header>

        <section className="mb-8">
          <p className="text-muted-foreground leading-relaxed text-sm">
            Tap a card to play/pause. Starting another sound stops the current one.
            Only one sound plays at a time. Press keys 1-9 and 0 for speed dial.
            Drag and drop sound cards to reorder them and customize your speed dial.
          </p>
        </section>

        <HotkeysWrapper />
        <DraggableSoundGrid />

        <Footer />
      </main>
    </DragInstanceIdProvider>
  )
}