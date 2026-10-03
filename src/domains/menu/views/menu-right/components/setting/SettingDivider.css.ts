import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { COLORS } from "third-parties/vanilla-extract";

export const container = recipe({
  base: {
    padding: "5px 9px"
  },
  variants: {
    sub: {
      true: {
        paddingLeft: 43
      }
    }
  },
  defaultVariants: {
    sub: false
  }
});

export const divider = style({
  border: "none",
  backgroundColor: COLORS.fill.primary,
  width: "100%",
  height: 1,
  margin: 0
});
