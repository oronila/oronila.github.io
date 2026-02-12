import Desktop from "../components/desktop/Desktop";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Desktop shell (mobile gets its own UI later) */}
      <Desktop />
    </main>
  );
}
