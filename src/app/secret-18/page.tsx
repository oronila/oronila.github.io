import React from "react";

export default function Secret18() {
    return (
        <div className="min-h-screen bg-[#222222] text-white font-mono selection:bg-[#ff0000] selection:text-white p-4 pb-20">
            <div className="max-w-4xl mx-auto h-full min-h-[90vh] flex flex-col items-center justify-center">

                {/* Pixel Art Header */}
                <div className="text-center mb-12 animate-pulse">
                    <h1 className="text-4xl md:text-6xl font-black uppercase tracking-widest text-[#ffff00] drop-shadow-[4px_4px_0_#ff0000] mb-4">
                        Player 1:<br />NOOR ALI
                    </h1>
                    <p className="text-[#00ffff] font-bold text-xl drop-shadow-[2px_2px_0_#0000ff]">Level: Builder</p>
                </div>

                {/* Console Box */}
                <div className="bg-black border-[8px] border-[#aaaaaa] p-6 md:p-10 w-full relative shadow-[8px_8px_0_#000000]">
                    {/* Decorative UI elements */}
                    <div className="absolute top-[-8px] left-8 w-16 h-[8px] bg-[#aaaaaa]" />
                    <div className="absolute bottom-[-8px] right-8 w-16 h-[8px] bg-[#aaaaaa]" />

                    <h2 className="text-2xl text-[#00ff00] uppercase mb-6 font-bold flex items-center gap-2">
                        <span className="inline-block w-4 h-4 bg-[#00ff00]"></span>
                        Inventory / Status
                    </h2>

                    <div className="text-sm md:text-base leading-relaxed mb-10 text-[#ffffff]">
                        <p className="mb-4">
                            <span className="text-[#ff00ff]">{">"} Current Quest:</span> Building <strong>modelanything.io</strong>.
                        </p>
                        <p className="mb-4">
                            <span className="text-[#ff00ff]">{">"} Lore:</span> Experimentation with coding LLMs began in Dec 2025.
                            The power scaling is absurd, causing minor existential dread among SWEs, but the gameplay loop of building is too fun to quit.
                        </p>
                        <p>
                            <span className="text-[#ff00ff]">{">"} Comm Link:</span> noormehdiali@gmail.com
                        </p>
                    </div>

                    <h2 className="text-2xl text-[#ffaa00] uppercase mb-6 font-bold flex items-center gap-2">
                        <span className="inline-block w-4 h-4 bg-[#ffaa00]"></span>
                        Completed Stages
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            { title: "Fynopsis", type: "Startup", desc: "AI dataroom. Tutorial level complete." },
                            { title: "Genesis", type: "Organization", desc: "UT Austin structural upgrade." },
                            { title: "Nebula", type: "Framework", desc: "AI memory layer crafted with ally [W. Zhang]." },
                            { title: "ModelAnything", type: "WIP", desc: "ML visualizer. Boss fight approaching." }
                        ].map((proj, idx) => (
                            <div key={idx} className="border-[4px] border-[#555555] bg-[#333333] p-4 relative group cursor-pointer hover:border-[#ffffff] hover:bg-[#444444] transition-colors">
                                <div className="absolute top-[-10px] right-[-10px] w-6 h-6 bg-[#ff0000] border-[2px] border-white hidden group-hover:block animate-bounce" />

                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-bold text-[#ffff00] uppercase">{proj.title}</h3>
                                    <span className="text-[10px] bg-black text-white px-2 py-1 uppercase">{proj.type}</span>
                                </div>
                                <p className="text-xs text-[#dddddd]">{proj.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 text-center text-[#aaaaaa] text-sm animate-pulse">
                        PRESS START TO CONTINUE
                    </div>
                </div>

            </div>
        </div>
    );
}
