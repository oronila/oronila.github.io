'use client';

import { useEffect, useRef } from 'react';

interface SlopeGameProps {
  width?: number;
  height?: number;
  onClose?: () => void;
}

export default function SlopeGame({ width = 640, height = 420, onClose }: SlopeGameProps) {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose?.();
            }
        };
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

  return (
    <iframe
      src="/Slope-Game/index.html"
      width={width}
      height={height}
      className="bg-black rounded-md border border-green-800/60"
      title="Slope Game"
    />
  );
}

