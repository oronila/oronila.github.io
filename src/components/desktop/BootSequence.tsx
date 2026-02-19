
import React from 'react';

export default function BootSequence() {
  return (
    <div className="fixed inset-0 z-[50000] bg-black flex flex-col items-center justify-center cursor-none">
      <div className="relative w-16 h-16">
        {/* Pixel Spinner - 8 dots in a circle */}
        {/* We use standard tailwind animations or custom style for rotation */}
        <div className="animate-spin-pixel w-full h-full relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-white" />
          <div className="absolute top-2 right-2 w-3 h-3 bg-white/80" />
          <div className="absolute top-1/2 right-0 -translate-y-1/2 w-3 h-3 bg-white/60" />
          <div className="absolute bottom-2 right-2 w-3 h-3 bg-white/40" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-white/20" />
          <div className="absolute bottom-2 left-2 w-3 h-3 bg-white/10" />
          <div className="absolute top-1/2 left-0 -translate-y-1/2 w-3 h-3 bg-white/5" />
          <div className="absolute top-2 left-2 w-3 h-3 bg-white/0" />
        </div>
      </div>
      <div className="mt-8 text-white font-pixel text-sm tracking-[0.2em] animate-pulse">
        BOOTING SYSTEM...
      </div>

      <style jsx>{`
        @keyframes spin-step {
          0% { transform: rotate(0deg); }
          12.5% { transform: rotate(45deg); }
          25% { transform: rotate(90deg); }
          37.5% { transform: rotate(135deg); }
          50% { transform: rotate(180deg); }
          62.5% { transform: rotate(225deg); }
          75% { transform: rotate(270deg); }
          87.5% { transform: rotate(315deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-spin-pixel {
          animation: spin-step 1s infinite steps(8);
        }
      `}</style>
    </div>
  );
}
