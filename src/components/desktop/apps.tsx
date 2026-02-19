import type { AppId } from "./types";
import TerminalApp from "./TerminalApp";
import FileExplorer from "./FileExplorer";
import BrowserApp from "./BrowserApp";
import { TRASH_DATA, PROJECTS_DATA, DESKTOP_DATA } from "./fileSystem";

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
  game_2048: { title: "2048", icon: "/icons/pack/svgs-small/Steam.svg", color: "#edc22e" },
  game_flappy: { title: "Flappy Bird", icon: "/icons/pack/svgs-small/Steam.svg", color: "#fbbf24" },
  game_run3: { title: "Run 3", icon: "/icons/pack/svgs-small/Steam.svg", color: "#3b82f6" },
  explorer: { title: "File Explorer", icon: "/icons/pack/file-explorer.svg", color: "#3b82f6" },
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
      return "Music Player";
    case "contact":
      return "Browser";
    case "trash":
      return "Trash";
    case "games":
      return "Game Library";
    case "youtube":
      return "YouTube";
    case "system":
      return "About This Mac";
    case "image_viewer":
      return "Image Viewer";
    case "explorer":
      return "File Explorer";
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
      return <FileExplorer initialData={PROJECTS_DATA} onError={onError} onOpenApp={onOpenApp} title="Projects" />;
    case "resume":
      return (
        <div className="h-full w-full bg-[#525659] flex flex-col">
          <iframe
            src="/files/Noor_Ali_Resume.pdf"
            className="w-full h-full border-none block"
            title="Resume"
          />
        </div>
      );


    case "terminal":
      return <TerminalApp />;
    case "music":
      return (
        <div className="h-full w-full bg-black flex flex-col">
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
            className="flex-1"
          />
        </div>
      );
    case "contact":
      return <BrowserApp />;
    case "trash":
      return <FileExplorer initialData={TRASH_DATA} onError={onError} onOpenApp={onOpenApp} title="Trash" />;
    case "explorer":
      return <FileExplorer initialData={DESKTOP_DATA} onError={onError} onOpenApp={onOpenApp} title="File Explorer" />;
    case "games":
      return (
        <div className="h-full w-full bg-[#1e1e1e] p-8 text-neutral-200 font-pixel">
          <div className="grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-8">
            <button
              className="hidden md:flex flex-col items-center gap-3 hover:bg-white/5 p-4 rounded-xl transition-all group"
              onClick={() => onOpenApp?.("game_slope")}
            >
              <div className="w-24 h-24 relative rounded-xl overflow-hidden shadow-lg group-hover:scale-105 transition-transform border border-white/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/slope.png" alt="Slope" className="w-full h-full object-cover" />
              </div>
              <div className="text-sm font-medium tracking-wide">Slope</div>
            </button>

            <button
              className="flex flex-col items-center gap-3 hover:bg-white/5 p-4 rounded-xl transition-all group"
              onClick={() => onOpenApp?.("game_2048")}
            >
              <div className="w-24 h-24 relative rounded-xl overflow-hidden shadow-lg group-hover:scale-105 transition-transform border border-white/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/2048.png" alt="2048" className="w-full h-full object-cover" />
              </div>
              <div className="text-sm font-medium tracking-wide">2048</div>
            </button>

            <button
              className="flex flex-col items-center gap-3 hover:bg-white/5 p-4 rounded-xl transition-all group"
              onClick={() => onOpenApp?.("game_flappy")}
            >
              <div className="w-24 h-24 relative rounded-xl overflow-hidden shadow-lg group-hover:scale-105 transition-transform border border-white/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/flappy-bird.png" alt="Flappy Bird" className="w-full h-full object-cover" />
              </div>
              <div className="text-sm font-medium tracking-wide">Flappy Bird</div>
            </button>

            <button
              className="hidden md:flex flex-col items-center gap-3 hover:bg-white/5 p-4 rounded-xl transition-all group"
              onClick={() => onOpenApp?.("game_run3")}
            >
              <div className="w-24 h-24 relative rounded-xl overflow-hidden shadow-lg group-hover:scale-105 transition-transform border border-white/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/Run3.webp" alt="Run 3" className="w-full h-full object-cover" />
              </div>
              <div className="text-sm font-medium tracking-wide">Run 3</div>
            </button>
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
    case "game_2048":
      return (
        <div className="h-full w-full bg-black flex justify-center items-center">
          <iframe
            src="https://funhtml5games.com?embed=2048bit"
            className="w-full h-full border-none"
            title="2048"
            scrolling="no"
          />
        </div>
      );
    case "game_flappy":
      return (
        <div className="h-full w-full bg-black">
          <iframe
            src="https://flappybird.io/"
            className="w-full h-full border-none"
            title="Flappy Bird"
          />
        </div>
      );
    case "game_run3":
      return (
        <div className="h-full w-full bg-black flex flex-col">
          <iframe
            src="https://lekug.github.io/tn6pS9dCf37xAhkJv/"
            className="w-full h-full border-none"
            title="Run 3"
          />
          <div className="bg-black text-neutral-500 text-[10px] p-1 text-center font-pixel">
            Play Run 3 with a cloaked about:blank!
          </div>
        </div>
      );
  }
}

