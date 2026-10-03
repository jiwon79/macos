import { style } from "@vanilla-extract/css";
import { COLORS } from "third-parties/vanilla-extract/styleToken.css";
import { settingPanel } from "../../styles/panel.css";

export const container = style([
  settingPanel,
  {
    padding: 5
  }
]);

export const hotspotIcons = style({
  display: "flex",
  alignItems: "center",
  gap: 0,
  color: COLORS.text.secondary
});

export const hotspotIcon = style({
  width: 24,
  height: 24,
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
});
