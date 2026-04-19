import { style } from "@vanilla-extract/css";
import { darkModeStyle } from "third-parties/vanilla-extract";
import { COLORS, FONT } from "third-parties/vanilla-extract/styleToken.css";
import { controlPanel, innerControlPanel } from "../../styles/panel.css";

export const panel = style([
  controlPanel,
  {
    boxSizing: "border-box",
    width: 298,
    padding: 10,
    gap: 10,
    borderRadius: 20
  }
]);

export const topRow = style({
  display: "flex",
  gap: 10,
  height: 134,
  width: "100%"
});

export const connectivityTile = style([
  innerControlPanel,
  {
    boxSizing: "border-box",
    flex: 1,
    minWidth: 0,
    padding: 10,
    display: "flex",
    flexDirection: "column",
    gap: 10,
    justifyContent: "center",
    overflow: "hidden"
  }
]);

export const connectivityRow = style({
  display: "flex",
  alignItems: "center",
  gap: 8,
  width: "100%"
});

export const connectivityText = style({
  display: "flex",
  flexDirection: "column",
  gap: 1,
  flex: 1,
  minWidth: 0
});

export const connectivityTitle = style([
  FONT.bold_11,
  {
    color: COLORS.text.primary,
    letterSpacing: 0.22
  }
]);

export const connectivitySubtitle = style([
  FONT.medium_11,
  {
    color: COLORS.text.secondary,
    fontSize: 10,
    lineHeight: "11px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  }
]);

export const connectivityArrow = style({
  color: COLORS.text.secondary,
  display: "flex",
  alignItems: "center",
  flexShrink: 0
});

export const rightColumn = style({
  display: "flex",
  flexDirection: "column",
  gap: 10,
  flex: 1,
  minWidth: 0,
  height: "100%"
});

export const focusTile = style([
  innerControlPanel,
  {
    boxSizing: "border-box",
    flex: 1,
    minHeight: 0,
    padding: "8px 10px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    overflow: "hidden"
  }
]);

export const focusLabel = style([
  FONT.bold_11,
  {
    color: COLORS.text.primary,
    letterSpacing: 0.22,
    flex: 1,
    minWidth: 0,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  }
]);

export const squareTileRow = style({
  display: "flex",
  gap: 10,
  flex: 1,
  minHeight: 0,
  width: "100%"
});

export const squareTile = style([
  innerControlPanel,
  {
    boxSizing: "border-box",
    flex: 1,
    minWidth: 0,
    height: "100%",
    padding: 4,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
    overflow: "hidden"
  }
]);

export const squareTileIcon = style({
  width: 26,
  height: 26,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: COLORS.text.primary,
  flexShrink: 0
});

export const squareTileLabel = style([
  FONT.medium_11,
  {
    fontSize: 10,
    lineHeight: "11px",
    color: COLORS.text.primary,
    textAlign: "center"
  }
]);

export const sliderTile = style([
  innerControlPanel,
  {
    boxSizing: "border-box",
    width: "100%",
    padding: "7px 10px 10px 10px",
    display: "flex",
    flexDirection: "column",
    gap: 5,
    overflow: "hidden"
  }
]);

export const sliderTileLabel = style([
  FONT.bold_11,
  {
    color: COLORS.text.primary,
    letterSpacing: 0.22
  }
]);

export const sliderWithAccessory = style({
  display: "flex",
  alignItems: "center",
  gap: 8,
  width: "100%"
});

export const sliderFlexWrapper = style({
  flex: 1,
  minWidth: 0,
  display: "flex"
});

export const sliderAccessoryButton = style({
  width: 26,
  height: 26,
  borderRadius: "50%",
  backgroundColor: COLORS.fill.primary,
  color: COLORS.text.primary,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  border: "none",
  cursor: "pointer",
  padding: 0
});

darkModeStyle(squareTileIcon, {
  color: COLORS.text.primary
});
