import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { COLORS, FONT } from "third-parties/vanilla-extract";

export const container = recipe({
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 9,
    paddingRight: 9,
    height: 26,
    marginTop: 2,
    marginBottom: 2,
    borderRadius: 5
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
