"use client";
import React, { useEffect, useRef } from "react";

export default function Secret16() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?".split("");
        const fontSize = 14;
        const columns = canvas.width / fontSize;
        const drops: number[] = [];

        for (let x = 0; x < columns; x++) {
            drops[x] = 1;
        }

        const draw = () => {
            ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = "#0F0";
            ctx.font = fontSize + "px monospace";

            for (let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };

        const interval = setInterval(draw, 33);

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener("resize", handleResize);

        return () => {
            clearInterval(interval);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div className="min-h-screen bg-black text-[#0f0] font-mono overflow-hidden relative selection:bg-white selection:text-black">
            <canvas ref={canvasRef} className="fixed inset-0 z-0 opacity-40 pointer-events-none" />

            <div className="container mx-auto px-4 py-20 relative z-10 min-h-screen flex flex-col items-center justify-center">

                <div className="bg-black/80 border border-[#0f0] p-8 md:p-12 shadow-[0_0_30px_rgba(0,255,0,0.2)] backdrop-blur-sm max-w-4xl text-center">

                    <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-widest uppercase drop-shadow-[0_0_10px_#0f0]">
                        Noor Ali
                    </h1>

                    <div className="inline-block bg-[#0f0] text-black px-4 py-1 font-bold mb-8 uppercase tracking-widest text-sm">
                        The Construct
                    </div>

                    <p className="text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto">
                        I am currently building <strong>modelanything.io</strong>.<br /><br />
                        Experimenting with coding LLMs since December 2025. The systems are learning rapidly. I am navigating the new reality of software engineering.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                        {[
                            { id: "Fynopsis", desc: "First startup. AI-native dataroom. The training simulation." },
                            { id: "Genesis", desc: "UT Austin's startup fund. Upgraded the central website node." },
                            { id: "Nebula", desc: "Memory layer for AI. Co-authored with Will Zhang." },
                            { id: "ModelAnything", desc: "Active compilation. Visualizing ML algorithms." }
                        ].map((proj, idx) => (
                            <div key={idx} className="border border-[#0f0]/50 p-6 hover:bg-[#0f0]/10 hover:border-[#0f0] transition-all cursor-pointer group">
                                <h3 className="font-bold text-xl mb-2 text-white group-hover:text-[#0f0]">{">"} {proj.id}</h3>
                                <p className="text-sm opacity-80">{proj.desc}</p>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
}
