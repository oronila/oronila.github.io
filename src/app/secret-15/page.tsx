import React from "react";

export default function Secret15() {
    return (
        <div className="min-h-screen bg-[#f5f5f0] text-black font-serif selection:bg-black selection:text-white pb-20">
            <div className="max-w-5xl mx-auto px-4 sm:px-8 py-12">

                {/* Newspaper Header */}
                <header className="border-b-4 border-double border-black pb-6 mb-8 text-center">
                    <div className="flex justify-between items-end border-b-2 border-black pb-2 mb-4 text-xs font-sans tracking-widest uppercase">
                        <span>Vol. 1 — No. 1</span>
                        <span>AUSTIN, TEXAS</span>
                        <span>Est. 2025</span>
                    </div>
                    <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-none font-['Times_New_Roman',serif] mb-6">
                        THE DAILY BUILDER
                    </h1>
                    <div className="border-t border-b border-black py-2 flex justify-between text-sm md:text-base italic font-serif">
                        <span>&quot;Experimenting with LLMs.&quot;</span>
                        <span className="font-bold">By Noor Ali</span>
                        <span>noormehdiali@gmail.com</span>
                    </div>
                </header>

                <main className="grid grid-cols-1 md:grid-cols-12 gap-8">

                    {/* Main Article */}
                    <article className="md:col-span-8 flex flex-col">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight font-['Times_New_Roman',serif]">
                            LOCAL DEVELOPER BUILDS MODELANYTHING.IO AMIDST AI BOOM
                        </h2>
                        <p className="text-xl mb-6 italic text-gray-700">
                            Shocked by software capabilities, author pushes forward with new ML visualization tool.
                        </p>

                        <div className="columns-1 sm:columns-2 gap-8 text-justify leading-relaxed text-lg">
                            <p className="mb-4">
                                <span className="float-left text-6xl font-black leading-none pr-2 pt-1">A</span>
                                s the landscape of software engineering rapidly changes, one builder has decided to lean fully into the chaos. Beginning in December of 2025, Noor Ali started actively experimenting with coding Large Language Models (LLMs). The results, he says, are simultaneously terrifying and incredibly fun.
                            </p>
                            <p className="mb-4">
                                Currently, focus is directed toward a new project known as <strong>modelanything.io</strong>. While exact plans are still solidifying, the core mission is clear: to create an intuitive platform for visualizing complex machine learning concepts.
                            </p>
                            <p className="mb-4">
                                Despite concerns over the long-term future of traditional software engineering, the sheer joy of creating remains a powerful motivator for this builder.
                            </p>
                        </div>

                        <div className="mt-8 border-t border-black pt-8">
                            <h3 className="text-2xl font-bold mb-4 uppercase tracking-widest border-b border-black inline-block">Previous Ventures</h3>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                                <div>
                                    <h4 className="font-bold text-xl mb-1">Fynopsis</h4>
                                    <p className="text-gray-800 text-sm leading-snug">The first startup. Designed as an AI-native dataroom. Provided invaluable experience during the early &apos;wild west&apos; days of applied AI.</p>
                                </div>
                                <div>
                                    <h4 className="font-bold text-xl mb-1">Genesis</h4>
                                    <p className="text-gray-800 text-sm leading-snug">UT Austin&apos;s premier startup fund and easily a favorite organization. Responsible for updating the website to its current, modern state.</p>
                                </div>
                                <div>
                                    <h4 className="font-bold text-xl mb-1">Nebula</h4>
                                    <p className="text-gray-800 text-sm leading-snug">Conceived as the memory layer for AI. Co-founded alongside Will Zhang after identifying critical problems while building Fynopsis.</p>
                                </div>
                            </div>
                        </div>
                    </article>

                    {/* Sidebar */}
                    <aside className="md:col-span-4 border-t md:border-t-0 md:border-l border-black pt-8 md:pt-0 md:pl-8">
                        <div className="border-4 border-double border-black p-6 bg-gray-100 text-center mb-8">
                            <h3 className="text-2xl font-bold uppercase tracking-widest mb-4">Classifieds</h3>
                            <p className="text-sm mb-4">Seeking opportunities for learning, growth, and building cool things.</p>
                            <p className="font-bold border-t border-gray-400 pt-2">Contact:<br />noormehdiali@gmail.com</p>
                        </div>

                        <div className="text-center">
                            <h3 className="italic text-xl mb-2 font-bold font-['Times_New_Roman',serif]">The Weather</h3>
                            <div className="border border-black p-4">
                                <p className="font-bold uppercase tracking-widest">Austin, TX</p>
                                <p className="text-4xl font-black my-2">☀</p>
                                <p className="text-sm">Sunny. High of 85°.</p>
                            </div>
                        </div>
                    </aside>

                </main>
            </div>
        </div>
    );
}
