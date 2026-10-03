import { Dock } from "domains/dock/views";
import { useMenuRightStore } from "domains/menu/views/menu-right/store";
import { useWindowsAction } from "domains/window/store";
import { useEffect } from "react";
import { cn } from "third-parties/classnames/cn.ts";
import { colorProvider } from "third-parties/vanilla-extract/styleToken.css.ts";
import * as styles from "./Desktop.css.ts";
import { DesktopMenu } from "./DesktopMenu";
import { Windows } from "./Windows";

export function Desktop() {
  const { setFocusedWindowID } = useWindowsAction();
  const darkMode = useMenuRightStore((state) => state.display.darkMode);
  useEffect(() => {
    document.documentElement.setAttribute(
      "color-theme",
      darkMode ? "dark" : "light"
    );
  }, [darkMode]);

  return (
    <div
      className={cn(styles.desktop, colorProvider)}
      onMouseDown={() => setFocusedWindowID(null)}
    >
      <DesktopMenu />
      <Windows />
      <Dock />
    </div>
  );
}
