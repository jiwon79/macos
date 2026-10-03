import { style } from "@vanilla-extract/css";
import { COLORS, FONT } from "third-parties/vanilla-extract/styleToken.css";

export const header = style({
  boxSizing: "border-box",
  width: "100%",
  height: 32,
  padding: "0 9px",
  display: "flex",
  alignItems: "center",
  gap: 4,
  background: "none",
  border: "none",
  cursor: "pointer",
  color: "inherit",
  fontFamily: "inherit",
  textAlign: "left",
  userSelect: "none"
});

export const backIcon = style({
  width: 14,
  height: 14,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: COLORS.text.primary,
  transform: "rotate(180deg)",
  flexShrink: 0
});

export const title = style([
  FONT.bold_13,
  {
    color: COLORS.text.primary
  }
]);
