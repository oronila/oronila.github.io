import React from "react";

export default function Secret6() {
    return (
        <div className="min-h-screen bg-[#0f172a] text-white font-sans overflow-hidden relative selection:bg-white/30">

            {/* Colorful Gradient Orbs Background */}
            <div className="fixed top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-pink-500 rounded-full mix-blend-multiply border-none blur-[100px] opacity-70 animate-pulse z-0" />
            <div className="fixed top-[20%] right-[-10%] w-[40vw] h-[40vw] bg-yellow-400 rounded-full mix-blend-multiply border-none blur-[100px] opacity-70 animate-pulse z-0" style={{ animationDelay: "2s" }} />
            <div className="fixed bottom-[-20%] left-[20%] w-[60vw] h-[60vw] bg-blue-500 rounded-full mix-blend-multiply border-none blur-[120px] opacity-60 animate-pulse z-0" style={{ animationDelay: "4s" }} />

            <div className="container mx-auto px-4 py-20 relative z-10 min-h-screen flex flex-col items-center justify-center">

                {/* Glassmorphic Card */}
                <div className="w-full max-w-4xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 md:p-12 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]">
                    <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
                        <span className="text-white/50 tracking-widest uppercase text-sm font-bold">Noor Ali</span>
                        <div className="flex gap-2">
                            <a href="mailto:noormehdiali@gmail.com" className="text-white hover:text-white/70 transition-colors text-sm font-medium tracking-wide">
                                noormehdiali@gmail.com
                            </a>
                        </div>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60 leading-tight">
                        Building.<br />Experimenting.<br />Failing.<br />Learning.
                    </h1>

                    <p className="text-lg text-white/80 leading-relaxed mb-10 max-w-2xl font-light">
                        I am currently working on <strong className="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">modelanything.io</strong>.
                        I&apos;ve been experimenting with coding LLMs since December 2025. They are shockingly capable—worried about the future of SWE, but having fun building.
                    </p>

                    <h2 className="text-2xl font-bold mb-6 text-white/90">Projects</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            { title: "Fynopsis", desc: "First startup. AI-native dataroom, a great learning experience." },
                            { title: "Genesis", desc: "UT Austin's startup fund. Updated their website." },
                            { title: "Nebula", desc: "Memory layer for AI. Co-founded with Will Zhang." },
                            { title: "Personal Website", desc: "An experiment in coding with LLMs. Built fast." }
                        ].map((proj, i) => (
                            <div key={i} className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-colors group cursor-pointer">
                                <h3 className="font-bold text-xl mb-2 text-white group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all">{proj.title}</h3>
                                <p className="text-white/60 text-sm leading-relaxed">{proj.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
