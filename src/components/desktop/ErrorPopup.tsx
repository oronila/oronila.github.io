import React from "react";
import { PixelIcon } from "./PixelIcon";

export default function ErrorPopup({
    message,
    onClose,
}: {
    message: string;
    onClose: () => void;
}) {
    return (
        <div className="fixed inset-0 z-[100000] flex items-center justify-center bg-black/50 backdrop-blur-sm pointer-events-auto select-none">
            <div className="w-96 border-4 border-black bg-[#c0c0c0] shadow-[8px_8px_0px_0px_rgba(0,0,0,0.5)] flex flex-col font-pixel animate-in zoom-in-95 duration-200">
                {/* Title Bar */}
                <div className="flex h-8 items-center justify-between bg-[#000080] px-2 text-white">
                    <div className="text-xs font-bold tracking-wider">System Error</div>
                    <button onClick={onClose} className="p-0.5 hover:bg-[#c0c0c0] hover:text-black transition-colors">
                        <PixelIcon name="close" size={12} color="currentColor" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 flex gap-4 items-start">
                    <div className="shrink-0 text-red-600 mt-1">
                        <PixelIcon name="alert-circle" size={48} color="#ef4444" />
                    </div>
                    <div className="flex flex-col gap-4 flex-1">
                        <div className="text-sm font-medium text-black leading-relaxed">
                            {message}
                        </div>
                    </div>
                </div>

                {/* Footer / Actions */}
                <div className="flex justify-center p-4 pt-0">
                    <button
                        onClick={onClose}
                        className="px-6 py-1 border-2 border-black bg-[#c0c0c0] shadow-[2px_2px_0px_0px_#000000] active:translate-y-[1px] active:shadow-none hover:bg-white text-xs font-bold text-black uppercase tracking-wider"
                    >
                        OK
                    </button>
                </div>
            </div>
        </div>
    );
}
