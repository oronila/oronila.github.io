"use client";
import React, { useState } from "react";

export default function Secret13() {
    const [activeWindow, setActiveWindow] = useState<number | null>(1);

    const bringToFront = (id: number) => {
        setActiveWindow(id);
    };

    return (
        <div className="min-h-screen bg-[url('https://www.transparenttextures.com/patterns/black-mamba.png')] bg-gray-300 font-sans selection:bg-black selection:text-white pb-20 overflow-hidden relative">

            {/* Top Menu Bar */}
            <div className="absolute top-0 w-full h-6 bg-white border-b border-black flex items-center px-4 text-sm z-50">
                <div className="font-bold flex gap-4">
                    <span className="cursor-pointer"></span>
                    <span className="cursor-pointer">File</span>
                    <span className="cursor-pointer">Edit</span>
                    <span className="cursor-pointer">View</span>
                    <span className="cursor-pointer">Special</span>
                </div>
                <div className="ml-auto flex items-center gap-2">
                    <span className="cursor-pointer">6:42 PM</span>
                </div>
            </div>

            <div className="container mx-auto px-4 pt-16 relative w-full h-[calc(100vh-24px)]">

                {/* Desktop Icons */}
                <div className="absolute right-4 top-16 flex flex-col gap-6 items-center">
                    <div className="flex flex-col items-center cursor-pointer">
                        <div className="w-10 h-10 border-2 border-black bg-white flex items-center justify-center mb-1">💽</div>
                        <span className="bg-white px-1 text-xs border border-transparent shadow-sm">Macintosh HD</span>
                    </div>
                    <div className="flex flex-col items-center cursor-pointer">
                        <div className="w-10 h-10 border-2 border-black bg-white flex items-center justify-center mb-1">🗑️</div>
                        <span className="bg-white px-1 text-xs border border-transparent shadow-sm">Trash</span>
                    </div>
                </div>

                {/* Window 1: Profile */}
                <div
                    onClick={() => bringToFront(1)}
                    className={`absolute top-20 left-10 w-[350px] bg-white border-2 border-black shadow-[-4px_4px_0_rgba(0,0,0,1)] ${activeWindow === 1 ? 'z-40' : 'z-10'}`}
                >
                    <div className="h-6 border-b-2 border-black bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAFElEQVQIW2NkYGD4z8DAwMgAI0AMCKcCBG0QxFEAAAAASUVORK5CYII=')] flex items-center justify-between px-2 cursor-move">
                        <div className="w-3 h-3 border border-black bg-white cursor-pointer" />
                        <span className="bg-white px-2 font-bold text-sm tracking-wide">Noor Ali Profile</span>
                        <div className="w-3 h-3 border border-black bg-white" />
                    </div>
                    <div className="p-4 text-sm leading-relaxed border-b border-black">
                        <div className="flex gap-4 mb-4">
                            <div className="w-16 h-16 border-2 border-black bg-gray-200" />
                            <div>
                                <h2 className="font-bold text-lg">NOOR ALI</h2>
                                <p>Developer / Experimenter</p>
                                <p>noormehdiali@gmail.com</p>
                            </div>
                        </div>
                        <p className="mb-2">Currently building <strong>modelanything.io</strong>.</p>
                        <p>I started experimenting with coding LLMs in Dec 2025. It is both fun and slightly terrifying how capable software has become.</p>
                    </div>
                </div>

                {/* Window 2: Projects */}
                <div
                    onClick={() => bringToFront(2)}
                    className={`absolute top-40 left-4 md:left-96 w-[350px] md:w-[450px] bg-white border-2 border-black shadow-[-4px_4px_0_rgba(0,0,0,1)] ${activeWindow === 2 ? 'z-40' : 'z-10'}`}
                >
                    <div className="h-6 border-b-2 border-black bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAFElEQVQIW2NkYGD4z8DAwMgAI0AMCKcCBG0QxFEAAAAASUVORK5CYII=')] flex items-center justify-between px-2 cursor-move">
                        <div className="w-3 h-3 border border-black bg-white cursor-pointer" />
                        <span className="bg-white px-2 font-bold text-sm tracking-wide">Projects Folder</span>
                        <div className="w-3 h-3 border border-black bg-white" />
                    </div>
                    <div className="p-2 border-b-2 border-black bg-gray-200 text-xs flex gap-4">
                        <span>4 items</span>
                        <span>32.5 MB in disk</span>
                        <span>10.2 MB available</span>
                    </div>
                    <div className="p-6 grid grid-cols-2 gap-8 text-center text-xs">
                        <div className="flex flex-col items-center gap-2 cursor-pointer group">
                            <div className="w-12 h-12 border-2 border-black bg-white flex justify-center items-center font-serif text-lg group-hover:bg-black group-hover:text-white">F</div>
                            <span className="bg-transparent group-hover:bg-black group-hover:text-white px-1">Fynopsis</span>
                        </div>
                        <div className="flex flex-col items-center gap-2 cursor-pointer group">
                            <div className="w-12 h-12 border-2 border-black bg-white flex justify-center items-center font-serif text-lg group-hover:bg-black group-hover:text-white">G</div>
                            <span className="bg-transparent group-hover:bg-black group-hover:text-white px-1">Genesis</span>
                        </div>
                        <div className="flex flex-col items-center gap-2 cursor-pointer group">
                            <div className="w-12 h-12 border-2 border-black bg-white flex justify-center items-center font-serif text-lg group-hover:bg-black group-hover:text-white">N</div>
                            <span className="bg-transparent group-hover:bg-black group-hover:text-white px-1">Nebula</span>
                        </div>
                        <div className="flex flex-col items-center gap-2 cursor-pointer group">
                            <div className="w-12 h-12 border-2 border-black bg-white flex justify-center items-center font-serif text-lg group-hover:bg-black group-hover:text-white">M</div>
                            <span className="bg-transparent group-hover:bg-black group-hover:text-white px-1">ModelAnything</span>
                        </div>
                    </div>
                </div>

            </div >
        </div >
    );
}
