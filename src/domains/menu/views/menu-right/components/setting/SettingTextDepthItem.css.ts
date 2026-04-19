import { recipe } from "@vanilla-extract/recipes";
import { COLORS, FONT } from "third-parties/vanilla-extract";

export const container = recipe({
  base: {
    height: 22,
    display: "flex",
    alignItems: "center",
    paddingLeft: 9
  }
});

export const inner = recipe({
  base: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    padding: "3px 9px 3px 34px",
    borderRadius: 4,
    cursor: "pointer",
    userSelect: "none"
  },
  variants: {
    selected: {
      true: {
        backgroundColor: COLORS.fill.primary
      },
      false: {
        ":hover": {
          backgroundColor: COLORS.fill.secondary
        }
      }
    }
  },
  defaultVariants: {
    selected: false
  }
});

export const text = recipe({
  base: [
    FONT.medium_13,
    {
      color: COLORS.text.primary,
      flexGrow: 1,
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    }
  ]
});
