import React, { useState, useEffect } from "react";

export default function TopBar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isAsleep, setIsAsleep] = useState(false);
    const [time, setTime] = useState<string>("");

    const [weather, setWeather] = useState<{ temp: number; icon: string } | null>(null);

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

        // Fetch Weather
        const fetchWeather = async () => {
            try {
                const res = await fetch(
                    "https://api.open-meteo.com/v1/forecast?latitude=30.2672&longitude=-97.7431&current_weather=true&temperature_unit=fahrenheit"
                );
                const data = await res.json();
                const { temperature, weathercode } = data.current_weather;

                // Map codes to emojis
                let icon = "☀️";
                if (weathercode === 0) icon = "☀️";
                else if (weathercode >= 1 && weathercode <= 3) icon = "⛅";
                else if (weathercode >= 45 && weathercode <= 48) icon = "🌫️";
                else if (weathercode >= 51 && weathercode <= 67) icon = "🌧️";
                else if (weathercode >= 71 && weathercode <= 77) icon = "❄️";
                else if (weathercode >= 80 && weathercode <= 82) icon = "🌧️";
                else if (weathercode >= 95) icon = "⛈️";

                setWeather({ temp: Math.round(temperature), icon });
            } catch (e) {
                console.error("Weather fetch failed", e);
            }
        };

        fetchWeather();
        const weatherInterval = setInterval(fetchWeather, 600000); // 10 mins

        // Close menu on click outside
        const handleClickOutside = (e: MouseEvent) => {
            if (menuOpen && !(e.target as Element).closest("[data-system-menu]")) {
                setMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            clearInterval(interval);
            clearInterval(weatherInterval);
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuOpen]);

    const toggleMenu = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setMenuOpen(!menuOpen);
    };

    return (
        <>
            {isAsleep && (
                <div
                    className="fixed inset-0 z-[99999] bg-black cursor-none"
                    onClick={() => setIsAsleep(false)}
                />
            )}

            <div className="fixed top-0 left-0 right-0 h-6 bg-black/20 backdrop-blur-md flex items-center justify-between px-4 z-[1000] text-white text-xs font-medium select-none shadow-sm">
                <div className="flex items-center gap-6 relative">
                    <button
                        data-system-menu
                        onClick={toggleMenu}
                        onContextMenu={toggleMenu}
                        className={`font-bold tracking-wide hover:text-neutral-300 transition-colors ${menuOpen ? "text-neutral-300" : ""}`}
                    >
                        NoorOS
                    </button>

                    {menuOpen && (
                        <div className="absolute top-6 left-0 w-48 bg-neutral-800 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.4)] py-1 flex flex-col z-[20001]">
                            <button
                                onClick={() => {
                                    setMenuOpen(false);
                                    window.open("https://github.com/oronila/oronila.github.io", "_blank");
                                }}
                                className="text-left px-4 py-1.5 hover:bg-[#3b82f6] hover:text-white text-neutral-100 uppercase text-xs"
                            >
                                Source Code
                            </button>
                            <div className="my-1 h-[2px] bg-neutral-700" />
                            <button
                                onClick={() => {
                                    setMenuOpen(false);
                                    setIsAsleep(true);
                                }}
                                className="text-left px-4 py-1.5 hover:bg-[#3b82f6] hover:text-white text-neutral-100 uppercase text-xs"
                            >
                                Sleep
                            </button>
                            <button
                                onClick={() => {
                                    if (confirm("Are you sure you want to shut down?")) {
                                        window.location.reload();
                                    }
                                    setMenuOpen(false);
                                }}
                                className="text-left px-4 py-1.5 hover:bg-[#3b82f6] hover:text-white text-neutral-100 uppercase text-xs"
                            >
                                Shut Down...
                            </button>
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-4">
                    <div className="hidden md:flex items-center gap-2">
                        <span>{weather ? weather.icon : "Loading..."}</span>
                        <span>{weather ? `${weather.temp}°F Austin` : ""}</span>
                    </div>
                    <div>
                        {time}
                    </div>
                </div>
            </div>
        </>
    );
}
