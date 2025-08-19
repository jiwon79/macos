import { style } from "@vanilla-extract/css";
import { COLORS, FONT } from "third-parties/vanilla-extract";

export const container = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  paddingLeft: 9,
  paddingRight: 9,
  height: 32
});

export const title = style([
  FONT.bold_13,
  {
    color: COLORS.text.primary,
    flexGrow: 1
  }
]);
