import { style } from "@vanilla-extract/css";
import { darkModeStyle } from "third-parties/vanilla-extract";

const OUTER_BOX_SHADOW = `
      0px 0px 0px 0.5px rgba(255, 255, 255, 0.20) inset,
      0px 0px 1px 0px rgba(0, 0, 0, 0.40),
      0px 0px 1.5px 0px rgba(0, 0, 0, 0.30),
      0px 7px 22px 0px rgba(0, 0, 0, 0.20)`;
const OUTER_BOX_SHADOW_DARK = `
      0px 0px 0px 1px rgba(255, 255, 255, 0.10) inset,
      0px 0px 1px 0px rgba(0, 0, 0, 0.60),
      0px 0px 1.5px 0px rgba(0, 0, 0, 0.50),
      0px 7px 22px 0px rgba(0, 0, 0, 0.40)`;
const INNER_BOX_SHADOW = "0px 2px 8px 0px rgba(0, 0, 0, 0.15)";
const INNER_BOX_SHADOW_DARK = `
      0px 0px 0px 1px rgba(255, 255, 255, 0.10) inset,
      0px 0px 1px 0px rgba(0, 0, 0, 0.60),
      0px 0px 1.5px 0px rgba(0, 0, 0, 0.50),
      0px 2px 8px 0px rgba(0, 0, 0, 0.15)`;

export const SETTING_SURFACE = {
  backgroundColor: "rgba(224, 224, 224, 0.64)",
  boxShadow: OUTER_BOX_SHADOW,
  backdropFilter: "blur(60px)"
};
export const SETTING_SURFACE_DARK = {
  backgroundColor: "rgba(41, 41, 41, 0.63)",
  boxShadow: OUTER_BOX_SHADOW_DARK,
  backdropFilter: "blur(80px)"
};

export const settingPanel = style({
  boxSizing: "border-box",
  width: 298,
  maxWidth: "calc(100vw - 16px)",
  display: "flex",
  flexDirection: "column",
  borderRadius: 6,

  backgroundColor: `var(--setting-panel-background, ${SETTING_SURFACE.backgroundColor})`,
  boxShadow: `var(--setting-panel-shadow, ${OUTER_BOX_SHADOW})`,
  backdropFilter: "var(--setting-panel-backdrop-filter, blur(60px))"
});

export const controlPanel = style({
  width: 298,
  display: "flex",
  flexDirection: "column",
  borderRadius: 20,

  backgroundColor: "rgba(209, 209, 209, 0.42)",
  boxShadow: OUTER_BOX_SHADOW,
  backdropFilter: "blur(60px)"
});

export const innerControlPanel = style({
  display: "flex",
  flexDirection: "column",
  borderRadius: 10,

  backgroundColor: "rgba(231, 231, 231, 0.38)",
  boxShadow: INNER_BOX_SHADOW
});

darkModeStyle(settingPanel, {
  backgroundColor: `var(--setting-panel-background, ${SETTING_SURFACE_DARK.backgroundColor})`,
  boxShadow: `var(--setting-panel-shadow, ${OUTER_BOX_SHADOW_DARK})`,
  backdropFilter: "var(--setting-panel-backdrop-filter, blur(80px))"
});

darkModeStyle(controlPanel, {
  backgroundColor: "rgba(45, 45, 45, 0.44)",
  boxShadow: OUTER_BOX_SHADOW_DARK,
  backdropFilter: "blur(80px)"
});

darkModeStyle(innerControlPanel, {
  backgroundColor: "rgba(44, 44, 44, 0.34)",
  boxShadow: INNER_BOX_SHADOW_DARK
});
