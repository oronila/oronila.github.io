import React from "react";

export default function Secret10() {
    return (
        <div className="min-h-screen bg-[#0a0014] overflow-x-hidden relative selection:bg-[#ff00ff] selection:text-white flex flex-col items-center justify-start pb-32">

            {/* Sun */}
            <div className="fixed top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full bg-gradient-to-b from-[#ffed4a] via-[#ff00ff] to-[#4a00e0] shadow-[0_0_100px_rgba(255,0,255,0.8)] z-0 pointer-events-none" />

            {/* Sun slices (retro effect) */}
            <div className="fixed top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] md:w-[520px] md:h-[520px] z-0 flex flex-col justify-end gap-2 pb-10 pointer-events-none">
                <div className="h-2 w-full bg-[#0a0014]" />
                <div className="h-3 w-full bg-[#0a0014]" />
                <div className="h-4 w-full bg-[#0a0014]" />
                <div className="h-5 w-full bg-[#0a0014]" />
                <div className="h-6 w-full bg-[#0a0014]" />
            </div>

            {/* Grid Floor */}
            <div
                className="fixed bottom-0 w-[200vw] h-[50vh] left-[-50vw] z-0 opacity-80 pointer-events-none"
                style={{
                    background: "linear-gradient(transparent 65%, #ff00ff 100%), linear-gradient(90deg, #ff00ff 1px, transparent 1px), linear-gradient(#ff00ff 1px, transparent 1px)",
                    backgroundSize: "100% 100%, 40px 40px, 40px 40px",
                    transform: "perspective(500px) rotateX(70deg) translateY(100px)",
                }}
            />

            <div className="relative z-10 text-center flex flex-col items-center mt-20 w-full max-w-5xl px-4">
                <h2 className="text-[#00ffff] font-['Brush_Script_MT',cursive] italic text-4xl md:text-5xl drop-shadow-[0_0_10px_#00ffff] transform -rotate-6 mb-2">
                    Hacking The Mainframe
                </h2>
                <h1
                    className="text-7xl md:text-[8rem] font-black uppercase italic tracking-tighter text-transparent mb-12"
                    style={{
                        WebkitTextStroke: "2px #ff00ff",
                        backgroundImage: "linear-gradient(to bottom, #ff00ff 0%, #4a00e0 100%)",
                        WebkitBackgroundClip: "text",
                        filter: "drop-shadow(0px 0px 15px rgba(255,0,255,0.8))",
                    }}
                >
                    NOOR ALI
                </h1>

                <div className="bg-[#0a0014]/60 backdrop-blur-md border-2 border-[#ff00ff] p-6 mb-16 shadow-[0_0_20px_#ff00ff] max-w-2xl">
                    <p className="text-[#00ffff] font-mono text-sm md:text-base leading-relaxed">
                        {">"} STATUS: CURRENTLY BUILDING MODELANYTHING.IO <br />
                        {">"} START_DATE: DEC_2025 (LLM EXPERIMENTATION PHASE) <br />
                        {">"} MISSION: VISUALIZE ML CONCEPTS / HAVE FUN
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                    {[
                        { id: "FYNOPSIS_DRIVE", desc: "First startup. AI-native dataroom. Learned a lot in the wild west of early AI." },
                        { id: "GENESIS_NODE", desc: "UT Austin's startup fund. Favorite org. Updated the website to its current state." },
                        { id: "NEBULA_MEMORY", desc: "The memory layer for AI. Built after Fynopsis with Will Zhang." },
                        { id: "MODEL_ANYTHING", desc: "Currently building modelanything.io. ML visualization." }
                    ].map((proj, idx) => (
                        <div key={idx} className="bg-gradient-to-br from-[#0a0014] to-[#1a0033] border-l-4 border-[#00ffff] p-6 hover:shadow-[0_0_30px_#00ffff] transition-shadow duration-300 text-left cursor-crosshair">
                            <h3 className="text-[#ff00ff] font-['Brush_Script_MT',cursive] text-2xl mb-2 drop-shadow-[0_0_5px_#ff00ff]">{proj.id}</h3>
                            <p className="text-white/80 font-mono text-sm">{proj.desc}</p>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}
