import { Dock } from "domains/dock/views";
import { useWindowsAction } from "domains/window/store";
import { cn } from "third-parties/classnames/cn.ts";
import { colorProvider } from "third-parties/vanilla-extract/styleToken.css.ts";
import { useDarkMode } from "utils/browser/index.ts";
import * as styles from "./Desktop.css.ts";
import { DesktopMenu } from "./DesktopMenu";
import { Windows } from "./Windows";

export function Desktop() {
  const { setFocusedWindowID } = useWindowsAction();

  return (
    <div
      className={cn(styles.desktop, colorProvider)}
      onMouseDown={() => setFocusedWindowID(null)}
    >
      <DesktopMenu />
      <DarkModeButtonXX />
      <Windows />
      <Dock />
    </div>
  );
}

function DarkModeButtonXX() {
  const [darkMode, setDarkMode] = useDarkMode();

  return (
    <button
      type="button"
      onClick={() => setDarkMode(!darkMode)}
      style={{ position: "absolute", top: 40 }}
    >
      {darkMode ? "🌙" : "☀️"}
    </button>
  );
}
