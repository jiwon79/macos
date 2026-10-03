import { style } from "@vanilla-extract/css";
import { darkModeStyle } from "third-parties/vanilla-extract";
import { hexAlpha } from "utils/style";

export const container = style({
  minWidth: 230,
  boxSizing: "border-box",
  maxHeight: "calc(100dvh - 34px)",
  maxWidth: "calc(100vw - 16px)",
  overflowY: "auto",
  overscrollBehavior: "contain",
  scrollbarWidth: "none",
  display: "flex",
  flexDirection: "column",
  borderRadius: 6,

  background: hexAlpha("#FFFFFF", 0.64),
  backdropFilter: "blur(25px)",
  boxShadow: `
    inset 0px 0px 0px 1px rgba(0, 0, 0, 0.12),
    0px 0px 0px 1px rgba(0, 0, 0, 0.12),
    0px 0px 20px 0px rgba(0, 0, 0, 0.15)`,

  padding: 5
});

darkModeStyle(container, {
  border: "none",
  background: "rgba(41, 41, 41, 0.78)",
  boxShadow: "inset 0 0 0 1px #ffffff22, 0 1px 3px #0008, 0 10px 30px #0005"
});
