import { SoundGrid } from "@/components/sound-grid";
import { ThemeToggle } from "@/components/theme-toggle";
import { Footer } from "@/components/footer";

export default function Page() {
  return (
    <main className="container mx-auto max-w-5xl px-4 py-8">
      <header className="mb-8 flex items-center justify-between">
        <h1 className="text-balance text-2xl font-semibold tracking-tight">
          Rizzboard
        </h1>
        <ThemeToggle />
      </header>

      <section className="mb-8">
        <p className="text-muted-foreground leading-relaxed text-sm">
          Tap a card to play/pause. Starting another sound stops the current
          one. Only one sound plays at a time. The soundboard is reactive and
          tracks what you play locally, automatically reordering sounds based on
          recency to keep your favorites at the top.
        </p>
      </section>

      <SoundGrid />

      <Footer />
    </main>
  );
}
