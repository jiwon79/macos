import type { ViewportSize } from "utils/react/useViewportSize";
import type { WindowStyle } from "../interface";

// Leave the menu bar, Dock and a small desktop margin reachable.
const MARGIN = 8;
const TOP = 24 + MARGIN;
const BOTTOM = 80;

export function fitWindowToViewport(
  style: WindowStyle,
  viewport: ViewportSize
): WindowStyle {
  const width = Math.max(1, Math.min(style.width, viewport.width - MARGIN * 2));
  const height = Math.max(
    1,
    Math.min(style.height, viewport.height - TOP - BOTTOM)
  );
  return {
    width,
    height,
    x: Math.max(MARGIN, Math.min(style.x, viewport.width - MARGIN - width)),
    y: Math.max(TOP, Math.min(style.y, viewport.height - BOTTOM - height))
  };
}
