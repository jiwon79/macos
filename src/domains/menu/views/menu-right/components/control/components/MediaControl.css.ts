import { style } from "@vanilla-extract/css";
import { COLORS, FONT } from "third-parties/vanilla-extract/styleToken.css";
import { innerControlPanel } from "../../styles/panel.css";

export const mediaContainer = style([
  innerControlPanel,
  {
    height: 52,
    padding: 8,
    display: "flex",
    alignItems: "center",
    gap: 8
  }
]);

export const appIcon = style({
  width: 32,
  height: 32,
  borderRadius: 6,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 16,
  backgroundColor: "#ff3b30",
  flexShrink: 0
});

export const mediaInfo = style({
  display: "flex",
  flexDirection: "column",
  flex: 1,
  gap: 2
});

export const appName = style([
  FONT.medium_12,
  {
    color: COLORS.text.primary
  }
]);

export const songInfo = style([
  FONT.medium_11,
  {
    color: COLORS.text.secondary,
    fontSize: 10
  }
]);

export const mediaControls = style({
  display: "flex",
  alignItems: "center",
  gap: 8,
  flexShrink: 0
});

export const controlButton = style({
  width: 20,
  height: 20,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "none",
  border: "none",
  color: COLORS.text.primary,
  fontSize: 16,
  cursor: "pointer",
  borderRadius: 4,
  transition: "all 150ms ease",

  ":hover": {
    backgroundColor: COLORS.fill.tertiary
  },

  ":active": {
    transform: "scale(0.9)"
  }
});
