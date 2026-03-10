import React from "react";

export default function Secret11() {
    return (
        <div className="min-h-screen bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] bg-[#000080] text-[#ffff00] font-['Comic_Sans_MS',cursive] p-8 selection:bg-red-500 selection:text-white">
            <div className="max-w-4xl mx-auto text-center border-4 border-dashed border-[#ff00ff] p-4 bg-black/40">

                {/* Web 1.0 Header */}
                <h1 className="text-4xl md:text-6xl text-[#00ff00] font-bold mb-4 drop-shadow-[2px_2px_0_#ff0000]">
                    ~~~ WELCOME TO NOOR ALI&apos;S HOMEPAGE ~~~
                </h1>

                <div className="w-full overflow-hidden bg-white text-black font-bold p-1 mb-8 border-2 border-outset border-gray-300">
                    <marquee scrollamount="5">
                        UPDATE: Currently building modelanything.io! 🚀 | Experimenting with LLMs since Dec 2025 🤖 | NOORMEHDIALI@GMAIL.COM 📧
                    </marquee>
                </div>

                <div className="flex flex-col md:flex-row gap-8 text-left">
                    {/* Sidebar */}
                    <div className="md:w-1/3 bg-[#c0c0c0] text-black border-4 border-t-white border-l-white border-b-gray-800 border-r-gray-800 p-4">
                        <h2 className="text-xl font-bold bg-[#000080] text-white px-2 py-1 mb-4">Nav Menu</h2>
                        <ul className="space-y-2 underline text-blue-800 font-bold list-disc list-inside">
                            <li><a href="#">Home</a></li>
                            <li><a href="#">About Me</a></li>
                            <li><a href="#">Guestbook</a></li>
                            <li><a href="#">Webring</a></li>
                        </ul>

                        <div className="mt-8 text-center">
                            <p className="text-xs mb-1">YOU ARE VISITOR NO:</p>
                            <div className="inline-block bg-black text-[#00ff00] font-mono px-2 py-1 tracking-widest border-2 border-gray-600">
                                0004269
                            </div>
                        </div>

                        <div className="mt-8 flex justify-center">
                            <div className="w-24 h-8 bg-black text-xs text-white flex items-center justify-center border border-gray-400">
                                BEST VIEWED IN NETSCAPE
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="md:w-2/3 bg-white text-black p-6 border-4 border-t-gray-800 border-l-gray-800 border-b-white border-r-white text-sm md:text-base">
                        <h2 className="text-2xl font-bold text-red-600 underline mb-4">My Projects:</h2>

                        <table className="w-full border-collapse border-2 border-black mb-8">
                            <thead>
                                <tr className="bg-[#ffff00]">
                                    <th className="border-2 border-black p-2">Project Name</th>
                                    <th className="border-2 border-black p-2">Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border-2 border-black p-2 font-bold text-[#0000ff]">fynopsis.ai</td>
                                    <td className="border-2 border-black p-2">First startup. AI-native dataroom. Learned a ton!</td>
                                </tr>
                                <tr className="bg-gray-200">
                                    <td className="border-2 border-black p-2 font-bold text-[#0000ff]">genesisut.com</td>
                                    <td className="border-2 border-black p-2">UT Austin&apos;s startup fund. Updated the website.</td>
                                </tr>
                                <tr>
                                    <td className="border-2 border-black p-2 font-bold text-[#0000ff]">trynebula.ai</td>
                                    <td className="border-2 border-black p-2">Memory layer for AI. Co-founded w/ Will Zhang.</td>
                                </tr>
                                <tr className="bg-gray-200">
                                    <td className="border-2 border-black p-2 font-bold text-[#0000ff]">modelanything.io</td>
                                    <td className="border-2 border-black p-2">Visualizing complex ML concepts. Active dev!</td>
                                </tr>
                            </tbody>
                        </table>

                        <p className="text-center italic">
                            &quot;The future of SWE is scary but building is so fun!&quot;
                        </p>

                        <div className="flex justify-center gap-4 mt-8">
                            <div className="w-16 h-16 animate-spin text-4xl">⭐</div>
                            <div className="w-16 h-16 animate-bounce text-4xl">📧</div>
                            <div className="w-16 h-16 animate-pulse text-4xl">🔥</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
