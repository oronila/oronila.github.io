"use client";

import { useMemo, useState, useEffect } from "react";
import { 
  FileText, 
  Folder, 
  FileUser, 
  Terminal as TerminalIcon, 
  Music as MusicIcon, 
  Globe 
} from "lucide-react";
import Dock from "./Dock";
import Window from "./Window";
import { AppContent, getDefaultTitle } from "./apps";
import type { AppId, DesktopIcon, WindowInstance } from "./types";

const STORAGE_KEY = "nooros_windows_v1";

function makeId() {
  return Math.random().toString(16).slice(2);
}

function getAppIcon(appId: AppId) {
  switch (appId) {
    case "about":
      return <FileText className="w-6 h-6 text-blue-400" />;
    case "projects":
      return <Folder className="w-6 h-6 text-yellow-400" />;
    case "resume":
      return <FileUser className="w-6 h-6 text-green-400" />;
    case "terminal":
      return <TerminalIcon className="w-6 h-6 text-emerald-400" />;
    case "music":
      return <MusicIcon className="w-6 h-6 text-purple-400" />;
    case "contact":
      return <Globe className="w-6 h-6 text-sky-400" />;
    default:
      return <FileText className="w-6 h-6" />;
  }
}

function DesktopIconView({
  icon,
  onOpen,
}: {
  icon: DesktopIcon;
  onOpen: (appId: AppId) => void;
}) {
  return (
    <button
      onDoubleClick={() => onOpen(icon.id)}
      className="group flex w-24 flex-col items-center gap-2 rounded-xl p-2 hover:bg-white/5 active:bg-white/10 transition-colors"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md group-hover:scale-105 transition-transform duration-200">
        {getAppIcon(icon.id)}
      </div>
      <div className="text-center text-[12px] leading-tight text-neutral-100 font-medium drop-shadow-sm">
        {icon.title}
      </div>
      {icon.subtitle && (
        <div className="-mt-1 text-center text-[11px] text-neutral-400">
          {icon.subtitle}
        </div>
      )}
    </button>
  );
}

export default function Desktop() {
  const icons: DesktopIcon[] = useMemo(
    () => [
      { id: "about", title: "About.txt" },
      { id: "projects", title: "Projects" },
      { id: "resume", title: "Resume.pdf" },
      { id: "terminal", title: "Terminal" },
      { id: "music", title: "Music" },
      { id: "contact", title: "Browser" },
    ],
    [],
  );

  const [windows, setWindows] = useState<WindowInstance[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load persistence
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setWindows(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load windows", e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save persistence
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(windows));
    }
  }, [windows, isLoaded]);

  const topZ = useMemo(
    () => windows.reduce((m, w) => Math.max(m, w.zIndex), 10),
    [windows],
  );

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
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_800px_at_20%_10%,rgba(255,255,255,0.12),transparent_60%),radial-gradient(900px_600px_at_80%_40%,rgba(56,189,248,0.16),transparent_60%),radial-gradient(1000px_700px_at_40%_90%,rgba(168,85,247,0.14),transparent_60%)]" />
      <div className="absolute inset-0 bg-neutral-950" style={{ opacity: 0.72 }} />

      {/* desktop icons */}
      <div className="relative z-10 p-6">
        <div className="grid w-fit grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3">
          {icons.map((icon) => (
            <DesktopIconView key={icon.id} icon={icon} onOpen={openApp} />
          ))}
        </div>
      </div>

      {/* windows */}
      <div className="relative z-20">
        {windows.map((w) => (
          <Window
            key={w.instanceId}
            win={w}
            onFocus={focus}
            onClose={close}
            onMinimize={minimize}
            onResize={(size) => updateWindow(w.instanceId, { size })}
            onDrag={(position) => updateWindow(w.instanceId, { position })}
          >
            <AppContent appId={w.appId} />
          </Window>
        ))}
      </div>

      <Dock windows={windows} onOpenApp={openApp} onRestoreWindow={restore} />
    </div>
  );
}