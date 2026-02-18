import React from "react";
import Image from "next/image";

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
    // If name starts with /, treat as full path (full color image)
    if (name.startsWith("/")) {
        return (
            <Image
                src={name}
                alt=""
                width={32}
                height={32}
                className={`${className} [image-rendering:pixelated] select-none pointer-events-none`}
                style={{ width: size, height: size }}
                draggable={false}
                unoptimized
            />
        );
    }

    // Otherwise treat as legacy mask icon
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
