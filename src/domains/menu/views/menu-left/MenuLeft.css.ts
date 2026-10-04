import { globalStyle, style } from "@vanilla-extract/css";

export const container = style({
  display: "flex",
  alignItems: "center",
  height: 24,
  gap: 0
});

globalStyle(`${container} [data-menu-trigger]:not(:disabled)`, {
  cursor: "pointer"
});
