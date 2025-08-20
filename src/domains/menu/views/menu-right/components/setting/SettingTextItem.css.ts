import { recipe } from "@vanilla-extract/recipes";
import { COLORS, FONT } from "third-parties/vanilla-extract";

export const container = recipe({
  base: {
    height: 22,
    display: "flex",
    alignItems: "center",
    borderRadius: 6,
    cursor: "pointer",
    transition: "background-color 0.10s ease",

    ":hover": {
      backgroundColor: COLORS.fill.primary
    }
  },
  variants: {
    size: {
      medium: {
        padding: "2px 9px 4px 9px"
      },
      small: {
        padding: "0px 9px"
      }
    }
  },
  defaultVariants: {
    size: "medium"
  }
});

export const text = recipe({
  base: {
    color: COLORS.text.primary,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  },
  variants: {
    size: {
      medium: [FONT.medium_13, { color: COLORS.text.primary }],
      small: [FONT.medium_11, { color: COLORS.text.secondary }]
    }
  },
  defaultVariants: {
    size: "medium"
  }
});
