import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { COLORS, FONT } from "third-parties/vanilla-extract";

export const container = recipe({
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 9px",
    boxSizing: "border-box",
    border: 0,
    background: "none",
    textAlign: "left",
    fontFamily: "inherit",
    height: 22,
    borderRadius: 4,
    userSelect: "none"
  },
  variants: {
    disabled: {
      true: {},
      false: {
        cursor: "pointer",
        transition: "background-color 0.10s ease",

        ":hover": {
          backgroundColor: COLORS.fill.primary
        }
      }
    }
  }
});

export const title = style([
  FONT.bold_12,
  {
    color: COLORS.text.secondary,
    flexGrow: 1
  }
]);

export const accessory = style({
  flexShrink: 0,
  color: COLORS.text.primary
});
