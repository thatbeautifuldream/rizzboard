import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-8 border-t pt-6">
      <div className="flex justify-between text-sm text-muted-foreground">
        <p>
          For fun by{" "}
          <a
            href="https://milindmishra.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-foreground transition-colors"
          >
            Milind
          </a>
        </p>
        <p>
          Request{" "}
          <Link
            href="/request"
            className="underline hover:text-foreground transition-colors"
          >
            Audio
          </Link>
        </p>
      </div>
    </footer>
  );
}
