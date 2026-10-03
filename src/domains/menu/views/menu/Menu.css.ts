import { globalStyle, style } from "@vanilla-extract/css";
import { darkModeStyle } from "third-parties/vanilla-extract";
import { hexAlpha } from "utils/style";

export const container = style({
  position: "relative",
  zIndex: 10,

  display: "flex",
  flexDirection: "row",
  alignItems: "center",

  boxSizing: "border-box",
  width: "100%",
  height: 24,
  padding: "0 8px 0 4px"
});

export const menuContainer = style({
  zIndex: 15,

  position: "absolute",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",

  left: 4,
  right: 8,
  minWidth: 0,
  height: "100%"
});

const background = style({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0
});

export const backgroundBlur = style([
  background,
  {
    zIndex: 11,
    background: "rgba(255, 255, 255, 0.20)",
    backdropFilter: "blur(32.5px)"
  }
]);

darkModeStyle(backgroundBlur, {
  background: "rgba(79, 79, 79, 0.20)"
});

export const backgroundColorBurn = style([
  background,
  {
    zIndex: 12,
    opacity: 0.2,
    background: hexAlpha("#000000", 0.2)
  }
]);

darkModeStyle(backgroundColorBurn, {
  background: hexAlpha("#FFFFFF", 0.2)
});

// Match macOS: keep status items on one line and reduce app menus in narrow windows.
globalStyle("[data-menu-leading]", { minWidth: 0, flexShrink: 1 });
globalStyle("[data-menu-leading] > button:nth-of-type(n+4)", {
  "@media": { "(max-width: 900px)": { display: "none" } }
});
globalStyle("[data-menu-leading] > button:nth-of-type(n+3)", {
  "@media": { "(max-width: 440px)": { display: "none" } }
});
globalStyle("[data-menu-leading] > button:nth-of-type(n+2)", {
  "@media": { "(max-width: 400px)": { display: "none" } }
});
