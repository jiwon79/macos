import { recipe } from "@vanilla-extract/recipes";
import { darkModeStyle, FONT } from "third-parties/vanilla-extract";
import { hexAlpha } from "utils/style";

export const container = recipe({
  base: {
    border: "none",
    background: "none",
    cursor: "default",
    flexShrink: 0,
    whiteSpace: "nowrap",
    outlineOffset: -2,
    display: "flex",
    alignItems: "center",
    height: 24,
    boxSizing: "border-box",
    borderRadius: 4,
    color: hexAlpha("#FFFFFF", 0.9),
    textShadow:
      "0px 1px 4px rgba(0, 0, 0, 0.20), 0px 36px 100px rgba(0, 0, 0, 0.70)",
    textAlign: "center"
  },
  variants: {
    selected: {
      true: {
        backgroundColor: hexAlpha("#FFFFFF", 0.2)
      }
    },
    type: {
      icon: [
        FONT.icon,
        {
          padding: "2px 8px"
        }
      ],
      "text-bold": [
        FONT.bold_13,
        {
          padding: "4px 9px"
        }
      ],
      text: [
        FONT.medium_13,
        {
          padding: "4px 9px"
        }
      ]
    }
  }
});

darkModeStyle(container.classNames.base, {
  color: "#FFF",
  textShadow:
    "0px 36px 100px rgba(0, 0, 0, 0.70), 0px 1px 4px rgba(0, 0, 0, 0.20)"
});
