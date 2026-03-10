import React from "react";

export default function Secret12() {
    return (
        <div className="min-h-screen bg-[#f4f1ea] text-[#1a1a1a] font-sans selection:bg-[#df2c2c] selection:text-white p-4 md:p-8">
            <div className="max-w-6xl mx-auto h-full min-h-[90vh] grid grid-cols-1 md:grid-cols-12 grid-rows-[auto_1fr_auto] md:grid-rows-[200px_400px_auto] gap-4 md:gap-2">

                {/* Header Block */}
                <div className="md:col-span-8 bg-[#df2c2c] text-[#f4f1ea] p-8 md:p-12 flex flex-col justify-end min-h-[200px]">
                    <h1 className="text-6xl md:text-[8rem] font-bold leading-[0.8] tracking-tighter uppercase ml-[-5px]">
                        Noor Ali
                    </h1>
                </div>

                {/* Accent Block 1 */}
                <div className="md:col-span-4 bg-[#2b4c7e] min-h-[100px] md:min-h-full rounded-tr-[100px]" />

                {/* Content Block */}
                <div className="md:col-span-4 bg-[#f4c82f] p-8 min-h-[300px] flex flex-col justify-between">
                    <div>
                        <h2 className="text-3xl font-bold uppercase tracking-widest mb-4 border-b-4 border-[#1a1a1a] pb-2 inline-block">
                            Focus
                        </h2>
                        <p className="text-lg font-medium leading-tight">
                            Currently building modelanything.io.
                        </p>
                        <br />
                        <p className="text-lg font-medium leading-tight">
                            Experimenting with ML & LLMs since Dec 2025. Fascinated by rapid capabilities, worried about the future, still building because it is fun.
                        </p>
                    </div>
                    <div className="w-16 h-16 bg-[#1a1a1a] rounded-full mt-8" />
                </div>

                {/* Projects Grid */}
                <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-2">
                    {[
                        { id: "Fynopsis", desc: "First startup. AI dataroom. Formative." },
                        { id: "Genesis", desc: "UT Austin Startup Fund. Vital org." },
                        { id: "Nebula", desc: "AI memory layer. Co-founded." },
                        { id: "ModelAnything", desc: "ML visualization piece. Active." }
                    ].map((proj, idx) => (
                        <div key={idx} className="bg-[#1a1a1a] text-[#f4f1ea] p-8 flex flex-col justify-end min-h-[200px] group cursor-pointer hover:bg-[#df2c2c] transition-colors">
                            <h3 className="text-3xl font-bold uppercase tracking-tight group-hover:translate-x-4 transition-transform">{proj.id}</h3>
                            <p className="mt-4 text-sm opacity-80 uppercase font-bold tracking-widest">{proj.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <div className="md:col-span-12 border-t-8 border-[#1a1a1a] pt-4 flex justify-between items-center font-bold text-xl uppercase tracking-widest mt-8">
                    <span>noormehdiali@gmail.com</span>
                    <span className="text-[#df2c2c]">Bauhaus.Style</span>
                </div>

            </div>
        </div>
    );
}
