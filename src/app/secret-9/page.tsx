import React from "react";

export default function Secret9() {
    return (
        <div className="min-h-screen bg-white text-black font-mono p-4 md:p-8 selection:bg-black selection:text-white pb-20">
            <div className="border border-black max-w-5xl mx-auto min-h-[90vh] flex flex-col">

                {/* Header Grid */}
                <header className="border-b border-black grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-black text-xs uppercase font-bold tracking-widest">
                    <div className="p-4 flex items-center justify-center">DIR: /NOOR-ALI</div>
                    <div className="p-4 flex items-center justify-center bg-black text-white">ASCII_PROTOCOL_ACTIVE</div>
                    <div className="p-4 flex items-center justify-center">MOD: EXPERIMENTER</div>
                </header>

                {/* Main Content */}
                <main className="flex-grow flex flex-col items-center justify-center p-8 overflow-x-auto whitespace-nowrap">
                    <pre className="text-[10px] md:text-sm leading-tight md:leading-snug font-black tracking-tighter mb-8 pl-4">
                        {`
  _   _                 _    _ _ 
 | \\ | |               / \\  | (_)
 |  \\| |___  ___ _ __ / _ \\ | |_ 
 | . \` / _ \\/ _ \\ '__/ ___ \\| | |
 | |\\  \\ (_) |  __/ | / ___ \\ | | |
 |_| \\_\\___/ \\___|_|/_/   \\_\\_|_|
                                 
`}
                    </pre>

                    <pre className="text-[10px] md:text-xs leading-tight mb-8">
                        {`
+-------------------------------------------------------------+
|                                                             |
|  CURRENT STATUS: BUILDING modelanything.io                  |
|  CONTACT: noormehdiali@gmail.com                            |
|                                                             |
|  "Experimenting with LLMs since Dec 2025. Shocked by how    |
|  capable they have become... doing it because it's fun."    |
|                                                             |
+-------------------------------------------------------------+
`}
                    </pre>

                    <pre className="text-[10px] md:text-xs leading-tight">
                        {`
[ PROJECT HISTORY DIRECTORY ]

  > FYNOPSIS
    First startup. AI-native dataroom.
    Status: Terminated. Great learning experience.

  > GENESIS
    UT Austin's startup fund.
    Status: Favorite Org. Updated website to current state.

  > NEBULA
    The memory layer for AI.
    Status: Co-founded w/ Will Zhang. Built after Fynopsis.

  > MODELANYTHING
    Visualizing complex ML concepts.
    Status: Active construction.
`}
                    </pre>
                </main>

                {/* Footer Grid */}
                <footer className="border-t border-black grid grid-cols-2 divide-x divide-black text-xs uppercase font-bold tracking-widest mt-auto">
                    <div className="p-4 flex items-center justify-start">EOF</div>
                    <div className="p-4 flex items-center justify-end hover:bg-black hover:text-white cursor-pointer transition-colors">
                        RETURN [↵]
                    </div>
                </footer>

            </div>
        </div>
    );
}
