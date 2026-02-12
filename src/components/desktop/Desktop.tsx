"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import Draggable from "react-draggable";
import Dock from "./Dock";
import Window from "./Window";
import { AppContent, APP_CONFIG, getDefaultTitle } from "./apps";
import { PixelIcon } from "./PixelIcon";
import type { AppId, DesktopIcon, WindowInstance } from "./types";

const STORAGE_KEY = "nooros_windows_v1";
const ICONS_STORAGE_KEY = "nooros_icons_v1";

function makeId() {
  return Math.random().toString(16).slice(2);
}



function DesktopIconView({
  icon,
  onOpen,
  onMove,
}: {
  icon: DesktopIcon;
  onOpen: (appId: AppId) => void;
  onMove: (id: AppId, pos: { x: number; y: number }) => void;
}) {
  const nodeRef = useRef(null);

  return (
    <Draggable
      nodeRef={nodeRef}
      position={icon.position}
      onStop={(_, data) => onMove(icon.id, { x: data.x, y: data.y })}
      bounds="parent"
    >
      <div
        ref={nodeRef}
        className="absolute z-10 flex w-24 cursor-default select-none flex-col items-center gap-2 p-2 hover:bg-white/10 active:bg-white/20 transition-colors group pointer-events-auto"
        onDoubleClick={() => onOpen(icon.id)}
      >
        <div
          className="flex h-14 w-14 items-center justify-center bg-black/40 border-2 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)]"
          style={{ borderColor: `${icon.color}40` }}
        >
          <PixelIcon name={APP_CONFIG[icon.id].icon} color={icon.color} />
        </div>
        <div className="text-center text-[10px] leading-tight text-neutral-100 font-medium drop-shadow-[2px_2px_0px_rgba(0,0,0,1)] uppercase tracking-tighter">
          {icon.title}
        </div>
        {icon.subtitle && (
          <div className="-mt-1 text-center text-[11px] text-neutral-400">
            {icon.subtitle}
          </div>
        )}
      </div>
    </Draggable>
  );
}

export default function Desktop() {
  const [icons, setIcons] = useState<DesktopIcon[]>([
    { id: "about", title: APP_CONFIG.about.title, position: { x: 20, y: 20 }, color: APP_CONFIG.about.color },
    { id: "projects", title: APP_CONFIG.projects.title, position: { x: 20, y: 140 }, color: APP_CONFIG.projects.color },
    { id: "resume", title: APP_CONFIG.resume.title, position: { x: 20, y: 260 }, color: APP_CONFIG.resume.color },
    { id: "terminal", title: APP_CONFIG.terminal.title, position: { x: 140, y: 20 }, color: APP_CONFIG.terminal.color },
    { id: "music", title: APP_CONFIG.music.title, position: { x: 140, y: 140 }, color: APP_CONFIG.music.color },
    { id: "contact", title: APP_CONFIG.contact.title, position: { x: 140, y: 260 }, color: APP_CONFIG.contact.color },
  ]);

  const [windows, setWindows] = useState<WindowInstance[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load persistence
  useEffect(() => {
    const savedWindows = localStorage.getItem(STORAGE_KEY);
    const savedIcons = localStorage.getItem(ICONS_STORAGE_KEY);

    if (savedWindows) {
      try {
        setWindows(JSON.parse(savedWindows));
      } catch (e) { console.error("Failed to load windows", e); }
    }

    if (savedIcons) {
      try {
        const parsedIcons = JSON.parse(savedIcons);
        setIcons(prev => prev.map(defaultIcon => {
          const savedIcon = parsedIcons.find((s: any) => s.id === defaultIcon.id);
          return savedIcon ? { ...defaultIcon, position: savedIcon.position } : defaultIcon;
        }));
      } catch (e) { console.error("Failed to load icons", e); }
    }

    setIsLoaded(true);
  }, []);

  // Save persistence
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(windows));
      localStorage.setItem(ICONS_STORAGE_KEY, JSON.stringify(icons));
    }
  }, [windows, icons, isLoaded]);

  const topZ = useMemo(
    () => windows.reduce((m, w) => Math.max(m, w.zIndex), 10),
    [windows],
  );

  function moveIcon(id: AppId, position: { x: number; y: number }) {
    setIcons(prev => prev.map(icon => icon.id === id ? { ...icon, position } : icon));
  }

  function openApp(appId: AppId) {
    const existing = windows.find((w) => w.appId === appId);
    if (existing) {
      if (existing.isMinimized) {
        restore(existing.instanceId);
      } else {
        focus(existing.instanceId);
      }
      return;
    }

    const instanceId = `${appId}-${makeId()}`;
    const title = getDefaultTitle(appId);
    const offset = 36 * (windows.length % 6);
    const next: WindowInstance = {
      instanceId,
      appId,
      title,
      isMinimized: false,
      zIndex: topZ + 1,
      position: { x: 80 + offset, y: 80 + offset },
      size: { width: 680, height: 440 },
    };
    setWindows((prev) => [...prev, next]);
  }

  function updateWindow(instanceId: string, updates: Partial<WindowInstance>) {
    setWindows((prev) =>
      prev.map((w) => (w.instanceId === instanceId ? { ...w, ...updates } : w))
    );
  }

  function focus(instanceId: string) {
    setWindows((prev) => {
      const currentTop = prev.reduce((m, w) => Math.max(m, w.zIndex), 10);
      return prev.map((w) =>
        w.instanceId === instanceId ? { ...w, zIndex: currentTop + 1 } : w,
      );
    });
  }

  function close(instanceId: string) {
    setWindows((prev) => prev.filter((w) => w.instanceId !== instanceId));
  }

  function minimize(instanceId: string) {
    updateWindow(instanceId, { isMinimized: true });
  }

  function restore(instanceId: string) {
    const currentTop = windows.reduce((m, w) => Math.max(m, w.zIndex), 10);
    updateWindow(instanceId, { isMinimized: false, zIndex: currentTop + 1 });
  }

  if (!isLoaded) return <div className="min-h-screen bg-neutral-950" />;

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* wallpaper */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/pixel-bg.png')",
          imageRendering: "pixelated"
        }}
      />
      <div className="absolute inset-0 bg-black/20 pointer-events-none" />

      {/* desktop icons */}
      <div className="absolute inset-0 z-10 p-6 overflow-hidden pointer-events-none">
        {icons.map((icon) => (
          <DesktopIconView
            key={icon.id}
            icon={icon}
            onOpen={openApp}
            onMove={moveIcon}
          />
        ))}
      </div>

      {/* windows */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        {windows.map((w) => (
          <div key={w.instanceId} className="pointer-events-auto">
            <Window
              win={w}
              onFocus={focus}
              onClose={close}
              onMinimize={minimize}
              onResize={(size) => updateWindow(w.instanceId, { size })}
              onDrag={(position) => updateWindow(w.instanceId, { position })}
            >
              <AppContent appId={w.appId} />
            </Window>
          </div>
        ))}
      </div>

      <Dock windows={windows} onOpenApp={openApp} onRestoreWindow={restore} />
    </div>
  );
}
