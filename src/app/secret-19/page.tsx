import React from "react";

export default function Secret19() {
    return (
        <div className="min-h-screen bg-[#eec8e0] text-[#4a3b52] font-serif overflow-hidden relative selection:bg-white selection:text-[#4a3b52]">

            {/* Dreamy Orbs & Gradients */}
            <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] rounded-t-full bg-gradient-to-br from-[#d4a5d6] to-transparent blur-[80px] opacity-60 pointer-events-none mix-blend-multiply" />
            <div className="absolute bottom-[-10%] right-[-20%] w-[60vw] h-[60vw] rounded-l-full bg-gradient-to-tl from-[#9cb4d8] to-transparent blur-[100px] opacity-70 pointer-events-none mix-blend-color-burn" />

            {/* Surreal Element: The Floating Staircase */}
            <div className="absolute top-[20%] right-[15%] flex flex-col items-end gap-2 opacity-40 rotate-12 blur-[1px]">
                <div className="w-32 h-4 bg-white shadow-xl" />
                <div className="w-24 h-4 bg-white shadow-xl mr-8" />
                <div className="w-16 h-4 bg-white shadow-xl mr-16" />
                <div className="w-8 h-4 bg-white shadow-xl mr-24" />
            </div>

            <div className="container mx-auto px-4 py-24 relative z-10 flex flex-col md:flex-row items-center justify-center min-h-screen gap-16">

                {/* Abstract Text Area */}
                <div className="w-full md:w-1/2 flex flex-col items-start pt-12">
                    <h1 className="text-7xl md:text-[9rem] font-black italic tracking-tighter leading-[0.8] mb-8 text-[#5c4a66] drop-shadow-[5px_5px_0_rgba(255,255,255,0.5)]">
                        NOOR
                        <br />
                        <span className="ml-16 font-light font-sans text-6xl md:text-[7rem]">ALI</span>
                    </h1>

                    <div className="pl-4 md:pl-16 border-l flex flex-col gap-6 font-medium text-lg md:text-xl text-[#6b5876] max-w-lg">
                        <p className="leading-relaxed">
                            Currently tethered to reality via <strong className="text-[#4a3b52]">modelanything.io</strong>.
                        </p>
                        <p className="leading-relaxed opacity-80 italic">
                            The lines began blurring in December 2025. Coding LLMs awoke.
                            The future of engineering feels like a strange dream, yet we build—because the dreaming is fun.
                        </p>
                    </div>
                </div>

                {/* Scattered Projects */}
                <div className="w-full md:w-1/2 relative h-[500px]">

                    <div className="absolute top-[10%] left-[10%] w-64 bg-white/40 backdrop-blur-md p-6 rounded-t-full rounded-br-full shadow-2xl hover:scale-105 transition-transform duration-700 cursor-pointer">
                        <h3 className="font-bold text-2xl mb-2 text-[#4a3b52]">Fynopsis</h3>
                        <p className="text-sm opacity-80">The first waking memory. An AI dataroom.</p>
                    </div>

                    <div className="absolute top-[40%] right-[5%] w-56 bg-gradient-to-br from-[#9cb4d8]/40 to-transparent backdrop-blur-sm p-6 rounded-lg shadow-xl hover:-rotate-6 transition-transform duration-500 cursor-pointer">
                        <h3 className="font-bold text-xl mb-1 text-[#4a3b52]">Genesis</h3>
                        <p className="text-sm opacity-80">UT Austin structural entity. The website evolved.</p>
                    </div>

                    <div className="absolute bottom-[20%] left-[20%] w-72 bg-gradient-to-t from-white/60 to-transparent p-6 rounded-full shadow-lg hover:rotate-6 transition-transform duration-1000 cursor-pointer text-center">
                        <h3 className="font-bold text-2xl mb-2 text-[#4a3b52]">Nebula</h3>
                        <p className="text-sm opacity-80 text-[#5c4a66]">Memory layer. Formed with W. Zhang.</p>
                    </div>

                    <div className="absolute bottom-[0%] right-[20%] w-48 bg-[#d4a5d6]/30 backdrop-blur-xl p-4 rounded-bl-3xl shadow-2xl hover:translate-y-4 transition-transform duration-500 cursor-pointer text-right">
                        <h3 className="font-bold text-lg mb-1 text-[#4a3b52]">ModelAnything</h3>
                        <p className="text-xs opacity-80">Visualizing the intangible ML shapes.</p>
                    </div>

                </div>

            </div>
        </div>
    );
}
