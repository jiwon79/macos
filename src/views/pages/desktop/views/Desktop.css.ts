import { style } from "@vanilla-extract/css";
import { wallpaperDark, wallpaperLight } from "assets/wallpapers";
import { darkModeStyle } from "third-parties/vanilla-extract";

export const desktop = style({
  position: "relative",
  width: "100%",
  height: "100%",
  backgroundColor: "#e6edf4",
  backgroundImage: `url("${wallpaperLight}")`,
  backgroundSize: "cover",
  backgroundPosition: "center"
});

darkModeStyle(desktop, {
  backgroundColor: "#171d2b",
  backgroundImage: `url("${wallpaperDark}")`
});
