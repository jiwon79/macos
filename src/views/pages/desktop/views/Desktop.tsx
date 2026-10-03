import { Dock } from "domains/dock/views";
import { useWindowsAction } from "domains/window/store";
import { useDarkMode } from "utils/browser/index.ts";
import { useDesktopImages } from "../hooks/useDesktopImages";
import * as styles from "./Desktop.css.ts";
import { DesktopLoadingScreen } from "./DesktopLoadingScreen";
import { DesktopMenu } from "./DesktopMenu";
import { Windows } from "./Windows";

export function Desktop() {
  const { setFocusedWindowID } = useWindowsAction();
  const { loading, failed, retry, continueToDesktop } = useDesktopImages();

  if (loading || failed) {
    return (
      <DesktopLoadingScreen
        failed={failed}
        onRetry={retry}
        onContinue={continueToDesktop}
      />
    );
  }

  return (
    <div
      className={styles.desktop}
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
