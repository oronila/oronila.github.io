import { APP_CONFIG } from "./apps";
import { PixelIcon } from "./PixelIcon";
import type { AppId, WindowInstance } from "./types";


function DockIcon({
  appId,
  label,
  active,
  onClick,
  color,
}: {
  appId: AppId;
  label: string;
  active: boolean;
  onClick: () => void;
  color: string;
}) {
  return (
    <button
      onClick={onClick}
      className={[
        "relative flex h-12 w-12 items-center justify-center transition-all duration-100",
        "bg-black/40 hover:bg-black/60 active:bg-black/80 hover:-translate-y-1",
        "border-2 border-white/20 group shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)]",
      ].join(" ")}
      style={{ borderColor: `${color}40` }}
      aria-label={label}
    >
      <PixelIcon name={APP_CONFIG[appId].icon} color={color} size={24} className="" />
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
}: {
  windows: WindowInstance[];
  onOpenApp: (appId: AppId) => void;
  onRestoreWindow: (instanceId: string) => void;
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
  ];

  return (
    <div className="pointer-events-none fixed bottom-6 left-1/2 z-[9999] -translate-x-1/2">
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
            />
          );
        })}
      </div>
    </div>
  );
}

