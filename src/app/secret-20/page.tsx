import React from "react";

export default function Secret20() {
    return (
        <div className="min-h-screen bg-[#fafafa] text-[#111111] font-sans selection:bg-[#111111] selection:text-[#fafafa] flex items-center justify-center p-4">
            <div className="max-w-2xl w-full text-center group">

                {/* Core Identity */}
                <h1 className="text-xl md:text-2xl font-light tracking-[0.3em] uppercase mb-12 opacity-50 transition-opacity duration-1000 group-hover:opacity-100">
                    Noor Ali
                </h1>

                {/* Minimal Info */}
                <div className="space-y-4 text-sm md:text-base font-light opacity-0 transition-all duration-1000 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0">
                    <p>
                        Building <a href="#" className="border-b border-black hover:border-b-2 transition-all">modelanything.io</a>
                    </p>
                    <p className="text-[#666666]">
                        Exploring ML visual interfaces.
                    </p>
                    <div className="w-8 h-[1px] bg-black/20 mx-auto my-8" />
                    <ul className="flex flex-col gap-2 items-center text-[#444444]">
                        <li className="hover:text-black cursor-pointer transition-colors">Fynopsis</li>
                        <li className="hover:text-black cursor-pointer transition-colors">Genesis</li>
                        <li className="hover:text-black cursor-pointer transition-colors">Nebula</li>
                    </ul>
                </div>

                {/* The Dot (Initial anchor point) */}
                <div className="w-2 h-2 bg-black rounded-full mx-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 group-hover:opacity-0 group-hover:scale-0" />

            </div>

            <div className="fixed bottom-8 text-[10px] tracking-widest uppercase opacity-20">
                noormehdiali@gmail.com
            </div>
        </div>
    );
}
