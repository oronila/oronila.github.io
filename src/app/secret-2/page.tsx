import React from "react";

export default function Secret2() {
    return (
        <div className="min-h-screen bg-white text-black font-sans box-border selection:bg-black selection:text-white pb-12">
            <div className="p-4 md:p-12 border-8 border-black m-4 md:m-12 relative">

                <header className="border-b-8 border-black pb-8 mb-12">
                    <h1 className="text-7xl md:text-[10rem] font-black leading-none tracking-tighter uppercase break-words">
                        NOOR
                        <br />
                        ALI
                    </h1>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mt-4 font-bold text-xl md:text-3xl uppercase tracking-tight">
                        <span>NOORMEHDIALI@GMAIL.COM</span>
                        <span>BUILDER // EXPERIMENTER</span>
                    </div>
                </header>

                <main className="grid grid-cols-1 lg:grid-cols-2 gap-12 font-medium text-lg md:text-2xl leading-tight border-b-8 border-black pb-12">
                    <p className="border-l-8 border-black pl-6 pt-2">
                        EXPERIMENTING WITH CODING LLMS SINCE DEC 2025. SHOCKED BY HOW CAPABLE THEY HAVE BECOME. WORRIED ABOUT THE FUTURE OF S.E. BUT STILL DOING IT BECAUSE IT IS FUN.
                    </p>
                    <div className="bg-black text-white p-6 pb-24 flex items-end font-black text-5xl uppercase">
                        PROJECTS.
                    </div>
                </main>

                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border-b-8 border-black mt-12 bg-black text-white divide-y-8 md:divide-y-0 md:divide-x-8 divide-black">
                    {[
                        { id: "FYNOPSIS", desc: "AI-NATIVE DATAROOM. FIRST STARTUP. GREAT LEARNING EXPERIENCE." },
                        { id: "GENESIS", desc: "UT AUSTIN STARTUP FUND. FAVORITE ORG. UPDATED THE WEBSITE." },
                        { id: "NEBULA", desc: "MEMORY LAYER FOR AI. BUILT WITH CO-FOUNDER WILL ZHANG." },
                        { id: "MODELANYTHING", desc: "VISUALIZING COMPLEX ML CONCEPTS. CURRENTLY BUILDING." }
                    ].map((proj, idx) => (
                        <div key={idx} className="bg-white text-black p-6 h-full border-black font-bold flex flex-col justify-between min-h-[300px] hover:bg-black hover:text-white transition-colors cursor-pointer group">
                            <h2 className="text-4xl underline decoration-8 underline-offset-8 mb-8">{proj.id}</h2>
                            <p className="text-xl uppercase group-hover:text-white">{proj.desc}</p>
                        </div>
                    ))}
                </section>

                <footer className="mt-12 flex justify-between items-center font-black text-2xl uppercase">
                    <a href="#" className="hover:underline decoration-8 underline-offset-8">EXIT //</a>
                    <div className="w-16 h-16 bg-black rounded-full" />
                </footer>

            </div>
        </div>
    );
}
