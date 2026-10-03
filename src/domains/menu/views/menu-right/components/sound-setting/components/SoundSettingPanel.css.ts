import { style } from "@vanilla-extract/css";
import { settingPanel } from "../../styles/panel.css";

export const container = style([
  settingPanel,
  {
    padding: 5
  }
]);

export const sliderRow = style({
  padding: "0 9px 5px"
});
