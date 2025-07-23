import Image from 'next/image';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white px-4">
      <div className="flex flex-col items-center gap-6 max-w-lg w-full">
        <Image
          src="https://github.com/oronila.png"
          alt="Oronila's GitHub Avatar"
          width={120}
          height={120}
          className="rounded-full border-4 border-white shadow-lg"
          priority
        />
        <h1 className="text-4xl font-bold tracking-tight">Oronila</h1>
        <p className="text-lg text-gray-300 text-center">
          Hi! I’m Oronila, a passionate developer building cool things on the web. Welcome to my personal site! Check out my projects and connect with me below.
        </p>
        <div className="flex gap-4 mt-2">
          <a
            href="https://github.com/oronila"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-gray-900 px-4 py-2 rounded-lg font-semibold shadow hover:bg-gray-200 transition"
          >
            GitHub
          </a>
          <a
            href="mailto:oronila@users.noreply.github.com"
            className="bg-transparent border border-white px-4 py-2 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition"
          >
            Contact
          </a>
        </div>
        <div className="mt-8 w-full">
          <h2 className="text-2xl font-semibold mb-4">Featured Projects</h2>
          <ul className="space-y-3">
            <li className="bg-gray-800 rounded-lg p-4 shadow hover:bg-gray-700 transition">
              <a href="https://github.com/oronila/project1" target="_blank" rel="noopener noreferrer" className="font-bold text-lg">Project 1</a>
              <p className="text-gray-400 text-sm">A short description of Project 1.</p>
            </li>
            <li className="bg-gray-800 rounded-lg p-4 shadow hover:bg-gray-700 transition">
              <a href="https://github.com/oronila/project2" target="_blank" rel="noopener noreferrer" className="font-bold text-lg">Project 2</a>
              <p className="text-gray-400 text-sm">A short description of Project 2.</p>
            </li>
            {/* Add more projects as needed */}
          </ul>
        </div>
      </div>
    </main>
  );
}
