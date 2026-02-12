"use client";

import { useRef } from "react";
import Draggable from "react-draggable";
import { Resizable } from "re-resizable";
import type { WindowInstance } from "./types";

export default function Window({
  win,
  onFocus,
  onClose,
  onMinimize,
  onResize,
  onDrag,
  children,
}: {
  win: WindowInstance;
  onFocus: (instanceId: string) => void;
  onClose: (instanceId: string) => void;
  onMinimize: (instanceId: string) => void;
  onResize: (size: { width: number; height: number }) => void;
  onDrag: (position: { x: number; y: number }) => void;
  children: React.ReactNode;
}) {
  const nodeRef = useRef<HTMLDivElement>(null);

  if (win.isMinimized) return null;

  return (
    <Draggable
      nodeRef={nodeRef}
      handle="[data-window-handle]"
      position={win.position}
      onStart={() => onFocus(win.instanceId)}
      onDrag={(_, data) => {
        onDrag({ x: data.x, y: data.y });
      }}
    >
      <div
        ref={nodeRef}
        className="fixed rounded-2xl border border-white/10 bg-neutral-950/70 shadow-2xl backdrop-blur-xl flex flex-col overflow-hidden"
        style={{ 
          zIndex: win.zIndex 
        }}
        role="dialog"
        aria-label={win.title}
      >
        <Resizable
          size={{ width: win.size.width, height: win.size.height }}
          minWidth={300}
          minHeight={200}
          maxWidth={1200}
          maxHeight={800}
          onResizeStop={(_, __, ___, d) => {
            onResize({
              width: win.size.width + d.width,
              height: win.size.height + d.height,
            });
          }}
          enable={{
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
            className="flex h-11 items-center justify-between border-b border-white/10 px-4 cursor-default select-none shrink-0"
          >
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onClose(win.instanceId);
                  }}
                  className="h-3 w-3 rounded-full bg-[#ff5f57] border border-black/10 hover:brightness-110 active:brightness-90 transition-all"
                  aria-label="Close"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onMinimize(win.instanceId);
                  }}
                  className="h-3 w-3 rounded-full bg-[#ffbd2e] border border-black/10 hover:brightness-110 active:brightness-90 transition-all"
                  aria-label="Minimize"
                />
                <button
                  className="h-3 w-3 rounded-full bg-[#28c940] border border-black/10 hover:brightness-110 active:brightness-90 transition-all opacity-50 cursor-not-allowed"
                  aria-label="Maximize"
                />
              </div>
              <span className="ml-3 text-[13px] font-medium text-neutral-300 tracking-tight">
                {win.title}
              </span>
            </div>
            <div className="text-[10px] font-bold text-neutral-500 tracking-widest uppercase opacity-50">
              NoorOS
            </div>
          </div>
          
          {/* Content Area */}
          <div className="flex-1 overflow-hidden relative">
            {children}
          </div>
        </Resizable>
      </div>
    </Draggable>
  );
}
