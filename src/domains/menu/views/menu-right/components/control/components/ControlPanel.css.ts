import { style } from "@vanilla-extract/css";
import { darkModeStyle } from "third-parties/vanilla-extract";
import { COLORS, FONT } from "third-parties/vanilla-extract/styleToken.css";
import { controlPanel, innerControlPanel } from "../../styles/panel.css";

export const panel = style([
  controlPanel,
  {
    padding: 8,
    gap: 8
  }
]);

export const controlsGrid = style({
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gridTemplateRows: "repeat(2, 1fr)",
  gap: 8
});

export const controlTile = style({
  width: 68,
  height: 68,
  borderRadius: 10,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: 4,
  backgroundColor: COLORS.fill.secondary,
  cursor: "pointer",
  transition: "all 150ms ease",
  position: "relative",

  ":hover": {
    opacity: 0.8
  },

  ":active": {
    transform: "scale(0.95)"
  }
});

export const controlTileDisabled = style({
  backgroundColor: COLORS.fill.quaternary,
  cursor: "default",

  ":hover": {
    opacity: 1
  },

  ":active": {
    transform: "none"
  }
});

export const controlTileWide = style({
  gridColumn: "span 2",
  width: "auto"
});

export const controlTileTall = style({
  gridRow: "span 2",
  height: "auto"
});

export const controlTileIcon = style({
  fontSize: 20,
  lineHeight: 1,
  color: COLORS.text.primary
});

export const controlTileLabel = style([
  FONT.medium_11,
  {
    color: COLORS.text.primary,
    textAlign: "center"
  }
]);

export const controlTileSubtitle = style([
  FONT.medium_11,
  {
    color: COLORS.text.secondary,
    fontSize: 10,
    textAlign: "center"
  }
]);

export const focusSection = style([
  innerControlPanel,
  {
    padding: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8
  }
]);

export const focusLabel = style([
  FONT.medium_11,
  {
    color: COLORS.text.primary
  }
]);

export const slidersContainer = style({
  display: "flex",
  flexDirection: "column",
  gap: 8,
  padding: "0 8px"
});

// Dark mode styles
darkModeStyle(controlTile, {
  backgroundColor: "rgba(255, 255, 255, 0.08)"
});

darkModeStyle(controlTileDisabled, {
  backgroundColor: "rgba(255, 255, 255, 0.03)"
});

darkModeStyle(controlTileIcon, {
  color: COLORS.text.primary
});

darkModeStyle(controlTileLabel, {
  color: COLORS.text.primary
});

darkModeStyle(controlTileSubtitle, {
  color: COLORS.text.secondary
});

darkModeStyle(focusLabel, {
  color: COLORS.text.primary
});
