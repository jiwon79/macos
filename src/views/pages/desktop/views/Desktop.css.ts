import { style } from "@vanilla-extract/css";
import { COLORS, darkModeStyle } from "third-parties/vanilla-extract";

export const desktop = style({
  position: "relative",
  width: "100%",
  height: "100%",
  backgroundImage: "url(/src/assets/wallpapers/wallpaper_light.png)",
  backgroundSize: "cover",
  backgroundPosition: "center"
});

darkModeStyle(desktop, {
  backgroundImage: "url(/src/assets/wallpapers/wallpaper_dark.png)"
});

export const text = style({
  color: COLORS.text.primary
});
