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
      disabled={win.isMaximized}
      position={win.position}
      onStart={() => onFocus(win.instanceId)}
      onDrag={(_, data) => {
        onDrag({ x: data.x, y: data.y });
      }}
    >
      <div
        ref={nodeRef}
        onMouseDownCapture={() => onFocus(win.instanceId)}
        className="fixed border-4 border-black bg-neutral-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.4)] flex flex-col overflow-hidden"
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
          maxWidth={win.isMaximized ? undefined : 1200}
          maxHeight={win.isMaximized ? undefined : 800}
          onResizeStop={(_, __, ___, d) => {
            onResize({
              width: win.size.width + d.width,
              height: win.size.height + d.height,
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
                    onMinimize(win.instanceId);
                  }}
                  className="h-4 w-4 bg-[#ffbd2e] border-2 border-black hover:brightness-110 active:brightness-90 transition-all"
                  aria-label="Minimize"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onMaximize(win.instanceId);
                  }}
                  className="h-4 w-4 bg-[#28c840] border-2 border-black hover:brightness-110 active:brightness-90 transition-all"
                  aria-label="Maximize"
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
          <div className="flex-1 overflow-hidden relative bg-neutral-900">
            {children}
          </div>
        </Resizable>
      </div>
    </Draggable>
  );
}
