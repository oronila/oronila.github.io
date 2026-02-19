export type AppId =
  | "about"
  | "projects"
  | "resume"
  | "terminal"
  | "music"
  | "contact"
  | "trash"
  | "system"
  | "games"
  | "youtube"
  | "image_viewer"
  | "game_slope"
  | "game_2048"
  | "game_flappy"
  | "game_run3";

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

