import { style } from "@vanilla-extract/css";
import { darkModeStyle } from "third-parties/vanilla-extract";
import { COLORS } from "third-parties/vanilla-extract/styleToken.css";

export const base = style({
  width: 26,
  height: 26,
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0
});

export const blue = style({
  backgroundColor: COLORS.blue,
  color: "white"
});

export const neutral = style({
  backgroundColor: "#E6E6E6",
  color: "#4C4C4C"
});

darkModeStyle(neutral, {
  backgroundColor: "rgba(255, 255, 255, 0.15)",
  color: "rgba(255, 255, 255, 0.85)"
});
