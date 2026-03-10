import React from "react";

export default function Secret5() {
    return (
        <div className="min-h-screen bg-[#e0e5ec] text-[#4a5568] font-sans flex items-center justify-center p-4">
            <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-start py-12">

                {/* Left Side: Soft UI Element */}
                <div className="flex flex-col gap-8 p-12 rounded-[3rem] bg-[#e0e5ec] shadow-[20px_20px_60px_#bebebe,-20px_-20px_60px_#ffffff] sticky top-12">
                    <div className="w-24 h-24 rounded-full bg-[#e0e5ec] shadow-[inset_10px_10px_20px_#bebebe,inset_-10px_-10px_20px_#ffffff] flex items-center justify-center text-3xl font-bold text-[#a0aec0]">
                        NA
                    </div>

                    <div>
                        <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight text-[#2d3748]">Noor Ali</h1>
                        <p className="text-lg opacity-80 leading-relaxed mb-4">
                            Currently building <strong>modelanything.io</strong>.
                        </p>
                        <p className="text-base opacity-70 leading-relaxed">
                            Experimenting with coding LLMs since December 2025. Shocked by their capabilities and slightly worried about the future of software engineering—but still building because it&apos;s fun.
                        </p>
                    </div>

                    <div className="flex gap-4">
                        <a href="mailto:noormehdiali@gmail.com" className="px-8 py-4 rounded-2xl font-bold bg-[#e0e5ec] shadow-[10px_10px_20px_#bebebe,-10px_-10px_20px_#ffffff] hover:shadow-[inset_5px_5px_10px_#bebebe,inset_-5px_-5px_10px_#ffffff] hover:text-[#2d3748] transition-all text-[#4a5568]">
                            Contact Me
                        </a>
                    </div>
                </div>

                {/* Right Side: Projects */}
                <div className="flex flex-col gap-8">
                    {[
                        { id: "Fynopsis", desc: "My first startup. It was an AI-native dataroom. A great learning experience in the early days of AI applications." },
                        { id: "Genesis", desc: "UT Austin's startup fund and easily my favorite organization at UT. I personally updated the website to its current state." },
                        { id: "Nebula", desc: "The memory layer for AI. I started working on it after noticing problems while building Fynopsis. Built with Will Zhang." },
                        { id: "ModelAnything", desc: "I'm not exactly sure what I want to do with ModelAnything yet. Hoping to visualize complex concepts." }
                    ].map((proj, idx) => (
                        <div key={idx} className="p-8 rounded-[2rem] bg-[#e0e5ec] shadow-[10px_10px_20px_#bebebe,-10px_-10px_20px_#ffffff] hover:shadow-[inset_10px_10px_20px_#bebebe,inset_-10px_-10px_20px_#ffffff] transition-all duration-300">
                            <h3 className="text-2xl font-bold text-[#2d3748] mb-3">{proj.id}</h3>
                            <p className="text-[#718096] leading-relaxed">{proj.desc}</p>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}
