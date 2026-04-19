import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { COLORS, FONT } from "third-parties/vanilla-extract";

export const container = style({
  boxSizing: "border-box",
  height: 22,
  display: "flex",
  alignItems: "center",
  padding: "0 9px"
});

export const inner = recipe({
  base: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    padding: "3px 9px",
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

export const iconSlot = style({
  width: 22,
  height: 22,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: COLORS.text.primary,
  flexShrink: 0,
  marginRight: 10
});

export const iconSlotHidden = style({
  visibility: "hidden"
});

export const text = style([
  FONT.medium_13,
  {
    color: COLORS.text.primary,
    flex: 1,
    minWidth: 0,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  }
]);
