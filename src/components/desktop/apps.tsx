import type { AppId } from "./types";
import TerminalApp from "./TerminalApp";

export const APP_CONFIG: Record<AppId, { title: string; icon: string; color: string }> = {
  about: { title: "About.txt", icon: "/icons/pack/svgs-small/Google Docs.svg", color: "#38bdf8" },
  projects: { title: "Projects", icon: "/icons/pack/svgs-small/Google Drive.svg", color: "#fbbf24" },
  resume: { title: "Resume.pdf", icon: "/icons/pack/svgs-small/LinkedIn.svg", color: "#34d399" },
  terminal: { title: "Terminal", icon: "terminal", color: "#000000" },
  music: { title: "Music", icon: "/icons/pack/svgs-small/Spotify.svg", color: "#a78bfa" },
  contact: { title: "Browser", icon: "/icons/pack/svgs-small/Google Chrome.svg", color: "#22d3ee" },
  trash: { title: "Trash", icon: "trash", color: "#000000" },
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

export function getDefaultTitle(appId: AppId) {
  switch (appId) {
    case "about":
      return "About.txt";
    case "projects":
      return "Projects";
    case "resume":
      return "Resume.pdf";
    case "terminal":
      return "Terminal";
    case "music":
      return "Music";
    case "contact":
      return "Contact (Browser)";
    case "trash":
      return "Trash";
    default:
      return "App";
  }
}

export function AppContent({ appId }: { appId: AppId }) {
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
      return (
        <AppFrame title="Projects">
          <p>Folder view coming next.</p>
        </AppFrame>
      );
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
      return (
        <AppFrame title="Trash">
          <p>Trash is empty.</p>
        </AppFrame>
      );
  }
}

