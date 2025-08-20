import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { COLORS, FONT } from "third-parties/vanilla-extract";

export const container = style({
  display: "flex",
  alignItems: "center",
  gap: 8,
  padding: "3px 9px",
  height: 28,
  borderRadius: 5,
  cursor: "pointer",
  transition: "background-color 0.10s ease",

  ":hover": {
    backgroundColor: COLORS.fill.primary
  }
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
  marginLeft: "auto"
});
