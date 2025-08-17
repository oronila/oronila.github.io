import Link from "next/link";

type Project = {
  title: string;
  description: string;
  tags: string[];
  links: { label: string; href: string; internal?: boolean }[];
};

const projects: Project[] = [
  {
    title: "Chat with Noor",
    description:
      "Lightweight chat page that answers in my voice with graceful fallback if AI is unavailable.",
    tags: ["Next.js", "API Route", "UI"],
    links: [
      { label: "Open chat", href: "/chat", internal: true },
    ],
  },
];

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-200">
      <div className="mx-auto max-w-3xl px-6 py-14">
        {/* Header */}
        <header className="flex items-start justify-between">
          <Link href="/" className="text-sm text-neutral-400 transition hover:text-neutral-200">
            ← Back
          </Link>
          <h1 className="text-2xl font-semibold tracking-tight">Projects</h1>
          <div className="w-10" />
        </header>

        {/* Grid */}
        <section className="mt-8 grid gap-4 sm:grid-cols-2">
          {projects.map((p) => (
            <article
              key={p.title}
              className="group rounded-xl border border-neutral-800 bg-neutral-900/30 p-4 transition hover:border-neutral-700 hover:bg-neutral-900/40"
            >
              <h2 className="text-base font-medium tracking-tight text-neutral-100">
                {p.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-neutral-400">
                {p.description}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-neutral-800 bg-neutral-900/50 px-2 py-0.5 text-[11px] text-neutral-400"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {p.links.map((l) =>
                  l.internal ? (
                    <Link
                      key={l.label}
                      href={l.href}
                      className="inline-flex items-center gap-1 rounded-lg border border-neutral-800 bg-neutral-900/40 px-3 py-1.5 text-xs text-neutral-300 transition hover:border-neutral-700 hover:text-neutral-100"
                    >
                      {l.label}
                      <span aria-hidden>→</span>
                    </Link>
                  ) : (
                    <a
                      key={l.label}
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 rounded-lg border border-neutral-800 bg-neutral-900/40 px-3 py-1.5 text-xs text-neutral-300 transition hover:border-neutral-700 hover:text-neutral-100"
                    >
                      {l.label}
                      <span aria-hidden>↗</span>
                    </a>
                  )
                )}
              </div>
            </article>
          ))}
        </section>

        {/* Footer */}
        <footer className="mt-10 text-center text-xs text-neutral-500">
          Want more details? Open the chat or email me at noorali05@utexas.edu.
        </footer>
      </div>
    </main>
  );
}



