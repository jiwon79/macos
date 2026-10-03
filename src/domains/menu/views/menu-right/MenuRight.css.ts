import { globalStyle, style } from "@vanilla-extract/css";
import { darkModeStyle } from "third-parties/vanilla-extract";
import {
  SETTING_SURFACE,
  SETTING_SURFACE_DARK
} from "./components/styles/panel.css";

export const container = style({
  display: "flex",
  alignItems: "center",
  height: 24,
  gap: 0,
  flexShrink: 0
});
export const statusTrigger = style({
  justifyContent: "center",
  width: 32,
  padding: "0 5px",
  position: "relative",
  "@media": {
    "(max-width: 600px)": { width: 28, padding: "0 2px" },
    "(max-width: 440px)": { width: 24, padding: 0 }
  }
});

// Ancestor opacity creates a backdrop root. Blur on a nested panel therefore
// snaps on only when the ancestor's fade reaches 1. Keep blur on the fading
// surface itself, including its tint and shadow.
export const statusSurface = style({
  ...SETTING_SURFACE,
  borderRadius: 6,
  vars: {
    "--setting-panel-backdrop-filter": "none",
    "--setting-panel-background": "transparent",
    "--setting-panel-shadow": "none"
  }
});
darkModeStyle(statusSurface, SETTING_SURFACE_DARK);
export const statusContent = style({
  maxHeight: "calc(100dvh - 34px)",
  overscrollBehavior: "contain",
  scrollbarWidth: "none",
  selectors: {
    '&[data-overflow="true"]': { overflowY: "auto" }
  }
});
globalStyle(`${statusTrigger}[data-inactive] > svg`, { opacity: 0.6 });
