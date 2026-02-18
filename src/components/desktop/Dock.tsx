import { APP_CONFIG } from "./apps";
import { PixelIcon } from "./PixelIcon";
import type { AppId, WindowInstance } from "./types";


function DockIcon({
  appId,
  label,
  active,
  onClick,
  color,
  onContextMenu,
}: {
  appId: AppId;
  label: string;
  active: boolean;
  onClick: () => void;
  color: string;
  onContextMenu?: (e: React.MouseEvent) => void;
}) {
  return (
    <button
      onClick={onClick}
      onContextMenu={onContextMenu}
      className={`group relative flex h-12 w-12 cursor-pointer items-center justify-center transition-all hover:-translate-y-1 hover:brightness-110 active:translate-y-0 active:brightness-90`}
      aria-label={label}
    >
      <PixelIcon name={APP_CONFIG[appId].icon} color={color} className="w-10 h-10" />
      {active && (
        <span className="absolute -bottom-1.5 h-1 w-3 bg-white/70 shadow-[0_0_4px_rgba(255,255,255,0.5)]" />
      )}

      {/* Tooltip */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-black border-2 border-white/20 text-[8px] text-white opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap uppercase tracking-tighter">
        {label}
      </div>
    </button>
  );
}

export default function Dock({
  windows,
  onOpenApp,
  onRestoreWindow,
  onContextMenu,
}: {
  windows: WindowInstance[];
  onOpenApp: (appId: AppId) => void;
  onRestoreWindow: (instanceId: string) => void;
  onContextMenu: (appId: AppId, e: React.MouseEvent) => void;
}) {
  const running = new Map<AppId, WindowInstance[]>();
  for (const w of windows) {
    running.set(w.appId, [...(running.get(w.appId) ?? []), w]);
  }

  const dockAppIds: AppId[] = [
    "about",
    "projects",
    "resume",
    "terminal",
    "music",
    "contact",
    "trash",
  ];

  return (
    <div className="hidden md:flex pointer-events-none fixed bottom-6 left-1/2 z-[9999] -translate-x-1/2">
      <div className="pointer-events-auto flex items-end gap-2 border-4 border-black bg-neutral-900/60 p-2 shadow-2xl">
        {dockAppIds.map((id) => {
          const app = APP_CONFIG[id];
          const instances = running.get(id) ?? [];
          const anyRunning = instances.length > 0;
          return (
            <DockIcon
              key={id}
              appId={id}
              label={app.title}
              active={anyRunning}
              color={app.color}
              onClick={() => {
                const minimized = instances.find((w) => w.isMinimized);
                if (minimized) return onRestoreWindow(minimized.instanceId);
                return onOpenApp(id);
              }}
              onContextMenu={(e: React.MouseEvent) => onContextMenu(id, e)}
            />
          );
        })}
      </div>
    </div>
  );
}

