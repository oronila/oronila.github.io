import React from "react";

export default function BrowserApp() {
    const [page, setPage] = React.useState<"home" | "blog">("home");

    // Load state
    React.useEffect(() => {
        const saved = localStorage.getItem("nooros_browser_state");
        if (saved === "home" || saved === "blog") {
            setPage(saved);
        }
    }, []);

    // Save state
    React.useEffect(() => {
        localStorage.setItem("nooros_browser_state", page);
    }, [page]);

    return (
        <div className="h-full w-full bg-white text-black font-serif overflow-hidden flex flex-col">
            {/* Address Bar */}
            <div className="bg-[#bfbfbf] p-1 border-b-2 border-white border-r-2 border-l-2 border-l-white border-t-2 border-t-white border-r-[#404040] border-b-[#404040] flex gap-2 items-center text-sm mb-0">
                <div className="text-gray-600">Address:</div>
                <div className="flex-1 bg-white border border-[#404040] px-2 py-0.5 font-sans inset-shadow">
                    {page === "home" ? "http://www.noorali.com/home.html" : "http://www.noorali.com/blog.html"}
                </div>
                <div className="text-gray-600">Go</div>
            </div>

            <div className="flex-1 overflow-auto p-4 bg-[url('/bg_mesh.png')]">
                <div className="max-w-3xl mx-auto border-4 border-blue-800 bg-white p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)]">
                    {/* Header */}
                    <div className="text-center border-b-4 border-double border-black pb-4 mb-4">
                        <h1 className="text-4xl text-blue-800 font-bold mb-2">Welcome to Noor&apos;s Web World</h1>
                        <marquee className="bg-yellow-200 border border-black p-1 font-bold text-red-600">
                            *** UNDER CONSTRUCTION *** CHECK BACK SOON *** SIGN THE GUESTBOOK ***
                        </marquee>
                    </div>

                    <div className="flex flex-col md:flex-row gap-6">
                        {/* Sidebar */}
                        <div className="w-full md:w-48 shrink-0 bg-[#f0f0f0] p-3 border-2 border-gray-400 h-fit">
                            <h3 className="font-bold text-center bg-blue-800 text-white mb-2 py-1">Navigation</h3>
                            <ul className="list-disc pl-5 space-y-1 text-blue-800 underline cursor-pointer">
                                <li><a onClick={() => setPage("home")} className="hover:text-red-600">Home</a></li>
                                <li><a onClick={() => setPage("blog")} className="hover:text-red-600">Blog</a></li>
                            </ul>

                            <h3 className="font-bold text-center bg-green-700 text-white mt-4 mb-2 py-1">Cool Sites</h3>
                            <div className="text-center space-y-2 text-xs">
                                <a href="https://github.com/onorila" target="_blank" rel="noreferrer" className="block text-blue-800 underline">
                                    <span className="inline-block mr-1">💾</span>My GitHub
                                </a>
                                <a href="https://x.com/oronila_" target="_blank" rel="noreferrer" className="block text-blue-800 underline">
                                    <span className="inline-block mr-1">🐦</span>My Twitter/X
                                </a>
                                <a href="https://www.linkedin.com/in/noor-ali05/" target="_blank" rel="noreferrer" className="block text-blue-800 underline">
                                    <span className="inline-block mr-1">🐦</span>My LinkedIn
                                </a>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="flex-1">
                            {page === "home" ? (
                                <>
                                    <h2 className="text-2xl font-bold bg-gray-200 px-2 py-1 mb-4 border-l-4 border-black">Latest Updates</h2>
                                    <div className="mb-6">
                                        <h3 className="font-bold text-lg text-blue-900 border-b border-gray-400">Feb 18, 2026</h3>
                                        <p className="mt-2 text-sm leading-relaxed">
                                            Just getting things set up here. More content is coming soon...
                                        </p>
                                        <div className="text-xs text-gray-500 mt-1 italic">Posted by: WebMaster_Noor</div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <h2 className="text-2xl font-bold bg-gray-200 px-2 py-1 mb-4 border-l-4 border-black">My Blog</h2>
                                    <div className="mb-6">
                                        <p className="mt-2 text-sm leading-relaxed italic text-center text-gray-500">
                                            ... Content Loading ...
                                        </p>
                                        <p className="mt-4 text-center font-bold text-red-600">
                                            Blog posts are coming soon!
                                        </p>
                                    </div>
                                </>
                            )}

                            <div className="border-t-2 border-black pt-4 mt-8 text-center text-xs">
                                <p>&copy; 2005-2026 Noor Ali. All rights reserved.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
