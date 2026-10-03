import { style } from "@vanilla-extract/css";
import { wallpaperDark, wallpaperLight } from "assets/wallpapers";
import { darkModeStyle } from "third-parties/vanilla-extract";

export const desktop = style({
  position: "relative",
  width: "100%",
  height: "100%",
  overflow: "hidden",
  backgroundColor: "#e6edf4",
  backgroundImage: `url("${wallpaperLight}")`,
  backgroundSize: "cover",
  backgroundPosition: "center"
});

export const fullscreenBackground = style({
  position: "absolute",
  inset: 0,
  background: "#1c1c1e",
  opacity: 0,
  pointerEvents: "none",
  transition: "opacity 450ms ease",
  selectors: { '[data-desktop-fullscreen="true"] &': { opacity: 1 } },
  "@media": { "(prefers-reduced-motion: reduce)": { transition: "none" } }
});

export const menu = style({
  position: "absolute",
  inset: "0 0 auto",
  zIndex: 10,
  transition: "transform 180ms ease, visibility 0s",
  selectors: {
    '&[data-menu-hidden="true"]': {
      transform: "translateY(-100%)",
      visibility: "hidden",
      pointerEvents: "none",
      transition: "transform 180ms ease, visibility 0s 180ms"
    }
  },
  "@media": { "(prefers-reduced-motion: reduce)": { transition: "none" } }
});

darkModeStyle(desktop, {
  backgroundColor: "#171d2b",
  backgroundImage: `url("${wallpaperDark}")`
});
