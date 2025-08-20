import { style } from "@vanilla-extract/css";
import { COLORS } from "third-parties/vanilla-extract";

export const container = style({
  padding: "5px 9px"
});

export const divider = style({
  border: "none",
  backgroundColor: COLORS.fill.primary,
  width: "100%",
  height: 1,
  margin: 0
});
