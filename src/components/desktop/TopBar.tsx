import React, { useState, useEffect } from "react";

export default function TopBar() {
    const [time, setTime] = useState<string>("");

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            // Format: Fri Feb 13 8:05 PM
            const options: Intl.DateTimeFormatOptions = {
                weekday: "short",
                month: "short",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                hour12: true,
            };
            setTime(now.toLocaleString("en-US", options).replace(/,/g, ""));
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed top-0 left-0 right-0 h-6 bg-black/20 backdrop-blur-md flex items-center justify-between px-4 z-50 text-white text-xs font-medium select-none shadow-sm">
            <div className="flex items-center gap-6">
                <div className="font-bold tracking-wide">NoorOS</div>
            </div>

            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <span>🌤️</span>
                    <span>68°F San Francisco</span>
                </div>
                <div>
                    {time}
                </div>
            </div>
        </div>
    );
}
