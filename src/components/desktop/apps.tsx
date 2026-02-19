import type { AppId } from "./types";
import TerminalApp from "./TerminalApp";
import FileExplorer from "./FileExplorer";
import BrowserApp from "./BrowserApp";
import { TRASH_DATA, PROJECTS_DATA } from "./fileSystem";

export const APP_CONFIG: Record<AppId, { title: string; icon: string; color: string }> = {
  about: { title: "About Me", icon: "/icons/pack/svgs-small/Google Docs.svg", color: "#38bdf8" },
  projects: { title: "Projects", icon: "/icons/pack/folder.svg", color: "#fbbf24" },
  resume: { title: "Resume", icon: "/icons/pack/svgs-small/LinkedIn.svg", color: "#34d399" },
  terminal: { title: "Terminal", icon: "/icons/pixel/terminal.svg", color: "#000000" },
  music: { title: "Music", icon: "/icons/pack/svgs-small/Spotify.svg", color: "#a78bfa" },
  contact: { title: "Browser", icon: "/icons/pack/svgs-small/Google Chrome.svg", color: "#22d3ee" },
  trash: { title: "Trash", icon: "/icons/pixel/trash.svg", color: "#000000" },
  games: { title: "Games", icon: "/icons/pack/svgs-small/Steam.svg", color: "#171a21" },
  youtube: { title: "Oronila Youtube", icon: "/icons/pack/svgs-small/Youtube.svg", color: "#ff0000" },
  system: { title: "About Noor's Mac", icon: "cog", color: "#6b7280" },
  image_viewer: { title: "Image Viewer", icon: "/icons/pixel/file.svg", color: "#a78bfa" },
  game_slope: { title: "Slope", icon: "/icons/pack/svgs-small/Steam.svg", color: "#22c55e" },
};

function AppFrame({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="h-full w-full p-4">
      <div className="text-sm text-neutral-400">{title}</div>
      <div className="mt-3 text-sm leading-relaxed text-neutral-100">{children}</div>
    </div>
  );
}

function SystemInfo() {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-[#1e1e1e] text-neutral-200 font-pixel p-8 select-none">
      <div className="text-xl mb-4 text-center leading-relaxed">MacBook Pro</div>
      <div className="text-[10px] text-neutral-500 mb-8">16-inch, Nov 2024</div>

      <div className="grid grid-cols-[1fr_2fr] gap-x-4 gap-y-2 text-[10px] w-full max-w-[300px]">
        <div className="text-right text-neutral-400">Chip</div>
        <div>Apple M4 Pro</div>

        <div className="text-right text-neutral-400">Memory</div>
        <div>48 GB</div>

        <div className="text-right text-neutral-400">macOS</div>
        <div>Tahoe 26.4</div>
      </div>
    </div>
  );
}

export function getDefaultTitle(appId: AppId) {
  switch (appId) {
    case "about":
      return "About Me";
    case "projects":
      return "Projects";
    case "resume":
      return "Resume";
    case "terminal":
      return "Terminal";
    case "music":
      return "Music";
    case "contact":
      return "Browser";
    case "trash":
      return "Trash";
    case "games":
      return "Games Library";
    case "youtube":
      return "Oronila Youtube";
    case "system":
      return "About Noor's Mac";
    case "image_viewer":
      return "Image Viewer";
    case "game_slope":
      return "Slope";
    default:
      return "App";
  }
}

export function AppContent({
  appId,
  onError,
  onOpenApp,
}: {
  appId: AppId;
  onError?: (message: string) => void;
  onOpenApp?: (id: AppId) => void;
}) {
  switch (appId) {
    case "about":
      return (
        <textarea
          className="h-full w-full resize-none bg-transparent p-4 text-sm text-neutral-200 outline-none font-pixel leading-relaxed selection:bg-white/20"
          defaultValue={`Noor Ali

probably building something new.

projects at github.

i used to work on fynopsis.ai and trynebula.ai.

always happy to chat — reach me by email.`}
        />
      );
    case "projects":
      return <FileExplorer initialData={PROJECTS_DATA} onError={onError} onOpenApp={onOpenApp} />;
    case "resume":
      return (
        <div className="h-full w-full">
          <iframe
            title="Resume"
            src="/files/Noor_Ali_Resume.pdf"
            className="h-full w-full"
          />
        </div>
      );


    case "terminal":
      return <TerminalApp />;
    case "music":
      return (
        <div className="h-full w-full bg-black flex items-center justify-center p-4">
          <iframe
            style={{ borderRadius: "12px" }}
            src="https://open.spotify.com/embed/playlist/37i9dQZF1EQqkOPvHGajmW?utm_source=generator"
            width="100%"
            height="100%"
            frameBorder="0"
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            title="Spotify"
          />
        </div>
      );
    case "contact":
      return <BrowserApp />;
    case "trash":
      return <FileExplorer initialData={TRASH_DATA} onError={onError} onOpenApp={onOpenApp} />;
    case "games":
      return (
        <div className="h-full w-full bg-[#1e1e1e] p-4 text-neutral-200 font-pixel">
          <div className="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-4">
            <button
              className="flex flex-col items-center gap-2 p-4 hover:bg-white/10 rounded transition-colors group"
              onClick={() => onOpenApp?.("game_slope")}
            >
              <div className="w-12 h-12 bg-green-500 rounded flex items-center justify-center text-black font-bold text-xl group-hover:scale-110 transition-transform">
                S
              </div>
              <div className="text-xs">Slope</div>
            </button>
            {/* Future games can be added here */}
          </div>
        </div>
      );
    case "youtube":
      return (
        <div className="h-full w-full bg-black">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/fmHb7YHrnaM?autoplay=1"
            title="Oronila Highlights"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      );
    case "system":
      return <SystemInfo />;
    case "image_viewer":
      return (
        <div className="flex items-center justify-center h-full w-full bg-[#1e1e1e]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/rank.png" alt="Rank" className="max-w-full max-h-full object-contain" />
        </div>
      );
    case "game_slope":
      return (
        <div className="h-full w-full bg-black">
          <iframe
            src="https://storage.y8.com/y8-studio/unity/joll/slope/?key=9757549&value=80527"
            className="w-full h-full border-none"
            title="Slope"
          />
        </div>
      );
  }
}

