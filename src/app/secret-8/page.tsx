"use client";
import React, { useEffect, useState } from "react";

export default function Secret8() {
    const [stars, setStars] = useState([] as { id: number; top: number; left: number; size: number; duration: number }[]);

    useEffect(() => {
        const newStars = Array.from({ length: 150 }).map((_, i) => ({
            id: i,
            top: Math.random() * 100,
            left: Math.random() * 100,
            size: Math.random() * 3 + 1,
            duration: Math.random() * 3 + 1,
        }));
        setStars(newStars);
    }, []);

    return (
        <div className="min-h-screen bg-[#050510] relative font-sans selection:bg-[#9370DB] selection:text-white pb-20">
            {/* Stars Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                {stars.map((s) => (
                    <div
                        key={s.id}
                        className="absolute rounded-full bg-white animate-pulse"
                        style={{
                            top: `${s.top}%`,
                            left: `${s.left}%`,
                            width: s.size,
                            height: s.size,
                            animationDuration: `${s.duration}s`,
                            boxShadow: `0 0 ${s.size * 2}px #fff`,
                        }}
                    />
                ))}

                {/* Galaxy Glows */}
                <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-purple-900/30 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute bottom-1/4 right-1/4 w-[50vw] h-[50vw] bg-blue-900/20 rounded-full blur-[120px] pointer-events-none" />
            </div>

            <div className="container mx-auto px-4 py-16 relative z-10 min-h-screen flex flex-col items-center">
                <div className="text-center w-full max-w-4xl">
                    <p className="text-[#9370DB] tracking-[0.5em] uppercase text-sm mb-4 font-bold">Deep Space Operator Log</p>

                    <h1 className="text-5xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-[#E6E6FA] to-[#4B0082] drop-shadow-[0_0_20px_rgba(147,112,219,0.5)] mb-8">
                        NOOR ALI
                    </h1>

                    <div className="bg-[#1a1a2e]/60 backdrop-blur-md border border-[#9370DB]/30 rounded-2xl p-8 mb-16 shadow-[0_0_30px_rgba(75,0,130,0.3)]">
                        <p className="text-[#E6E6FA] text-lg leading-relaxed font-light text-left">
                            Current Mission: Building <span className="text-[#00FFFF] font-mono">modelanything.io</span>.<br /><br />
                            I am navigating the vast expanse of AI capabilities, heavily relying on LLMs since Dec 2025.
                            The rapid advancement is alarming, yet irresistibly fascinating.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                        {[
                            { id: "Sytem.Fynopsis", desc: "Initial launch phase. AI-native dataroom. Learned the fundamentals of orbital mechanics in early AI startups." },
                            { id: "Constellation.Genesis", desc: "UT Austin's startup fund. Instrumental to my trajectory. Updated their navigational database (website)." },
                            { id: "Nebula.Protocol", desc: "The memory layer for AI. Co-captained with Will Zhang." },
                            { id: "ModelAnything.Nebula", desc: "Current coordinates. Visualizing complex ML concepts. Pure exploration." }
                        ].map((proj, i) => (
                            <div key={i} className="group relative">
                                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg blur opacity-20 group-hover:opacity-70 transition duration-500" />
                                <div className="relative bg-[#050510] border border-white/10 rounded-lg p-6 h-full">
                                    <h3 className="text-[#E6E6FA] font-bold font-mono mb-2 tracking-wider text-sm">{proj.id}</h3>
                                    <p className="text-white/60 text-sm leading-relaxed">{proj.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
}
