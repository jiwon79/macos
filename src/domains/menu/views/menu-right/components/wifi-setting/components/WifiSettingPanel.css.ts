import { style } from "@vanilla-extract/css";
import { COLORS } from "third-parties/vanilla-extract";
import { settingPanel } from "../../styles/panel.css";

export const container = style([
  settingPanel,
  {
    padding: 5
  }
]);

export const hotspotStatus = style({
  display: "flex",
  alignItems: "center",
  color: COLORS.text.secondary
});
export const arrow = style({
  display: "flex",
  transition: "transform 120ms ease",
  selectors: { "&[data-expanded=true]": { transform: "rotate(90deg)" } }
});
