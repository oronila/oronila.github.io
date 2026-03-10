"use client";
import React, { useState, useEffect } from "react";

export default function Secret1() {
    const [glitch, setGlitch] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setGlitch((prev) => !prev);
        }, Math.random() * 2000 + 500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-black text-[#0ff] font-mono overflow-auto relative selection:bg-[#f0f] selection:text-black pb-20">
            <div className="fixed inset-0 bg-[linear-gradient(rgba(0,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

            <div className="container mx-auto px-4 py-16 relative z-10 max-w-4xl">
                <h1
                    className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-12 relative"
                    style={{ textShadow: glitch ? "4px 4px 0 #f0f, -4px -4px 0 #0ff" : "2px 2px 0 #f0f" }}
                >
                    {glitch ? "N00R_AL1" : "NOOR_ALI"}
                </h1>

                <div className="border border-[#0ff] p-6 md:p-8 bg-black/50 backdrop-blur-sm relative shadow-[0_0_15px_rgba(0,255,255,0.3)] mb-12">
                    <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-[#f0f]" />
                    <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-[#f0f]" />

                    <h2 className="text-2xl text-[#f0f] mb-4 uppercase tracking-widest border-b border-[#0ff]/30 pb-2">User_Bio.log</h2>

                    <p className="leading-relaxed opacity-90">
                        {">"} BUILDING <span className="text-white">MODELANYTHING.IO</span> <br />
                        {">"} EXPERIMENTING WITH LLMS SINCE DEC_2025 <br />
                        {">"} CONTACT // NOORMEHDIALI@GMAIL.COM
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {[
                        { id: "FYNOPSIS", desc: "First startup. AI-native dataroom. A great learning experience in the early days of AI applications." },
                        { id: "GENESIS", desc: "UT Austin's startup fund (favorite org at UT). I updated the website to its current state." },
                        { id: "NEBULA", desc: "The memory layer for AI. Built with my co-founder Will Zhang after noticing problems while building Fynopsis." },
                        { id: "MODELANYTHING", desc: "Currently building modelanything.io. Hoping to visualize complex ML concepts." }
                    ].map((proj, idx) => (
                        <div key={idx} className="border border-[#f0f]/50 p-6 bg-[#f0f]/5 hover:bg-[#f0f]/20 transition-colors group cursor-crosshair">
                            <h3 className="text-xl text-white font-bold mb-2 uppercase group-hover:text-[#f0f] transition-colors">{">"} {proj.id}</h3>
                            <p className="text-sm opacity-80">{proj.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
