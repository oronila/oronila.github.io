import { useEffect, useRef } from "react";

export type MenuItem = {
    label?: string;
    action?: () => void;
    disabled?: boolean;
    separator?: boolean;
};

export function ContextMenu({
    position,
    onClose,
    items,
    direction = 'down',
}: {
    position: { x: number; y: number };
    onClose: () => void;
    items: MenuItem[];
    direction?: 'up' | 'down';
}) {
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                onClose();
            }
        }
        // Bind to mousedown to catch clicks before they trigger other things
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose]);

    return (
        <div
            ref={menuRef}
            className="fixed z-[20000] min-w-[200px] flex flex-col bg-neutral-800 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.4)] py-1 pointer-events-auto"
            style={{
                left: position.x,
                ...(direction === 'up'
                    ? { bottom: window.innerHeight - position.y }
                    : { top: position.y }
                ),
            }}
            onContextMenu={(e) => e.preventDefault()}
        >
            {items.map((item, index) => {
                if (item.separator) {
                    return (
                        <div
                            key={index}
                            className="my-1 h-[2px] bg-neutral-700"
                        />
                    );
                }

                return (
                    <button
                        key={index}
                        onClick={() => {
                            if (!item.disabled && item.action) {
                                item.action();
                            }
                            onClose(); // Close menu after action
                        }}
                        disabled={item.disabled}
                        className={`
              flex items-center px-4 py-1.5 text-left text-xs font-medium uppercase tracking-wider
              ${item.disabled
                                ? "text-neutral-500 cursor-not-allowed"
                                : "text-neutral-100 hover:bg-[#3b82f6] hover:text-white"
                            }
              transition-colors
            `}
                    >
                        {item.label}
                    </button>
                );
            })}
        </div>
    );
}
