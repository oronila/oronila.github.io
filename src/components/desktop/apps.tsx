import type { AppId } from "./types";

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
  }
}

