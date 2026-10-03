import { Dock } from "domains/dock/views";
import { useMenuRightStore } from "domains/menu/views/menu-right/store";
import { useWindowsAction, useWindowsStore } from "domains/window/store";
import { useWindowAnimationStore } from "domains/window-animation/store";
import { useEffect, useRef } from "react";
import { cn } from "third-parties/classnames/cn.ts";
import { colorProvider } from "third-parties/vanilla-extract/styleToken.css.ts";
import { useDesktopImages } from "../hooks/useDesktopImages";
import * as styles from "./Desktop.css.ts";
import { DesktopLoadingScreen } from "./DesktopLoadingScreen";
import { DesktopMenu } from "./DesktopMenu";
import { useFullscreenChrome } from "./useFullscreenChrome";
import { Windows } from "./Windows";

export function Desktop() {
  const darkMode = useMenuRightStore((state) => state.display.darkMode);
  useEffect(() => {
    document.documentElement.setAttribute(
      "color-theme",
      darkMode ? "dark" : "light"
    );
  }, [darkMode]);
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
  return <DesktopContent />;
}

function DesktopContent() {
  const {
    setFocusedWindowID,
    setWindowWorkArea,
    setWindowFullscreenArea,
    toggleFullscreenWindow
  } = useWindowsAction();
  const fullscreenWindowID = useWindowsStore(
    (state) => state.windows.find((window) => window.fullscreenRestoreStyle)?.id
  );
  const desktopRef = useRef<HTMLDivElement>(null);
  const dockElement = useWindowAnimationStore((state) => state.dockElement);
  const fullscreenChrome = useFullscreenChrome(fullscreenWindowID);
  const menuHidden = fullscreenWindowID != null && !fullscreenChrome.visible;

  useEffect(() => {
    const desktop = desktopRef.current;
    if (desktop == null) {
      return;
    }

    const updateWorkArea = () => {
      const rect = desktop.getBoundingClientRect();
      // The menu bar occupies the same 24px top boundary used by window dragging.
      const top = Math.min(24, rect.height);
      const bottom = Math.min(
        rect.height,
        dockElement ? dockElement.offsetTop : rect.height
      );
      setWindowWorkArea({
        x: 0,
        y: top,
        width: rect.width,
        height: Math.max(0, bottom - top)
      });
      setWindowFullscreenArea({
        x: 0,
        y: 0,
        width: rect.width,
        height: rect.height
      });
    };

    const observer = new ResizeObserver(updateWorkArea);
    observer.observe(desktop);
    if (dockElement) {
      observer.observe(dockElement);
    }
    updateWorkArea();

    return () => observer.disconnect();
  }, [dockElement, setWindowWorkArea, setWindowFullscreenArea]);

  useEffect(() => {
    if (!fullscreenWindowID) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === "Escape" &&
        !event.defaultPrevented &&
        !event.isComposing
      ) {
        toggleFullscreenWindow(fullscreenWindowID);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [fullscreenWindowID, toggleFullscreenWindow]);

  return (
    <div
      ref={desktopRef}
      className={cn(styles.desktop, colorProvider)}
      data-desktop-fullscreen={fullscreenWindowID != null}
      data-fullscreen-chrome-visible={fullscreenChrome.visible}
      onMouseMove={fullscreenChrome.onMouseMove}
      onMouseLeave={fullscreenChrome.onMouseLeave}
      onMouseDown={() => setFocusedWindowID(null)}
    >
      <div
        className={styles.menu}
        data-fullscreen-chrome="menu"
        data-menu-hidden={menuHidden}
        aria-hidden={menuHidden || undefined}
      >
        <DesktopMenu />
      </div>
      <div className={styles.fullscreenBackground} />
      <Windows fullscreenChromeVisible={fullscreenChrome.visible} />
      <Dock hidden={fullscreenWindowID != null} />
    </div>
  );
}
