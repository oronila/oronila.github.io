import { 
  FileText, 
  Folder, 
  FileUser, 
  Terminal as TerminalIcon, 
  Music as MusicIcon, 
  Globe 
} from "lucide-react";
import type { AppId, WindowInstance } from "./types";

function getAppIcon(appId: AppId) {
  switch (appId) {
    case "about":
      return <FileText className="w-5 h-5 text-blue-400" />;
    case "projects":
      return <Folder className="w-5 h-5 text-yellow-400" />;
    case "resume":
      return <FileUser className="w-5 h-5 text-green-400" />;
    case "terminal":
      return <TerminalIcon className="w-5 h-5 text-emerald-400" />;
    case "music":
      return <MusicIcon className="w-5 h-5 text-purple-400" />;
    case "contact":
      return <Globe className="w-5 h-5 text-sky-400" />;
    default:
      return <FileText className="w-5 h-5" />;
  }
}

function DockIcon({
  appId,
  label,
  active,
  onClick,
}: {
  appId: AppId;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={[
        "relative flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-200",
        "bg-white/5 hover:bg-white/10 active:bg-white/20 hover:-translate-y-1",
        "border border-white/10 group shadow-lg",
      ].join(" ")}
      aria-label={label}
    >
      {getAppIcon(appId)}
      {active && (
        <span className="absolute -bottom-1 h-1 w-1 rounded-full bg-white/70 shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
      )}
      
      {/* Tooltip */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-neutral-900 border border-white/10 text-[10px] text-white opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap">
        {label}
      </div>
    </button>
  );
}

export default function Dock({
  windows,
  onOpenApp,
  onRestoreWindow,
}: {
  windows: WindowInstance[];
  onOpenApp: (appId: AppId) => void;
  onRestoreWindow: (instanceId: string) => void;
}) {
  const running = new Map<AppId, WindowInstance[]>();
  for (const w of windows) {
    running.set(w.appId, [...(running.get(w.appId) ?? []), w]);
  }

  const dockApps: { id: AppId; label: string }[] = [
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "resume", label: "Resume" },
    { id: "terminal", label: "Terminal" },
    { id: "music", label: "Music" },
    { id: "contact", label: "Browser" },
  ];

  return (
    <div className="pointer-events-none fixed bottom-6 left-1/2 z-[9999] -translate-x-1/2">
      <div className="pointer-events-auto flex items-end gap-3 rounded-2xl border border-white/10 bg-neutral-950/40 px-4 py-3 shadow-2xl backdrop-blur-2xl">
        {dockApps.map((app) => {
          const instances = running.get(app.id) ?? [];
          const anyVisible = instances.some((w) => !w.isMinimized);
          const anyRunning = instances.length > 0;
          return (
            <DockIcon
              key={app.id}
              appId={app.id}
              label={app.label}
              active={anyRunning}
              onClick={() => {
                const minimized = instances.find((w) => w.isMinimized);
                if (minimized) return onRestoreWindow(minimized.instanceId);
                return onOpenApp(app.id);
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

