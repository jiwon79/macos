import { style } from "@vanilla-extract/css";
import { COLORS } from "third-parties/vanilla-extract";

export const switchControl = style({
  width: 38,
  height: 22,
  flexShrink: 0,
  border: 0,
  borderRadius: 11,
  padding: 2,
  background: COLORS.fill.secondary,
  cursor: "pointer",
  outlineOffset: 2,
  transition: "background-color 120ms ease",
  selectors: { "&[aria-checked=true]": { background: "#3478f6" } }
});
export const thumb = style({
  display: "block",
  width: 18,
  height: 18,
  borderRadius: "50%",
  background: "white",
  boxShadow: "0 1px 2px #0003",
  transition: "transform 120ms ease",
  selectors: {
    [`${switchControl}[aria-checked=true] &`]: { transform: "translateX(16px)" }
  },
  "@media": { "(prefers-reduced-motion: reduce)": { transition: "none" } }
});
