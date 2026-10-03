import type { WindowStyle } from "domains/window/interface/window";
import { createContext, useContext } from "react";

interface WindowContextProps {
  id: string;
  style: WindowStyle;
  onStyleChange: (style: Partial<WindowStyle>) => void;
  resizable: boolean;
  maximized: boolean;
  fullscreen: boolean;
  fullscreenChromeVisible: boolean;
  transitioning: boolean;
}

export const WindowContext = createContext<WindowContextProps>({
  id: "",
  style: {
    x: 0,
    y: 0,
    width: 0,
    height: 0
  },
  onStyleChange: () => {},
  resizable: true,
  maximized: false,
  fullscreen: false,
  fullscreenChromeVisible: false,
  transitioning: false
});

export function useWindowContext() {
  return useContext(WindowContext);
}
