import React from "react";

export function PixelIcon({
    name,
    color,
    className = "w-8 h-8",
    size = "100%"
}: {
    name: string;
    color: string;
    className?: string;
    size?: string | number;
}) {
    const iconUrl = `/icons/pixel/${name}.svg`;
    return (
        <div
            className={`${className} [image-rendering:pixelated] transition-colors duration-300`}
            style={{
                backgroundColor: color,
                maskImage: `url(${iconUrl})`,
                WebkitMaskImage: `url(${iconUrl})`,
                maskSize: 'contain',
                maskRepeat: 'no-repeat',
                maskPosition: 'center',
                width: size,
                height: size,
            }}
            aria-hidden="true"
        />
    );
}
