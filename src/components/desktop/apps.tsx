import type { AppId } from "./types";
import TerminalApp from "./TerminalApp";
import FileExplorer from "./FileExplorer";
import { TRASH_DATA, PROJECTS_DATA } from "./fileSystem";

export const APP_CONFIG: Record<AppId, { title: string; icon: string; color: string }> = {
  about: { title: "About.txt", icon: "/icons/pack/svgs-small/Google Docs.svg", color: "#38bdf8" },
  projects: { title: "Projects", icon: "/icons/pack/folder.svg", color: "#fbbf24" },
  resume: { title: "Resume", icon: "/icons/pack/svgs-small/LinkedIn.svg", color: "#34d399" },
  terminal: { title: "Terminal", icon: "/icons/pixel/terminal.svg", color: "#000000" },
  music: { title: "Music", icon: "/icons/pack/svgs-small/Spotify.svg", color: "#a78bfa" },
  contact: { title: "Browser", icon: "/icons/pack/svgs-small/Google Chrome.svg", color: "#22d3ee" },
  trash: { title: "Trash", icon: "/icons/pixel/trash.svg", color: "#000000" },
  games: { title: "Games", icon: "/icons/pack/svgs-small/Steam.svg", color: "#171a21" },
  youtube: { title: "Oronila Youtube", icon: "/icons/pack/svgs-small/YouTube.svg", color: "#ff0000" },
  system: { title: "About Noor's Mac", icon: "cog", color: "#6b7280" },
  image_viewer: { title: "Image Viewer", icon: "/icons/pixel/image.svg", color: "#a78bfa" },
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
      return "About.txt";
    case "projects":
      return "Projects";
    case "resume":
      return "Resume";
    case "terminal":
      return "Terminal";
    case "music":
      return "Music";
    case "contact":
      return "Contact (Browser)";
    case "trash":
      return "Trash";
    case "games":
      return "Games";
    case "youtube":
      return "Oronila Youtube";
    case "system":
      return "About Noor's Mac";
    case "image_viewer":
      return "Image Viewer";
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
        <AppFrame title="Music">
          <p>Now playing / favorites coming next.</p>
        </AppFrame>
      );
    case "contact":
      return (
        <AppFrame title="Contact">
          <p>
            A “browser-style” contact app coming next (links, email, socials).
          </p>
        </AppFrame>
      );
    case "trash":
      return <FileExplorer initialData={TRASH_DATA} onError={onError} onOpenApp={onOpenApp} />;
    case "games":
      return (
        <AppFrame title="Games">
          <p>Steam library integration coming next.</p>
        </AppFrame>
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
  }
}

