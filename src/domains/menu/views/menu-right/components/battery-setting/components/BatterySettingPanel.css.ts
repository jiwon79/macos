import { style } from "@vanilla-extract/css";
import { settingPanel } from "../../styles/panel.css";

export const container = style([
  settingPanel,
  {
    padding: 5
  }
]);

export const powerSource = style({ height: 18, overflow: "hidden" });
