import React from "react";

export default function Secret14() {
    return (
        <div className="min-h-screen bg-[#ff4500] text-[#ffff00] font-serif overflow-hidden relative selection:bg-[#ffff00] selection:text-[#ff4500]">

            {/* Groovy Background Waves */}
            <div className="fixed inset-0 pointer-events-none z-0 mix-blend-screen opacity-50">
                <div className="absolute top-[-10%] left-[-10%] w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,_#ff00ff_0%,_transparent_50%)] animate-[spin_10s_linear_infinite]" />
                <div className="absolute top-[-20%] right-[-20%] w-[150%] h-[150%] bg-[radial-gradient(circle_at_center,_#00ffff_0%,_transparent_50%)] animate-[spin_15s_linear_infinite_reverse]" />
            </div>

            <div className="container mx-auto px-4 py-20 relative z-10 min-h-screen flex flex-col items-center justify-center text-center">

                <h1 className="text-7xl md:text-[8rem] font-black italic tracking-tighter leading-none mb-8 mix-blend-difference drop-shadow-[5px_5px_0_#000]">
                    NOOR
                    <br />
                    ALI
                </h1>

                <p className="text-2xl md:text-4xl font-bold mb-16 drop-shadow-[3px_3px_0_#ff00ff] max-w-3xl rotate-2">
                    Building <span className="underline decoration-4 decoration-[#00ffff]">modelanything.io</span> & experimenting with coding LLMs since December 2025.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-5xl">
                    {[
                        { tag: "01", id: "Fynopsis", desc: "First startup. AI-native dataroom. So much learned." },
                        { tag: "02", id: "Genesis", desc: "UT Austin's startup fund. Pure love." },
                        { tag: "03", id: "Nebula", desc: "Memory layer for AI. Co-founded w/ Will." },
                        { tag: "04", id: "ModelAnything", desc: "Visualizing ML concepts. Active project." }
                    ].map((proj, idx) => (
                        <div
                            key={idx}
                            className={`p-8 border-8 border-[#ffff00] bg-[#ff00ff]/30 backdrop-blur-sm rounded-[100px] shadow-[10px_10px_0_#000] hover:-translate-y-4 hover:shadow-[15px_15px_0_#000] transition-all duration-300 ${idx % 2 === 0 ? '-rotate-3' : 'rotate-3'}`}
                        >
                            <div className="w-16 h-16 bg-[#ffff00] text-[#ff4500] rounded-full flex items-center justify-center text-2xl font-black mb-4 mx-auto border-4 border-black">
                                {proj.tag}
                            </div>
                            <h3 className="text-4xl font-bold mb-4 drop-shadow-[2px_2px_0_#000]">{proj.id}</h3>
                            <p className="text-xl font-medium bg-black/50 text-white p-4 rounded-3xl">{proj.desc}</p>
                        </div>
                    ))}
                </div>

            </div>
        </div >
    );
}
