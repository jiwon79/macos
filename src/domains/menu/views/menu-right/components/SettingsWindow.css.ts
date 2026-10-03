import { globalStyle, style } from "@vanilla-extract/css";
import { COLORS, darkModeStyle, FONT } from "third-parties/vanilla-extract";

export const dialog = style([
  FONT.medium_13,
  {
    width: 600,
    maxWidth: "calc(100vw - 32px)",
    maxHeight: "calc(100dvh - 48px)",
    padding: 0,
    border: "1px solid #ffffff30",
    borderRadius: 12,
    color: COLORS.text.primary,
    background: "#f3f3f3",
    boxShadow: "0 20px 70px #0006",
    overflow: "hidden",
    "::backdrop": { background: "#0002" }
  }
]);
darkModeStyle(dialog, { background: "#252525" });
export const titlebar = style({
  boxSizing: "border-box",
  height: 48,
  display: "flex",
  alignItems: "center",
  gap: 18,
  padding: "0 16px",
  borderBottom: "1px solid #8883"
});
export const close = style({
  border: 0,
  borderRadius: "50%",
  width: 13,
  height: 13,
  background: "#ff5f57",
  color: "#6b0804",
  fontSize: 12,
  lineHeight: "12px",
  padding: 0,
  cursor: "pointer"
});
export const body = style({
  display: "flex",
  minHeight: "min(340px, calc(100dvh - 98px))",
  maxHeight: "calc(100dvh - 98px)",
  overflowY: "auto"
});
export const sidebar = style({
  width: 164,
  flexShrink: 0,
  background: "#8881",
  padding: 10,
  "@media": {
    "(max-width: 560px)": {
      boxSizing: "border-box",
      width: 44,
      padding: 5
    }
  }
});
globalStyle(`${sidebar} button`, {
  display: "flex",
  alignItems: "center",
  gap: 8,
  width: "100%",
  height: 34,
  border: 0,
  borderRadius: 6,
  background: "transparent",
  color: "inherit",
  textAlign: "left",
  font: "inherit",
  padding: "0 6px",
  overflow: "hidden",
  whiteSpace: "nowrap",
  cursor: "pointer"
});
globalStyle(`${sidebar} button[aria-current=page]`, {
  background: "#3478f6",
  color: "white"
});
globalStyle(`${sidebar} svg`, { flexShrink: 0 });
export const content = style({
  flex: 1,
  minWidth: 0,
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "center",
  padding: 24,
  "@media": { "(max-width: 560px)": { padding: 8 } }
});
globalStyle(`${content} > [data-setting-panel]`, {
  width: "100%",
  maxWidth: 298,
  flexShrink: 0
});
