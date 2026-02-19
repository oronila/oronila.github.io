"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import Draggable from "react-draggable";
import { ContextMenu, MenuItem } from "./ContextMenu";
import Dock from "./Dock";
import Window from "./Window";
import { AppContent, APP_CONFIG, getDefaultTitle } from "./apps";
import { PixelIcon } from "./PixelIcon";
import TopBar from "./TopBar";
import type { AppId, DesktopIcon, WindowInstance } from "./types";

const STORAGE_KEY = "nooros_windows_v2";
const ICONS_STORAGE_KEY = "nooros_icons_v3";

function makeId() {
  return Math.random().toString(16).slice(2);
}



function DesktopIconView({
  icon,
  onOpen,
  onDrag,
  onContextMenu,
  selected,
  onSelect,
}: {
  icon: DesktopIcon;
  onOpen: (appId: AppId) => void;
  onDrag: (id: AppId, delta: { x: number; y: number }) => void;
  onContextMenu: (id: AppId, e: React.MouseEvent) => void;
  selected: boolean;
  onSelect: (id: AppId, multi: boolean) => void;
}) {
  const nodeRef = useRef(null);
  const isDragging = useRef(false);
  const dragDistance = useRef(0);
  const TAP_MOVEMENT_THRESHOLD = 6;

  function isMobileInteractionMode() {
    return window.matchMedia("(max-width: 767px), (hover: none) and (pointer: coarse)").matches;
  }

  return (
    <Draggable
      nodeRef={nodeRef}
      position={icon.position}
      onDrag={(_, data) => {
        const movement = Math.abs(data.deltaX) + Math.abs(data.deltaY);
        dragDistance.current += movement;
        if (dragDistance.current > TAP_MOVEMENT_THRESHOLD) {
          isDragging.current = true;
        }
        onDrag(icon.id, { x: data.deltaX, y: data.deltaY });
      }}
      onStart={(e) => {
        isDragging.current = false;
        dragDistance.current = 0;
        // If dragging an unselected item, select it exclusively
        if (!selected) {
          onSelect(icon.id, (e as MouseEvent).metaKey || (e as MouseEvent).shiftKey);
        }
      }}
      onStop={() => {
        // Mobile taps don't always emit a reliable click through Draggable.
        // Treat low-movement touch release as a single-tap "open".
        if (isMobileInteractionMode() && dragDistance.current <= TAP_MOVEMENT_THRESHOLD) {
          onOpen(icon.id);
        }

        // We need to allow the click event to fire if it wasn't a drag
        // The click event fires after onStop
        setTimeout(() => {
          isDragging.current = false;
          dragDistance.current = 0;
        }, 0);
      }}
      bounds="parent"
    >
      <div
        ref={nodeRef}
        className={`absolute z-10 flex w-20 cursor-default select-none flex-col items-center gap-2 p-2 transition-colors group pointer-events-auto ${selected ? "bg-white/20 border border-white/10" : "hover:bg-white/10 active:bg-white/20"
          }`}
        onDoubleClick={() => onOpen(icon.id)}
        onClick={(e) => {
          e.stopPropagation();
          if (isDragging.current) return;

          // Mobile open is handled in onStop for better touch reliability.
          if (isMobileInteractionMode()) {
            return;
          }

          onSelect(icon.id, e.metaKey || e.shiftKey);
        }}
        onContextMenu={(e) => onContextMenu(icon.id, e)}
      >
        <div
          className="flex h-12 w-12 items-center justify-center transition-colors hover:brightness-110 active:brightness-90"
        >
          <PixelIcon name={APP_CONFIG[icon.id].icon} color={icon.color} className="w-10 h-10" />
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

const DEFAULT_ICONS: DesktopIcon[] = [
  { id: "about", title: APP_CONFIG.about.title, position: { x: 10, y: 390 }, color: APP_CONFIG.about.color },
  { id: "projects", title: APP_CONFIG.projects.title, position: { x: 10, y: 150 }, color: APP_CONFIG.projects.color },
  { id: "resume", title: APP_CONFIG.resume.title, position: { x: 10, y: 270 }, color: APP_CONFIG.resume.color },
  { id: "terminal", title: APP_CONFIG.terminal.title, position: { x: 130, y: 30 }, color: APP_CONFIG.terminal.color },
  { id: "music", title: APP_CONFIG.music.title, position: { x: 130, y: 150 }, color: APP_CONFIG.music.color },
  { id: "contact", title: APP_CONFIG.contact.title, position: { x: 130, y: 270 }, color: APP_CONFIG.contact.color },
  { id: "games", title: APP_CONFIG.games.title, position: { x: 130, y: 390 }, color: APP_CONFIG.games.color },
  { id: "trash", title: APP_CONFIG.trash.title, position: { x: 10, y: 30 }, color: APP_CONFIG.trash.color },
];

import ErrorPopup from "./ErrorPopup";

export default function Desktop() {
  const WALLPAPERS = [
    "/pixel-bg2.png",
    "/pixel-background.gif",
  ];
  const [wallpaperIndex, setWallpaperIndex] = useState(0);

  const [icons, setIcons] = useState<DesktopIcon[]>(DEFAULT_ICONS);
  const [errorPopup, setErrorPopup] = useState<string | null>(null);

  const [windows, setWindows] = useState<WindowInstance[]>([]);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; items: MenuItem[]; direction?: 'up' | 'down' } | null>(null);
  const [selectedIds, setSelectedIds] = useState<AppId[]>([]);
  const [selectionBox, setSelectionBox] = useState<{ start: { x: number; y: number }; current: { x: number; y: number } } | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Ref to access current windows in callbacks (like context menu) without stale closures
  const windowsRef = useRef(windows);
  windowsRef.current = windows;

  // Load persistence
  useEffect(() => {
    const savedWindows = localStorage.getItem(STORAGE_KEY);
    const savedIcons = localStorage.getItem(ICONS_STORAGE_KEY);
    const savedWallpaper = localStorage.getItem("nooros_wallpaper_index");

    if (savedWindows) {
      try {
        setWindows(JSON.parse(savedWindows));
      } catch (e) { console.error("Failed to load windows", e); }
    }

    if (savedIcons) {
      try {
        const parsedIcons = JSON.parse(savedIcons) as DesktopIcon[];
        setIcons(prev => prev.map(defaultIcon => {
          const savedIcon = parsedIcons.find((s) => s.id === defaultIcon.id);
          return savedIcon ? { ...defaultIcon, position: savedIcon.position } : defaultIcon;
        }));
      } catch (e) { console.error("Failed to load icons", e); }
    }

    if (savedWallpaper) {
      const idx = parseInt(savedWallpaper, 10);
      if (!isNaN(idx)) {
        setWallpaperIndex(idx);
      }
    }

    setIsLoaded(true);
  }, []);

  // Save persistence
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(windows));
      localStorage.setItem(ICONS_STORAGE_KEY, JSON.stringify(icons));
      localStorage.setItem("nooros_wallpaper_index", wallpaperIndex.toString());
    }
  }, [windows, icons, isLoaded, wallpaperIndex]);

  const topZ = useMemo(
    () => windows.reduce((m, w) => Math.max(m, w.zIndex), 10),
    [windows],
  );

  const MAXIMIZED_Z = 10000;

  function openApp(appId: AppId) {
    const currentWindows = windowsRef.current;
    const existing = currentWindows.find((w) => w.appId === appId);
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
    const offset = 36 * (currentWindows.length % 6);
    const isMobile = window.innerWidth < 768;

    // Correcting size/position logic based on previous state
    const size = isMobile
      ? { width: window.innerWidth, height: window.innerHeight - 48 }
      : { width: 680, height: 440 };

    const initialPos = isMobile
      ? { x: 0, y: 24 } // Start below topbar
      : { x: 40 + offset, y: 40 + offset }; // Tighter spawn for desktop

    const next: WindowInstance = {
      instanceId,
      appId,
      title,
      isMinimized: false,
      isMaximized: isMobile,
      zIndex: topZ + 1,
      position: initialPos,
      size: size,
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
        w.instanceId === instanceId
          ? { ...w, zIndex: w.isMaximized ? MAXIMIZED_Z : currentTop + 1 }
          : w,
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
    const currentWindows = windowsRef.current;
    const currentTop = currentWindows.reduce((m, w) => Math.max(m, w.zIndex), 10);
    updateWindow(instanceId, { isMinimized: false, zIndex: currentTop + 1 });
  }

  function maximize(instanceId: string) {
    const currentWindows = windowsRef.current;
    const win = currentWindows.find((w) => w.instanceId === instanceId);
    if (!win) return;

    if (win.isMaximized) {
      // Restore
      const currentTop = currentWindows.reduce((m, w) => Math.max(m, w.zIndex), 10);
      updateWindow(instanceId, {
        isMaximized: false,
        zIndex: currentTop + 1,
        ...(win.restoreState ? {
          position: win.restoreState.position,
          size: win.restoreState.size,
        } : {}),
        restoreState: undefined,
      });
    } else {
      // Maximize
      updateWindow(instanceId, {
        isMaximized: true,
        zIndex: MAXIMIZED_Z,
        restoreState: {
          position: win.position,
          size: win.size,
        },
        position: { x: 0, y: 0 },
        size: { width: window.innerWidth, height: window.innerHeight },
      });
    }
  }

  function handleIconDrag(id: AppId, delta: { x: number; y: number }) {
    setIcons((prev) => prev.map((icon) => {
      // If the dragged icon is selected, move all selected icons
      // If the dragged icon is NOT selected (should rely on onStart to select it),
      // effectively we just move those that are selected.
      // Since onStart runs before onDrag, we can trust selectedIds.

      const isSelected = selectedIds.includes(icon.id);
      const isDragged = icon.id === id;

      // If we are dragging a selected item, move all selected items
      if (selectedIds.includes(id) && isSelected) {
        return {
          ...icon,
          position: { x: icon.position.x + delta.x, y: icon.position.y + delta.y }
        };
      }

      // Fallback: if somehow dragging unselected (shouldn't happen with onStart logic), just move it
      if (isDragged) {
        return {
          ...icon,
          position: { x: icon.position.x + delta.x, y: icon.position.y + delta.y }
        };
      }

      return icon;
    }));
  }

  function handleContextMenu(e: React.MouseEvent) {
    e.preventDefault();
    if (selectionBox) return; // Don't show menu if dragging selection
    setContextMenu({ x: e.clientX, y: e.clientY, items: BACKGROUND_MENU_ITEMS });
  }

  function handleIconContextMenu(id: AppId, e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation(); // Stop background menu

    // Select if not already selected
    if (!selectedIds.includes(id)) {
      setSelectedIds([id]);
    }

    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      items: [
        { label: "Open", action: () => openApp(id) },
        { label: "Get Info", action: () => console.log("Get Info", id) },
        { separator: true },
        { label: "Delete", action: () => console.log("Delete", id), disabled: true },
      ]
    });
  }

  function handleIconSelect(id: AppId, multi: boolean) {
    if (multi) {
      setSelectedIds((prev) =>
        prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
      );
    } else {
      setSelectedIds([id]);
    }
  }

  function handleMouseDown(e: React.MouseEvent) {
    // Ignore right-clicks (context menu)
    if (e.button === 2) return;

    // Only start selection on background click
    if ((e.target as HTMLElement).closest(".pointer-events-auto")) return;

    setContextMenu(null);
    setSelectedIds([]); // Clear selection on background click
    setSelectionBox({
      start: { x: e.clientX, y: e.clientY },
      current: { x: e.clientX, y: e.clientY },
    });
  }

  function handleMouseMove(e: React.MouseEvent) {
    if (!selectionBox) return;

    const current = { x: e.clientX, y: e.clientY };
    setSelectionBox({ ...selectionBox, current });

    // Calculate selection intersection
    const left = Math.min(selectionBox.start.x, current.x);
    const top = Math.min(selectionBox.start.y, current.y);
    const width = Math.abs(current.x - selectionBox.start.x);
    const height = Math.abs(current.y - selectionBox.start.y);

    const nextSelected: AppId[] = [];

    // Check each icon
    // Note: This relies on icons state having positions. 
    // We assume icon size is roughly 80x80 (w-20 is 5rem = 80px)
    icons.forEach((icon) => {
      const iconRight = icon.position.x + 80;
      const iconBottom = icon.position.y + 80;

      // Simple AABB intersection
      const intersects =
        icon.position.x < left + width &&
        iconRight > left &&
        icon.position.y < top + height &&
        iconBottom > top;

      if (intersects) {
        nextSelected.push(icon.id);
      }
    });

    setSelectedIds(nextSelected);
  }

  function handleMouseUp() {
    if (selectionBox) {
      setSelectionBox(null);
    }
  }

  function handleDockContextMenu(id: AppId, e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      items: [
        { label: "Open", action: () => openApp(id) },
        { separator: true },
        { label: "Keep in Dock", disabled: true }, // Already in dock logic
      ],
      direction: 'up',
    });
  }



  function handleReset() {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem("nooros_browser_state");
    localStorage.removeItem("nooros_wallpaper_index");
    // Force overwrite icons with defaults to ensure next load picks them up
    localStorage.setItem(ICONS_STORAGE_KEY, JSON.stringify(DEFAULT_ICONS));
    window.location.reload();
  }

  const BACKGROUND_MENU_ITEMS: MenuItem[] = [
    { label: "Get Info", action: () => console.log("Get Info") },
    { separator: true },
    {
      label: "Change Wallpaper",
      action: () => setWallpaperIndex(prev => (prev + 1) % WALLPAPERS.length)
    },
    { label: "Clean Up", action: () => console.log("Clean Up"), disabled: true },
    { separator: true },
    {
      label: "Reset",
      action: handleReset
    },
  ];

  if (!isLoaded) return <div className="min-h-screen bg-neutral-950" />;

  return (
    <div
      className="relative min-h-screen overflow-hidden select-none"
      onContextMenu={handleContextMenu}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <TopBar onOpenApp={openApp} onRestart={handleReset} />

      {/* Wallpapers with Cross-fade */}
      {WALLPAPERS.map((src, index) => {
        // Special positioning for pixel-bg2 to center character on mobile
        // We assume "offset to the right" means showing more of the left side, so we shift focus left (35%)
        const isPixelBg2 = src.includes('pixel-bg2');
        const bgPositionClass = isPixelBg2 ? 'bg-[35%_center] md:bg-center' : 'bg-center';

        return (
          <div
            key={src}
            className={`absolute inset-0 bg-cover bg-no-repeat transition-opacity duration-1000 ease-in-out ${bgPositionClass}`}
            style={{
              backgroundImage: `url('${src}')`,
              imageRendering: "pixelated",
              opacity: index === wallpaperIndex ? 1 : 0,
              zIndex: 0,
            }}
          />
        );
      })}

      <div className="absolute inset-0 bg-black/20 pointer-events-none z-[1]" />

      {/* Error Popup */}
      {errorPopup && (
        <ErrorPopup
          message={errorPopup}
          onClose={() => setErrorPopup(null)}
        />
      )}

      {/* Desktop Icons */}
      <div className="absolute inset-0 z-10 p-6 overflow-hidden pointer-events-none">
        {icons.map((icon) => (
          <DesktopIconView
            key={icon.id}
            icon={icon}
            onOpen={openApp}
            onDrag={handleIconDrag}
            onContextMenu={handleIconContextMenu}
            selected={selectedIds.includes(icon.id)}
            onSelect={handleIconSelect}
          />
        ))}
      </div>



      {/* Windows */}
      <div className="absolute inset-0 pointer-events-none">
        {windows.map((win) => (
          <div key={win.instanceId} className="pointer-events-auto">
            <Window
              win={win}
              onFocus={focus}
              onClose={close}
              onMinimize={minimize}
              onMaximize={maximize}
              onResize={(updates) => updateWindow(win.instanceId, { ...updates, isMaximized: false })}
              onDrag={(position) => updateWindow(win.instanceId, { position, isMaximized: false })}
            >
              <div className="h-full w-full overflow-auto" onMouseDown={(e) => e.stopPropagation()}>
                <AppContent
                  appId={win.appId}
                  onError={(msg) => setErrorPopup(msg)}
                  onOpenApp={openApp}
                />
              </div>
            </Window>
          </div>
        ))}
      </div>

      <Dock
        windows={windows}
        onOpenApp={openApp}
        onRestoreWindow={restore}
        onContextMenu={handleDockContextMenu}
      />

      {contextMenu && (
        <ContextMenu
          position={contextMenu}
          onClose={() => setContextMenu(null)}
          items={contextMenu.items}
          direction={contextMenu.direction}
        />
      )}

      {/* Selection Box */}
      {selectionBox && (
        <div
          className="absolute z-50 border border-white/30 bg-white/10 pointer-events-none"
          style={{
            left: Math.min(selectionBox.start.x, selectionBox.current.x),
            top: Math.min(selectionBox.start.y, selectionBox.current.y),
            width: Math.abs(selectionBox.current.x - selectionBox.start.x),
            height: Math.abs(selectionBox.current.y - selectionBox.start.y),
          }}
        />
      )}
    </div>
  );
}
