import { globalStyle, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { COLORS, FONT } from "third-parties/vanilla-extract";

export const submenuContainer = style({
  display: "flex",
  flexShrink: 0,
  flexDirection: "column"
});
export const row = style({ position: "relative" });
export const submenuButton = recipe({
  base: [
    FONT.body.regular,
    {
      position: "relative",
      width: "100%",
      display: "flex",
      alignItems: "center",
      gap: 8,
      height: 22,
      padding: "0 9px 0 22px",
      borderRadius: 4,
      border: 0,
      outline: 0,
      background: "transparent",
      color: COLORS.text.primary,
      textAlign: "left",
      cursor: "default",
      whiteSpace: "nowrap"
    }
  ],
  variants: {
    disabled: {
      true: { opacity: 0.35 },
      false: {
        cursor: "pointer",
        ":hover": { background: "#0a84ff", color: "white" },
        ":focus-visible": { background: "#0a84ff", color: "white" }
      }
    }
  }
});
export const submenuText = recipe({
  base: { flex: 1, margin: 0, whiteSpace: "nowrap", color: "inherit" },
  variants: { disabled: { true: {}, false: {} } }
});
export const submenuShortcutText = style({
  marginLeft: 24,
  color: COLORS.text.secondary,
  fontSize: 13,
  letterSpacing: 1,
  whiteSpace: "nowrap"
});
globalStyle(
  `${submenuButton.classNames.base}:hover ${submenuShortcutText}, ${submenuButton.classNames.base}:focus-visible ${submenuShortcutText}`,
  { color: "inherit" }
);
export const check = style({
  position: "absolute",
  left: 5,
  fontSize: 12,
  width: 12,
  textAlign: "center"
});
export const chevron = style({ display: "flex", marginLeft: 16 });
export const nested = style({ zIndex: 5, minWidth: 210 });
