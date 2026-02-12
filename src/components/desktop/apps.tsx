import type { AppId } from "./types";

export const APP_CONFIG: Record<AppId, { title: string; icon: string; color: string }> = {
  about: { title: "About.txt", icon: "user", color: "#38bdf8" },
  projects: { title: "Projects", icon: "folder", color: "#fbbf24" },
  resume: { title: "Resume.pdf", icon: "article", color: "#34d399" },
  terminal: { title: "Terminal", icon: "command", color: "#f87171" },
  music: { title: "Music", icon: "music", color: "#a78bfa" },
  contact: { title: "Browser", icon: "link", color: "#22d3ee" },
  trash: { title: "Trash", icon: "trash", color: "#ef4444" },
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
        <AppFrame title="About">
          <p>Coming next: load from markdown in <code>/content</code>.</p>
        </AppFrame>
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
      return (
        <AppFrame title="Terminal">
          <p>Terminal app coming next.</p>
        </AppFrame>
      );
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

