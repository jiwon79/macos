export interface MenuConfig {
  name: string;
  submenuGroups: SubmenuConfig[][];
}

export interface SubmenuConfig {
  name: string;
  shortcut?: string;
  disabled?: boolean;
  children?: SubmenuConfig[][];
  checked?: boolean;
  appID?: ApplicationID;
  choice?: { group: string; value: string; defaultValue: string };
  action?:
    | "new-window"
    | "close-window"
    | "show-desktop"
    | "bring-to-front"
    | "zoom"
    | "settings";
}

export interface AppConfig {
  id: string;
  app: () => React.ReactElement;
  icon: string;
  menus: MenuConfig[];
  resizable?: boolean;
  resize?: {
    minWidth?: number;
    minHeight?: number;
    maxWidth?: number;
    maxHeight?: number;
  };
  initialStyle: {
    x?: number;
    y?: number;
    width: number;
    height: number;
  };
}

import type { ApplicationID } from "../applications";
