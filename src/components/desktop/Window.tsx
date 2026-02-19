"use client";

import { useRef, useState, useEffect } from "react";
import Draggable from "react-draggable";
import { Resizable } from "re-resizable";
import type { WindowInstance } from "./types";

export default function Window({
  win,
  onFocus,
  onClose,
  onMinimize,
  onMaximize,
  onResize,
  onDrag,
  children,
}: {
  win: WindowInstance;
  onFocus: (instanceId: string) => void;
  onClose: (instanceId: string) => void;
  onMinimize: (instanceId: string) => void;
  onMaximize: (instanceId: string) => void;
  onResize: (updates: { size: { width: number; height: number }; position?: { x: number; y: number } }) => void;
  onDrag: (position: { x: number; y: number }) => void;
  children: React.ReactNode;
}) {
  const nodeRef = useRef<HTMLDivElement>(null);

  const resizeStart = useRef<{
    width: number;
    height: number;
    x: number;
    y: number;
  }>({ width: 0, height: 0, x: 0, y: 0 });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // if (win.isMinimized) return null; // Removed to keep content alive

  return (
    <Draggable
      nodeRef={nodeRef}
      handle="[data-window-handle]"
      disabled={win.isMaximized}
      position={win.position}
      onStart={() => onFocus(win.instanceId)}
      onDrag={(_, data) => {
        // Clamp drag position
        let newX = data.x;
        let newY = data.y;

        if (newX < 0) newX = 0;
        if (newY < 24) newY = 24; // Check TopBar
        if (newX + win.size.width > window.innerWidth) newX = window.innerWidth - win.size.width;
        if (newY + win.size.height > window.innerHeight) newY = window.innerHeight - win.size.height;

        onDrag({ x: newX, y: newY });
      }}
    >
      <div
        ref={nodeRef}
        onMouseDownCapture={() => onFocus(win.instanceId)}
        className="fixed border-4 border-black bg-neutral-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.4)] flex flex-col overflow-hidden"
        style={{
          zIndex: win.zIndex,
          display: win.isMinimized ? "none" : "flex",
        }}
        role="dialog"
        aria-label={win.title}
        data-window-id={win.instanceId}
        onContextMenu={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <Resizable
          size={{ width: win.size.width, height: win.size.height }}
          minWidth={300}
          minHeight={200}
          maxWidth={win.isMaximized ? undefined : 1200}
          maxHeight={win.isMaximized ? undefined : 800}
          bounds="window"
          onResizeStart={() => {
            resizeStart.current = {
              width: win.size.width,
              height: win.size.height,
              x: win.position.x,
              y: win.position.y
            };
          }}
          onResize={(e, direction, ref, d) => {
            let newWidth = resizeStart.current.width + d.width;
            let newHeight = resizeStart.current.height + d.height;
            let newX = resizeStart.current.x;
            let newY = resizeStart.current.y;

            if (direction.includes("left")) {
              newX -= d.width;
            }
            if (direction.includes("top")) {
              newY -= d.height;
            }

            // Manual clamping to screen bounds
            if (newX < 0) {
              newWidth += newX;
              newX = 0;
            }
            if (newY < 24) { // Respect TopBar
              newHeight += (newY - 24);
              newY = 24;
            }
            if (newX + newWidth > window.innerWidth) {
              newWidth = window.innerWidth - newX;
            }
            if (newY + newHeight > window.innerHeight) {
              newHeight = window.innerHeight - newY;
            }

            onResize({
              size: { width: Math.max(300, newWidth), height: Math.max(200, newHeight) },
              position: { x: newX, y: newY }
            });
          }}
          enable={win.isMaximized ? {
            top: false, right: false, bottom: false, left: false,
            topRight: false, bottomRight: false, bottomLeft: false, topLeft: false
          } : {
            top: true,
            right: true,
            bottom: true,
            left: true,
            topRight: true,
            bottomRight: true,
            bottomLeft: true,
            topLeft: true,
          }}
          // Hide visible handles while keeping them interactive
          handleClasses={{
            top: "h-2 -mt-1",
            bottom: "h-2 -mb-1",
            left: "w-2 -ml-1",
            right: "w-2 -mr-1",
          }}
          className="flex flex-col"
        >
          {/* Title Bar */}
          <div
            data-window-handle
            className="flex h-10 items-center justify-between border-b-4 border-black bg-neutral-800 px-3 cursor-default select-none shrink-0"
          >
            <div className="flex items-center gap-3">
              <div className="flex gap-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onClose(win.instanceId);
                  }}
                  className="h-4 w-4 bg-[#ff5f57] border-2 border-black hover:brightness-110 active:brightness-90 transition-all"
                  aria-label="Close"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!isMobile) onMinimize(win.instanceId);
                  }}
                  className={`h-4 w-4 border-2 border-black transition-all ${isMobile ? "bg-neutral-600 cursor-default" : "bg-[#ffbd2e] hover:brightness-110 active:brightness-90"}`}
                  aria-label="Minimize"
                  disabled={isMobile}
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!isMobile) onMaximize(win.instanceId);
                  }}
                  className={`h-4 w-4 border-2 border-black transition-all ${isMobile ? "bg-neutral-600 cursor-default" : "bg-[#28c840] hover:brightness-110 active:brightness-90"}`}
                  aria-label="Maximize"
                  disabled={isMobile}
                />
              </div>
              <span className="text-[10px] font-medium text-neutral-100 uppercase tracking-tighter">
                {win.title}
              </span>
            </div>
            <div className="text-[8px] font-bold text-neutral-400 tracking-tighter uppercase opacity-80">
              NoorOS v1.0
            </div>
          </div>

          {/* Content Area */}
          <div className={`flex-1 overflow-hidden relative ${win.appId === "terminal" ? "bg-black" : "bg-neutral-900"}`}>
            {children}
          </div>
        </Resizable>
      </div>
    </Draggable>
  );
}
