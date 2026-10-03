import { style } from "@vanilla-extract/css";

export const container = style({
  selectors: {
    '[data-window-fullscreen="true"] &': {
      position: "absolute",
      top: 24,
      left: 0,
      right: 0,
      zIndex: 1,
      display: "flex",
      alignItems: "center",
      gap: 8,
      minHeight: 28,
      padding: "6px 0",
      boxSizing: "border-box",
      background: "#282828",
      boxShadow:
        "0 1px 0 rgba(255, 255, 255, 0.1), 0 4px 12px rgba(0, 0, 0, 0.2)",
      transition: "transform 180ms ease, visibility 0s"
    },
    '&[data-titlebar-hidden="true"]': {
      transform: "translateY(calc(-100% - 24px))",
      visibility: "hidden",
      pointerEvents: "none",
      transition: "transform 180ms ease, visibility 0s 180ms"
    }
  },
  "@media": {
    "(prefers-reduced-motion: reduce)": {
      selectors: { '[data-window-fullscreen="true"] &': { transition: "none" } }
    }
  }
});
