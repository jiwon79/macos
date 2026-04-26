import { style } from "@vanilla-extract/css";
import { COLORS, FONT } from "third-parties/vanilla-extract/styleToken.css";

export const header = style({
  boxSizing: "border-box",
  width: "100%",
  height: 36,
  padding: "0 10px",
  display: "flex",
  alignItems: "center",
  gap: 6,
  background: "none",
  border: "none",
  borderRadius: 8,
  cursor: "pointer",
  color: "inherit",
  fontFamily: "inherit",

  ":hover": {
    backgroundColor: COLORS.fill.tertiary
  }
});

export const backIcon = style({
  width: 18,
  height: 18,
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
