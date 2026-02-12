"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import Draggable from "react-draggable";
import { ContextMenu, MenuItem } from "./ContextMenu";
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

  return (
    <Draggable
      nodeRef={nodeRef}
      position={icon.position}
      onDrag={(_, data) => onDrag(icon.id, { x: data.deltaX, y: data.deltaY })}
      onStart={(e) => {
        // If dragging an unselected item, select it exclusively
        if (!selected) {
          onSelect(icon.id, (e as MouseEvent).metaKey || (e as MouseEvent).shiftKey);
        }
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
          onSelect(icon.id, e.metaKey || e.shiftKey);
        }}
        onContextMenu={(e) => onContextMenu(icon.id, e)}
      >
        <div
          className="flex h-12 w-12 items-center justify-center bg-black/40 border-2 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)]"
          style={{ borderColor: `${icon.color}40` }}
        >
          <PixelIcon name={APP_CONFIG[icon.id].icon} color={icon.color} className="w-7 h-7" />
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
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; items: MenuItem[]; direction?: 'up' | 'down' } | null>(null);
  const [selectedIds, setSelectedIds] = useState<AppId[]>([]);
  const [selectionBox, setSelectionBox] = useState<{ start: { x: number; y: number }; current: { x: number; y: number } } | null>(null);
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

  function maximize(instanceId: string) {
    const win = windows.find((w) => w.instanceId === instanceId);
    if (!win) return;

    if (win.isMaximized) {
      // Restore
      updateWindow(instanceId, {
        isMaximized: false,
        ...(win.restoreState ? {
          position: win.restoreState.position,
          size: win.restoreState.size,
        } : {}),
        restoreState: undefined,
      });
    } else {
      // Maximize
      const dockHeight = 96; // Approximate dock height + margins

      const maxWidth = window.innerWidth;
      const maxHeight = window.innerHeight - dockHeight;

      updateWindow(instanceId, {
        isMaximized: true,
        restoreState: {
          position: win.position,
          size: win.size,
        },
        position: { x: 0, y: 0 },
        size: { width: maxWidth, height: maxHeight },
      });
    }
    focus(instanceId);
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

  const BACKGROUND_MENU_ITEMS: MenuItem[] = [
    { label: "New Folder", action: () => console.log("New Folder") },
    { label: "Get Info", action: () => console.log("Get Info") },
    { separator: true },
    { label: "Change Wallpaper", action: () => console.log("Change Wallpaper") },
    { label: "Clean Up", action: () => console.log("Clean Up"), disabled: true },
    { separator: true },
    { label: "Refresh", action: () => window.location.reload() },
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
            onDrag={handleIconDrag}
            onContextMenu={handleIconContextMenu}
            selected={selectedIds.includes(icon.id)}
            onSelect={handleIconSelect}
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
              onMaximize={maximize}
              onResize={(size) => updateWindow(w.instanceId, { size, isMaximized: false })}
              onDrag={(position) => updateWindow(w.instanceId, { position, isMaximized: false })}
            >
              <AppContent appId={w.appId} />
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
