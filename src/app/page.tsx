import { SoundGrid } from "@/components/sound-grid";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Page() {
  return (
    <main className="container mx-auto max-w-5xl px-4 py-8">
      <header className="mb-8 flex items-center justify-between">
        <h1 className="text-balance text-2xl font-semibold tracking-tight">
          Rizzboard
        </h1>
        <ThemeToggle />
      </header>

      <section className="mb-6">
        <p className="text-muted-foreground max-w-prose">
          Tap a card to play/pause. Starting another sound stops the current
          one. Only one sound plays at a time.
        </p>
      </section>

      <SoundGrid />
    </main>
  );
}
