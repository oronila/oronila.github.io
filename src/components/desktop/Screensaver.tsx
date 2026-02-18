import React, { useEffect, useRef, useState } from "react";

const COLORS = [
    "#ef4444", // red
    "#f97316", // orange
    "#eab308", // yellow
    "#22c55e", // green
    "#06b6d4", // cyan
    "#3b82f6", // blue
    "#a855f7", // purple
    "#ec4899", // pink
];

export default function Screensaver({ onWake }: { onWake: () => void }) {
    const position = useRef({ x: 100, y: 100 });
    const velocity = useRef({ x: 1, y: 1 });
    const [color, setColor] = useState(COLORS[0]);
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const requestRef = useRef<number>(undefined);

    const animate = () => {
        if (!containerRef.current || !textRef.current) return;

        const container = containerRef.current.getBoundingClientRect();
        const text = textRef.current.getBoundingClientRect();

        let newX = position.current.x + velocity.current.x;
        let newY = position.current.y + velocity.current.y;
        let hit = false;

        // Check horizontal bounds
        if (newX <= 0) {
            newX = 0;
            velocity.current.x = Math.abs(velocity.current.x);
            hit = true;
        } else if (newX + text.width >= container.width) {
            newX = container.width - text.width;
            velocity.current.x = -Math.abs(velocity.current.x);
            hit = true;
        }

        // Check vertical bounds
        if (newY <= 0) {
            newY = 0;
            velocity.current.y = Math.abs(velocity.current.y);
            hit = true;
        } else if (newY + text.height >= container.height) {
            newY = container.height - text.height;
            velocity.current.y = -Math.abs(velocity.current.y);
            hit = true;
        }

        position.current = { x: newX, y: newY };
        textRef.current.style.transform = `translate(${newX}px, ${newY}px)`;

        if (hit) {
            const nextColor = COLORS[Math.floor(Math.random() * COLORS.length)];
            setColor(nextColor);
        }

        requestRef.current = requestAnimationFrame(animate);
    };

    useEffect(() => {
        // Initial random position
        position.current = {
            x: Math.random() * (window.innerWidth - 200),
            y: Math.random() * (window.innerHeight - 100),
        };

        // Initial random velocity direction
        velocity.current = {
            x: (Math.random() > 0.5 ? 1 : -1) * 1.5,
            y: (Math.random() > 0.5 ? 1 : -1) * 1.5
        };

        requestRef.current = requestAnimationFrame(animate);
        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[99999] bg-black cursor-none overflow-hidden select-none animate-in fade-in duration-1000"
            onClick={onWake}
        >
            <div
                ref={textRef}
                className="absolute font-bold text-4xl tracking-widest uppercase will-change-transform font-pixel"
                style={{
                    transform: `translate(${position.current.x}px, ${position.current.y}px)`,
                    color: color,
                    textShadow: `0 0 10px ${color}80`,
                }}
            >
                NoorOS
            </div>

            <div className="absolute bottom-8 w-full text-center text-neutral-800 text-xs font-pixel animate-pulse">
                Click anywhere to wake
            </div>
        </div>
    );
}
