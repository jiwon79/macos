import { style } from "@vanilla-extract/css";
import { darkModeStyle } from "third-parties/vanilla-extract";
import { COLORS, FONT } from "third-parties/vanilla-extract/styleToken.css";
import { settingPanel } from "../../styles/panel.css";

export const container = style([
  settingPanel,
  {
    padding: 0
  }
]);

export const header = style({
  boxSizing: "border-box",
  width: "100%",
  height: 48,
  padding: "13px 14px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 10
});

export const headerTextGroup = style({
  display: "flex",
  flexDirection: "column",
  gap: 0,
  minWidth: 0,
  flex: 1
});

export const headerTitle = style([
  FONT.bold_13,
  {
    color: COLORS.text.primary,
    letterSpacing: -0.325
  }
]);

export const headerSubtitle = style([
  FONT.medium_11,
  {
    fontSize: 11,
    color: COLORS.text.secondary,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  }
]);

export const headerArrow = style({
  width: 26,
  height: 26,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: COLORS.text.secondary,
  flexShrink: 0
});

export const body = style({
  boxSizing: "border-box",
  width: "100%",
  padding: "0 5px 5px 5px",
  display: "flex",
  flexDirection: "column",
  gap: 0
});

export const sliderRow = style({
  padding: "0 9px 10px 9px"
});

export const tilesRow = style({
  display: "flex",
  justifyContent: "space-around",
  padding: "12px 20px",
  gap: 24
});

export const tile = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 5,
  width: 60,
  background: "none",
  border: "none",
  padding: 0,
  cursor: "pointer",
  color: "inherit",
  fontFamily: "inherit"
});

export const tileCircle = style({
  width: 36,
  height: 36,
  borderRadius: "50%",
  backgroundColor: COLORS.fill.primary,
  color: COLORS.text.primary,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "background-color 120ms ease"
});

export const tileCircleActive = style({
  backgroundColor: COLORS.blue,
  color: "white"
});

export const tileLabel = style([
  FONT.medium_11,
  {
    color: COLORS.text.primary,
    textAlign: "center",
    lineHeight: "14px"
  }
]);

export const tileStatus = style([
  FONT.medium_11,
  {
    color: COLORS.text.secondary,
    textAlign: "center",
    lineHeight: "14px"
  }
]);

darkModeStyle(tileCircleActive, {
  color: "white"
});
