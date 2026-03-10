import React from "react";

export default function Secret17() {
    return (
        <div className="min-h-screen bg-[#1c4d9b] text-white font-mono selection:bg-white selection:text-[#1c4d9b] p-4 md:p-8">

            {/* Blueprint Grid */}
            <div
                className="fixed inset-0 pointer-events-none z-0 opacity-30"
                style={{
                    backgroundImage: "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
                    backgroundSize: "100px 100px, 100px 100px, 20px 20px, 20px 20px",
                    backgroundPosition: "-1px -1px, -1px -1px, -1px -1px, -1px -1px"
                }}
            />

            <div className="max-w-6xl mx-auto relative z-10 border-2 border-white p-2">
                <div className="border border-white p-6 md:p-12 flex flex-col min-h-[90vh]">

                    {/* Header Block / Title Block */}
                    <header className="border-2 border-white mb-12 flex flex-col md:flex-row">
                        <div className="p-6 md:w-2/3 border-b md:border-b-0 md:border-r border-white flex flex-col justify-center">
                            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase leading-none mb-2">
                                Noor Ali
                            </h1>
                            <p className="text-xl tracking-widest uppercase opacity-80">General Contractor // Developer</p>
                        </div>
                        <div className="p-4 md:w-1/3 grid grid-cols-2 gap-4 text-xs tracking-widest uppercase self-center w-full">
                            <div>
                                <span className="opacity-60 block">Project:</span>
                                <span className="font-bold">modelanything.io</span>
                            </div>
                            <div>
                                <span className="opacity-60 block">Date:</span>
                                <span className="font-bold">Dec 2025 - Present</span>
                            </div>
                            <div>
                                <span className="opacity-60 block">Scale:</span>
                                <span className="font-bold">1:1</span>
                            </div>
                            <div>
                                <span className="opacity-60 block">Sheet:</span>
                                <span className="font-bold">01 / 01</span>
                            </div>
                        </div>
                    </header>

                    <main className="flex-grow grid grid-cols-1 lg:grid-cols-12 gap-12">

                        {/* Left Column: Specs */}
                        <div className="lg:col-span-5 flex flex-col gap-8">
                            <section className="border border-white p-6 relative">
                                <div className="absolute -top-3 left-4 bg-[#1c4d9b] px-2 text-sm font-bold tracking-widest uppercase">Specifications</div>
                                <p className="leading-relaxed text-sm md:text-base">
                                    I am experimenting with coding LLMs since December 2025. The structural integrity and capabilities of these systems are shocking. While the future of software engineering requires re-evaluation, the act of building remains fundamentally enjoyable.
                                </p>
                                <br />
                                <p className="leading-relaxed text-sm md:text-base">
                                    Contact point established at: <strong>noormehdiali@gmail.com</strong>
                                </p>
                            </section>

                            {/* Decorative diagram */}
                            <div className="border border-white p-6 flex-grow flex items-center justify-center relative">
                                <div className="absolute -top-3 left-4 bg-[#1c4d9b] px-2 text-sm font-bold tracking-widest uppercase">Elevation A</div>
                                <div className="w-full h-full min-h-[200px] border border-white border-dashed flex items-center justify-center">
                                    <div className="w-32 h-32 border-2 border-white rounded-full flex items-center justify-center relative">
                                        <div className="absolute w-full h-[1px] bg-white" />
                                        <div className="absolute h-full w-[1px] bg-white" />
                                        <span className="absolute -top-6 text-xs">R=16</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Projects */}
                        <div className="lg:col-span-7 border border-white p-6 relative">
                            <div className="absolute -top-3 right-4 bg-[#1c4d9b] px-2 text-sm font-bold tracking-widest uppercase">Project History</div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 h-full">
                                {[
                                    { id: "Fynopsis", desc: "Phase 1 startup assembly. AI-native dataroom construction. Extensive foundational learning." },
                                    { id: "Genesis", desc: "UT Austin startup fund structural support. Retrofitted existing website architecture." },
                                    { id: "Nebula", desc: "Memory layer framework for AI systems. Co-engineered with W. Zhang post-Fynopsis." },
                                    { id: "ModelAnything", desc: "Active development site. Objective: visualize machine learning algorithmic structures." }
                                ].map((proj, idx) => (
                                    <div key={idx} className="border border-white/50 p-4 hover:bg-white hover:text-[#1c4d9b] transition-colors cursor-crosshair flex flex-col justify-between group">
                                        <div>
                                            <h3 className="text-2xl font-bold uppercase mb-2 border-b border-inherit pb-2 inline-block">{proj.id}</h3>
                                            <p className="text-sm leading-snug mt-2">{proj.desc}</p>
                                        </div>
                                        <div className="mt-6 text-xs text-right opacity-50 group-hover:opacity-100 uppercase tracking-widest">
                                            SEC {idx + 1}.0
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </main>

                </div>
            </div>
        </div>
    );
}
