'use client';

import { useState, useEffect } from 'react';
import ToggleSwitch from '../components/ToggleSwitch';
import Terminal from '../components/Terminal';

export default function Home() {
  const [isTerminalMode, setIsTerminalMode] = useState(false);

  // Listen for terminal exit event
  useEffect(() => {
    const handleTerminalExit = () => {
      setIsTerminalMode(false);
    };

    window.addEventListener('terminal-exit', handleTerminalExit);
    return () => window.removeEventListener('terminal-exit', handleTerminalExit);
  }, []);

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-200">
      <div className="mx-auto max-w-3xl px-6 py-14">
        {/* Header with Toggle */}
        <header className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold tracking-tight">Noor Ali</h1>
          
          {/* Toggle Switch */}
          <div className="flex items-center gap-5">
            <ToggleSwitch
              isOn={isTerminalMode}
              onToggle={() => setIsTerminalMode(!isTerminalMode)}
              onLabel="Technical"
              offLabel="Non-Technical"
            />
            
            {/* Social Links */}
            <nav className="flex items-center gap-5 text-sm text-neutral-400">
              <a href="https://github.com/oronila" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-200 transition" aria-label="GitHub">
                {/* GitHub icon */}
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.015c0 4.425 2.865 8.178 6.839 9.499.5.092.682-.217.682-.483 0-.238-.009-.868-.014-1.703-2.782.604-3.369-1.343-3.369-1.343-.455-1.158-1.11-1.468-1.11-1.468-.907-.62.069-.607.069-.607 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.833.091-.647.35-1.088.636-1.338-2.221-.253-4.555-1.113-4.555-4.952 0-1.094.39-1.99 1.03-2.691-.103-.253-.447-1.273.098-2.655 0 0 .84-.27 2.75 1.027A9.563 9.563 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.297 2.748-1.027 2.748-1.027.546 1.382.202 2.402.1 2.655.64.701 1.028 1.597 1.028 2.691 0 3.848-2.337 4.696-4.566 4.943.36.31.68.921.68 1.856 0 1.339-.012 2.418-.012 2.747 0 .268.18.58.688.481C19.138 20.19 22 16.439 22 12.015 22 6.484 17.523 2 12 2Z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="https://www.linkedin.com/in/noor-ali05/" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-200 transition" aria-label="LinkedIn">
                {/* LinkedIn icon */}
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                  <path d="M4.983 3.5C4.983 4.604 4.09 5.5 2.99 5.5 1.89 5.5 1 4.604 1 3.5 1 2.396 1.89 1.5 2.99 1.5c1.1 0 1.993.896 1.993 2Zm.017 3.5H1v15h4V7ZM8 7h3.833v2.051h.054c.534-1.012 1.84-2.078 3.79-2.078C19.09 6.973 21 8.88 21 12.27V22H17v-8.4c0-2.003-.717-3.37-2.51-3.37-1.37 0-2.186.922-2.544 1.812-.13.314-.162.75-.162 1.19V22H8V7Z"/>
                </svg>
              </a>
              <a href="https://x.com/oronila_" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-200 transition" aria-label="X (Twitter)">
                {/* X icon */}
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                  <path d="M18.244 2H21l-6.494 7.41L22 22h-6.828l-4.78-6.146L4.8 22H2l6.955-7.93L2 2h6.914l4.36 5.74L18.244 2Zm-2.39 18h2.371L8.22 3.947H5.724L15.854 20Z"/>
                </svg>
              </a>
            </nav>
          </div>
        </header>

        {/* Bio / Lines */}
        <section className="mt-8 space-y-4 leading-relaxed">
          <p>
            building because I am chronically bored.
          </p>
          <p>
            projects and commits on{' '}
            <a href="https://github.com/oronila" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 decoration-neutral-600 hover:decoration-neutral-300">github</a>.
          </p>
          <p>
            always happy to chat — reach me by{' '}
            <a href="mailto:noorali05@utexas.edu" className="underline underline-offset-4 decoration-neutral-600 hover:decoration-neutral-300">email</a>.
          </p>
        </section>

        {/* Footer */}
        <footer className="mt-16 text-center text-xs text-neutral-500">
          © {new Date().getFullYear()} Noor Ali
        </footer>
      </div>
      {isTerminalMode && (
        <div className="fixed inset-0 z-50">
          <Terminal />
        </div>
      )}
    </main>
  );
}
