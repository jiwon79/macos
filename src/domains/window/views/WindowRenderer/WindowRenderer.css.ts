import { style } from "@vanilla-extract/css";

export const renderer = style({
  position: "absolute",
  zIndex: 1,
  top: 0,
  left: 0,
  transition: "opacity 250ms ease, visibility 250ms",
  selectors: {
    '&[data-window-fullscreen="true"]': { zIndex: 2 },
    '&[data-window-hidden="true"]': {
      opacity: 0,
      visibility: "hidden",
      pointerEvents: "none"
    }
  },
  "@media": { "(prefers-reduced-motion: reduce)": { transition: "none" } }
});
