"use client";
import React, { useState, useEffect } from "react";

const text = `
> INITIALIZING SYSTEM...
> ROOT ACCESS GRANTED.
> WELCOME TO NOOR ALI'S TERMINAL SERVER.
> 
> cat about_me.txt
  I am Noor Ali. I am currently building modelanything.io.
  I started experimenting with LLMs in December 2025.
  Contact: noormehdiali@gmail.com
>
> ls -la ./projects
  -rwxr-xr-x 1 root root  fynopsis.exe
    "First startup. AI-native dataroom."
  -rwxr-xr-x 1 root root  genesis.exe
    "UT Austin's startup fund. Updated website."
  -rwxr-xr-x 1 root root  nebula.exe
    "Memory layer for AI. Built w/ Will Zhang."
  -rwxr-xr-x 1 root root  modelanything.sh
    "Visualizing complex ML concepts. No exact plans."
>
> ENTER COMMAND: _
`;

export default function Secret4() {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, index));
      index++;
      if (index > text.length) clearInterval(interval);
    }, 20);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black text-[#0f0] font-mono p-4 md:p-8 selection:bg-[#0f0] selection:text-black">
      <div className="max-w-3xl mx-auto mt-12 bg-black border border-[#0f0] p-6 shadow-[0_0_15px_rgba(0,255,0,0.2)]">

        <header className="border-b border-[#0f0] pb-2 mb-4 flex justify-between uppercase text-xs">
          <span>Terminal v4.0.0</span>
          <span>N_ALI // ONLINE</span>
        </header>

        <main className="whitespace-pre-wrap text-sm md:text-base leading-relaxed">
          {displayedText}
          <span className="animate-pulse">_</span>
        </main>

        <footer className="mt-12 text-xs opacity-50 uppercase flex justify-between">
          <span>Connection Secure</span>
          <span>192.168.0.x</span>
        </footer>

      </div>
    </div>
  );
}
