export type AppId =
  | "about"
  | "projects"
  | "resume"
  | "terminal"
  | "music"
  | "contact";

export type DesktopIcon = {
  id: AppId;
  title: string;
  subtitle?: string;
  position: { x: number; y: number };
  color: string;
};

export type WindowInstance = {
  instanceId: string;
  appId: AppId;
  title: string;
  isMinimized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
  isMaximized?: boolean;
  restoreState?: {
    position: { x: number; y: number };
    size: { width: number; height: number };
  };
};

