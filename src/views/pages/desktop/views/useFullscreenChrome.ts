import { type MouseEvent, useEffect, useRef, useState } from "react";

export function useFullscreenChrome(fullscreenWindowID: string | undefined) {
  const [revealedWindowID, setRevealedWindowID] = useState<string>();
  const hideTimer = useRef<ReturnType<typeof setTimeout>>();
  const visible =
    fullscreenWindowID != null && revealedWindowID === fullscreenWindowID;

  useEffect(() => {
    if (!fullscreenWindowID) setRevealedWindowID(undefined);
    clearTimeout(hideTimer.current);
    hideTimer.current = undefined;
    return () => clearTimeout(hideTimer.current);
  }, [fullscreenWindowID]);

  const cancelHide = () => {
    clearTimeout(hideTimer.current);
    hideTimer.current = undefined;
  };

  const hide = () => {
    if (!visible || hideTimer.current != null) return;
    hideTimer.current = setTimeout(() => {
      setRevealedWindowID(undefined);
      hideTimer.current = undefined;
    }, 250);
  };

  const onMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!fullscreenWindowID) return;
    const desktop = event.currentTarget;
    const y = event.clientY - desktop.getBoundingClientRect().top;
    const titlebar = desktop.querySelector<HTMLElement>(
      '[data-window-fullscreen="true"] [data-window-titlebar]'
    );
    const overChrome =
      (event.target as Element).closest("[data-fullscreen-chrome]") != null;

    if (
      y <= 3 ||
      (visible && (overChrome || y <= 24 + (titlebar?.offsetHeight ?? 0) + 8))
    ) {
      cancelHide();
      setRevealedWindowID(fullscreenWindowID);
    } else {
      hide();
    }
  };

  return { visible, onMouseMove, onMouseLeave: hide };
}
