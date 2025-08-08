export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-200">
      <div className="mx-auto max-w-3xl px-6 py-14">
        {/* Header */}
        <header className="flex items-start justify-between">
          <h1 className="text-2xl font-semibold tracking-tight">Noor Ali</h1>
          <nav className="flex items-center gap-5 text-sm text-neutral-400">
            <a href="mailto:oronila@users.noreply.github.com" className="hover:text-neutral-200 transition">email</a>
            <a href="https://github.com/oronila" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-200 transition">github</a>
            <a href="/files/Noor_Ali_Resume_Summer_2026.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-200 transition">resume</a>
          </nav>
        </header>

        {/* Bio / Lines */}
        <section className="mt-8 space-y-4 leading-relaxed">
          <p>
            building simple, fast web things. interested in ai, product, and good ux.
          </p>
          <p>
            open-source and projects on{' '}
            <a href="https://github.com/oronila" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 decoration-neutral-600 hover:decoration-neutral-300">github</a>.
          </p>
          <p>
            always happy to chat — reach me by{' '}
            <a href="mailto:oronila@users.noreply.github.com" className="underline underline-offset-4 decoration-neutral-600 hover:decoration-neutral-300">email</a>.
          </p>
        </section>

        {/* Essays */}
        <section className="mt-10">
          <h2 className="text-xl font-semibold mb-3">Essays</h2>
          <ul className="space-y-2 text-neutral-300">
            <li>
              <a href="#" className="underline underline-offset-4 decoration-neutral-600 hover:decoration-neutral-300">open-source-memory</a>
            </li>
            <li>
              <a href="#" className="underline underline-offset-4 decoration-neutral-600 hover:decoration-neutral-300">hackathon-meta</a>
            </li>
          </ul>
        </section>

        {/* Footer */}
        <footer className="mt-16 text-center text-xs text-neutral-500">
          © {new Date().getFullYear()} Noor Ali
        </footer>
      </div>
    </main>
  );
}
