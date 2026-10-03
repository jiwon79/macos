import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { COLORS, FONT } from "third-parties/vanilla-extract";

export const container = style({
  border: 0,
  background: "none",
  width: "100%",
  fontFamily: "inherit",
  textAlign: "left",
  display: "flex",
  alignItems: "center",
  gap: 8,
  padding: "3px 9px",
  boxSizing: "border-box",
  height: 32,
  borderRadius: 4,
  cursor: "pointer",
  userSelect: "none",

  ":hover": {
    backgroundColor: COLORS.fill.primary
  },
  ":focus-visible": { outline: "2px solid #3478f6", outlineOffset: -2 }
});

export const icon = recipe({
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    backgroundColor: COLORS.fill.primary,

    flexShrink: 0,
    color: COLORS.text.secondary
  },
  variants: {
    selected: {
      true: {
        backgroundColor: COLORS.blue,
        color: COLORS.white
      },
      false: {
        backgroundColor: COLORS.fill.primary,
        color: COLORS.text.secondary,

        selectors: {
          [`${container}:hover &`]: {
            backgroundColor: COLORS.fill.secondary,
            color: COLORS.text.primary
          }
        }
      }
    }
  }
});

export const content = style([
  FONT.medium_13,
  {
    color: COLORS.text.primary,
    flexGrow: 1,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  }
]);

export const accessory = style({
  display: "flex",
  alignItems: "center",
  flexShrink: 0,
  color: COLORS.text.secondary,
  marginLeft: "auto"
});
