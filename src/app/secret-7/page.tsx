"use client";
import React, { useEffect, useState } from "react";

export default function Secret7() {
    const [bubbles, setBubbles] = useState([] as { id: number; left: number; delay: number; size: number }[]);

    useEffect(() => {
        const newBubbles = Array.from({ length: 20 }).map((_, i) => ({
            id: i,
            left: Math.random() * 100,
            delay: Math.random() * 5,
            size: Math.random() * 40 + 10,
        }));
        setBubbles(newBubbles);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#87CEEB] via-[#E0F6FF] to-[#98FB98] text-[#006400] font-sans pb-20 relative selection:bg-[#32CD32] selection:text-white">

            {/* Animated Bubbles */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                {bubbles.map((b) => (
                    <div
                        key={b.id}
                        className="absolute bottom-[-100px] rounded-full border border-white/40 bg-white/20 shadow-[inset_0_0_10px_rgba(255,255,255,0.8)] backdrop-blur-sm animate-[float_10s_linear_infinite]"
                        style={{
                            left: `${b.left}%`,
                            width: b.size,
                            height: b.size,
                            animationDelay: `${b.delay}s`,
                        }}
                    />
                ))}
                <style jsx>{`
                    @keyframes float {
                        0 % { transform: translateY(0) scale(1); opacity: 0; }
            10% {opacity: 1; }
                    90% {opacity: 1; }
                    100% {transform: translateY(-120vh) scale(1.5); opacity: 0; }
          }
        `}</style>
            </div>

            <div className="container mx-auto px-4 py-12 relative z-10 min-h-screen flex flex-col items-center justify-start max-w-5xl">

                <div className="bg-white/40 backdrop-blur-md rounded-[40px] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.1),inset_0_0_20px_rgba(255,255,255,0.8)] border border-white w-full text-center mb-12">

                    <div className="w-32 h-32 mx-auto bg-gradient-to-br from-[#00BFFF] to-[#32CD32] rounded-full shadow-[inset_-5px_-5px_15px_rgba(0,0,0,0.2),inset_5px_5px_15px_rgba(255,255,255,0.8),0_10px_20px_rgba(0,191,255,0.4)] mb-8 flex items-center justify-center overflow-hidden border-4 border-white">
                        <div className="text-white font-black text-5xl tracking-tighter drop-shadow-md">NA</div>
                    </div>

                    <h1 className="text-5xl md:text-6xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-b from-[#006400] to-[#00CED1] drop-shadow-sm">
                        NOOR ALI
                    </h1>

                    <p className="text-lg md:text-xl text-[#2F4F4F] font-medium max-w-2xl mx-auto leading-relaxed">
                        Currently building <strong>modelanything.io</strong>. <br />
                        Optimistic about the future, experimenting with LLMs, and building cool things.
                    </p>
                </div>

                {/* Project Orbs */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
                    {[
                        { title: "Fynopsis", desc: "First startup. AI-native dataroom. Learned a lot." },
                        { title: "Genesis", desc: "UT Austin Startup Fund. My favorite organization." },
                        { title: "Nebula", desc: "Memory layer for AI. Co-founded." },
                        { title: "ModelAnything", desc: "Visualizing complex concepts in ML." }
                    ].map((proj, i) => (
                        <div key={i} className="bg-white/50 backdrop-blur-sm rounded-3xl p-6 text-center border-t border-l border-white/80 shadow-[0_10px_20px_rgba(0,0,0,0.05),inset_0_-5px_15px_rgba(255,255,255,0.7)] hover:transform hover:-translate-y-2 hover:shadow-[0_15px_30px_rgba(0,191,255,0.2),inset_0_-5px_15px_rgba(255,255,255,0.9)] transition-all cursor-pointer">
                            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-[#87CEEB] to-[#20B2AA] mb-4 shadow-[inset_-3px_-3px_10px_rgba(0,0,0,0.1),inset_3px_3px_10px_rgba(255,255,255,0.9)]" />
                            <h3 className="font-bold text-[#006400] text-xl mb-2">{proj.title}</h3>
                            <p className="text-[#2F4F4F] text-sm font-medium">{proj.desc}</p>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}
