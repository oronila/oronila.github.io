import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import { PixelIcon } from "./PixelIcon";
import { FileSystemItem } from "./fileSystem";
import type { AppId } from "./types";

export default function FileExplorer({
    initialData,
    onError,
    onOpenApp,
    title = "File Explorer",
}: {
    initialData: FileSystemItem[];
    onError?: (message: string) => void;
    onOpenApp?: (id: AppId) => void;
    title?: string;
}) {
    const [currentPath, setCurrentPath] = useState<FileSystemItem[]>([]);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [selectionBox, setSelectionBox] = useState<{ start: { x: number; y: number }; current: { x: number; y: number } } | null>(null);
    const [contextMenu, setContextMenu] = useState<{ x: number; y: number; type: "item" | "background"; itemId?: string } | null>(null);
    const [mounted, setMounted] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);

    // Determine current items to display
    const currentFolder = currentPath.length > 0 ? currentPath[currentPath.length - 1] : null;
    const items = currentFolder ? currentFolder.children || [] : initialData;

    useEffect(() => {
        setMounted(true);
        const handleClickOutside = () => setContextMenu(null);
        window.addEventListener("click", handleClickOutside);
        return () => window.removeEventListener("click", handleClickOutside);
    }, []);

    const handleNavigate = (item: FileSystemItem) => {
        if (item.type === "folder") {
            setCurrentPath([...currentPath, item]);
            setSelectedIds([]);
        } else {
            if (item.name === "Install.bat" && onError && item.content) {
                onError(item.content);
                return;
            }
            if (item.id === "youtube_link" && onOpenApp) {
                onOpenApp("youtube");
                return;
            }
            if (item.id === "rank_image" && onOpenApp) {
                onOpenApp("image_viewer");
                return;
            }
            alert(`Opening ${item.name}: ${item.content}`);
        }
    };

    const handleBack = () => {
        setCurrentPath(prev => prev.slice(0, -1));
        setSelectedIds([]);
    };

    const containerRectRef = useRef<DOMRect | null>(null);

    const handleMouseDown = (e: React.MouseEvent) => {
        if (e.target !== containerRef.current && e.target === e.currentTarget) {
            // Clicked on background
            if (!e.shiftKey && !e.metaKey && !e.ctrlKey) {
                setSelectedIds([]);
            }
            const rect = containerRef.current?.getBoundingClientRect();
            if (rect) {
                containerRectRef.current = rect;
                setSelectionBox({
                    start: { x: e.clientX - rect.left, y: e.clientY - rect.top },
                    current: { x: e.clientX - rect.left, y: e.clientY - rect.top },
                });
            }
        }
        setContextMenu(null);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (selectionBox && containerRef.current && containerRectRef.current) {
            const rect = containerRectRef.current;
            setSelectionBox(prev => prev ? {
                ...prev,
                current: { x: e.clientX - rect.left, y: e.clientY - rect.top },
            } : null);
        }
    };

    const handleMouseUp = () => {
        if (selectionBox && containerRef.current) {
            // Calculate selection
            // We can check rect again here for safety, or use the ref
            const rect = containerRef.current.getBoundingClientRect();
            const left = Math.min(selectionBox.start.x, selectionBox.current.x);
            const top = Math.min(selectionBox.start.y, selectionBox.current.y);
            const width = Math.abs(selectionBox.current.x - selectionBox.start.x);
            const height = Math.abs(selectionBox.current.y - selectionBox.start.y);

            const newSelectedIds = [...selectedIds];

            items.forEach(item => {
                const itemEl = document.getElementById(`file-item-${item.id}`);
                if (itemEl) {
                    const itemRect = itemEl.getBoundingClientRect();
                    const itemLeft = itemRect.left - rect.left;
                    const itemTop = itemRect.top - rect.top;

                    // Simple intersection check
                    if (
                        left < itemLeft + itemRect.width &&
                        left + width > itemLeft &&
                        top < itemTop + itemRect.height &&
                        top + height > itemTop
                    ) {
                        if (!newSelectedIds.includes(item.id)) {
                            newSelectedIds.push(item.id);
                        }
                    }
                }
            });
            setSelectedIds(newSelectedIds);
        }
        setSelectionBox(null);
        containerRectRef.current = null;
    };

    const handleContextMenu = (e: React.MouseEvent, type: "item" | "background", itemId?: string) => {
        e.preventDefault();
        e.stopPropagation();
        setContextMenu({
            x: e.clientX,
            y: e.clientY,
            type,
            itemId
        });
        if (type === "item" && itemId && !selectedIds.includes(itemId)) {
            setSelectedIds([itemId]);
        }
    };

    const contextMenuContent = contextMenu ? (
        <div
            className="fixed z-[9999] w-40 bg-[#c0c0c0] border-2 border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)] flex flex-col py-1 font-pixel"
            style={{ left: contextMenu.x, top: contextMenu.y }}
            onClick={(e) => e.stopPropagation()}
        >
            {contextMenu.type === "item" ? (
                <>
                    <button className="px-4 py-1 text-left hover:bg-[#000080] hover:text-white text-black text-xs" onClick={() => {
                        const item = items.find(i => i.id === contextMenu.itemId);
                        if (item) handleNavigate(item);
                        setContextMenu(null);
                    }}>
                        Open
                    </button>
                    <button className="px-4 py-1 text-left hover:bg-[#000080] hover:text-white text-black text-xs">
                        Get Info
                    </button>
                    <div className="h-[1px] bg-gray-500 my-1 mx-1" />
                    <button className="px-4 py-1 text-left hover:bg-[#000080] hover:text-white text-black text-xs">
                        Move to Trash
                    </button>
                </>
            ) : (
                <>
                    <button className="px-4 py-1 text-left hover:bg-[#000080] hover:text-white text-black text-xs">
                        Get Info
                    </button>
                    <button className="px-4 py-1 text-left hover:bg-[#000080] hover:text-white text-black text-xs">
                        Customize View
                    </button>
                </>
            )}
        </div>
    ) : null;

    return (
        <div className="flex flex-col h-full w-full bg-[#1e1e1e] text-neutral-200 font-pixel select-none">
            {/* Toolbar */}
            <div className="flex items-center gap-2 p-2 border-b border-neutral-700 bg-[#2d2d2d]">
                <button
                    onClick={handleBack}
                    disabled={currentPath.length === 0}
                    className="p-1 hover:bg-white/10 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                >
                    <div className="w-4 h-4 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                        </svg>
                    </div>
                </button>
                <div className="text-xs text-neutral-400">
                    {currentPath.length === 0 ? title : currentPath.map(p => p.name).join(" / ")}
                </div>
            </div>

            {/* Grid View Area */}
            <div
                ref={containerRef}
                className="flex-1 p-4 overflow-y-auto relative"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onContextMenu={(e) => handleContextMenu(e, "background")}
            >
                {/* Selection Box */}
                {selectionBox && (
                    <div
                        className="absolute border border-white/40 bg-white/10 z-20 pointer-events-none"
                        style={{
                            left: Math.min(selectionBox.start.x, selectionBox.current.x),
                            top: Math.min(selectionBox.start.y, selectionBox.current.y),
                            width: Math.abs(selectionBox.current.x - selectionBox.start.x),
                            height: Math.abs(selectionBox.current.y - selectionBox.start.y),
                        }}
                    />
                )}

                {items.length === 0 ? (
                    <div className="flex items-center justify-center h-full text-neutral-500 text-xs pointer-events-none">
                        Empty folder
                    </div>
                ) : (
                    <div className="grid grid-cols-[repeat(auto-fill,minmax(80px,1fr))] gap-4 pointer-events-none">
                        {items.map((item) => (
                            <div
                                key={item.id}
                                id={`file-item-${item.id}`}
                                className={`flex flex-col items-center gap-2 p-2 pointer-events-auto cursor-pointer group border border-transparent ${selectedIds.includes(item.id) ? 'bg-white/20 border-white/20' : 'hover:bg-white/5'}`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (e.metaKey || e.ctrlKey) {
                                        setSelectedIds(prev => prev.includes(item.id) ? prev.filter(id => id !== item.id) : [...prev, item.id]);
                                    } else {
                                        setSelectedIds([item.id]);
                                    }
                                }}
                                onDoubleClick={(e) => {
                                    e.stopPropagation();
                                    handleNavigate(item);
                                }}
                                onContextMenu={(e) => handleContextMenu(e, "item", item.id)}
                            >
                                <div className="w-10 h-10 flex items-center justify-center pointer-events-none">
                                    <PixelIcon
                                        name={item.icon || (item.type === "folder" ? "/icons/pack/folder.svg" : "/icons/pixel/file.svg")}
                                        color={item.type === "folder" ? "#fbbf24" : "#94a3b8"}
                                        size={32}
                                    />
                                </div>
                                <div className={`text-[9px] text-center leading-tight break-words w-full line-clamp-2 ${selectedIds.includes(item.id) ? 'text-white' : 'text-neutral-300 group-hover:text-white'}`}>
                                    {item.name}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Context Menu Portal */}
                {mounted && contextMenu && ReactDOM.createPortal(contextMenuContent, document.body)}
            </div>
        </div>
    );
}
