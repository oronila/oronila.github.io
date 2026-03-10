import React from "react";

export default function Secret3() {
    return (
        <div className="min-h-screen bg-[#ffb6c1] text-[#00ffff] font-serif overflow-x-hidden selection:bg-[#ff1493] selection:text-white relative pb-32">
            {/* Grid Floor */}
            <div className="fixed bottom-0 w-full h-[40vh] bg-[linear-gradient(rgba(255,20,147,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,20,147,0.5)_1px,transparent_1px)] bg-[size:50px_50px] [transform:perspective(500px)_rotateX(60deg)_translateY(-100px)_translateZ(200px)] pointer-events-none origin-bottom opacity-50 z-0" />

            {/* Vaporwave Sun */}
            <div className="fixed top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-b from-[#ffed4a] to-[#ff1493] rounded-full blur-sm z-0 shadow-[0_0_100px_rgba(255,20,147,0.8)]" />

            <div className="container mx-auto p-4 md:p-12 relative z-10 min-h-screen">

                <h1 className="text-5xl md:text-8xl font-black italic text-center mt-12 mb-16 drop-shadow-[4px_4px_0_#ff1493] text-white tracking-[0.2em]">
                    N O O R &nbsp; A L I
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    {/* Main Info Box */}
                    <div className="bg-[#c0c0c0] text-black font-sans border-t-2 border-l-2 border-white border-b-2 border-r-2 border-gray-600 self-start shadow-[10px_10px_0_#ff1493]">
                        <div className="bg-[#000080] text-white px-2 py-1 flex justify-between items-center">
                            <span className="font-bold">about_me.txt - Notepad</span>
                            <div className="flex gap-1">
                                <div className="w-4 h-4 bg-[#c0c0c0] border border-white border-b-black border-r-black flex items-center justify-center text-xs text-black">_</div>
                                <div className="w-4 h-4 bg-[#c0c0c0] border border-white border-b-black border-r-black flex items-center justify-center text-xs text-black cursor-pointer font-bold">×</div>
                            </div>
                        </div>
                        <div className="p-6 bg-white border m-1 min-h-[200px] text-sm md:text-base">
                            I am currently working on <strong>modelanything.io</strong>.<br /><br />
                            Since December 2025, I&apos;ve been experimenting with coding LLMs. It is amazing how far they have come (they coded almost this entire site!)<br /><br />
                            Contact: noormehdiali@gmail.com
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-8">
                        {[
                            { title: "Fynopsis.exe", text: "First startup. AI-native dataroom. Great learning experience in the early days of AI applications." },
                            { title: "Genesis.exe", text: "UT Austin's startup fund and easily my favorite organization at UT. I updated the website to its current state." },
                            { title: "Nebula.exe", text: "The memory layer for AI. Started working on it after noticing the problem while building Fynopsis." },
                            { title: "ModelAnything.bat", text: "Hoping to build something cool in the ML space to visualize complex concepts." }
                        ].map((proj, i) => (
                            <div key={i} className="bg-[#c0c0c0] text-black font-sans border-t-2 border-l-2 border-white border-b-2 border-r-2 border-gray-600 shadow-xl max-w-sm" style={{ transform: `rotate(${Math.random() * 6 - 3}deg)`, marginLeft: `${Math.random() * 20}%` }}>
                                <div className="bg-gradient-to-r from-[#000080] to-[#1084d0] text-white px-2 py-1 flex justify-between items-center">
                                    <span className="font-bold truncate text-sm">{proj.title}</span>
                                    <div className="w-4 h-4 bg-[#c0c0c0] border border-white border-b-black border-r-black flex items-center justify-center text-xs text-black cursor-pointer font-bold">×</div>
                                </div>
                                <div className="p-4 bg-[#c0c0c0] text-sm">
                                    {proj.text}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div >
    );
}
