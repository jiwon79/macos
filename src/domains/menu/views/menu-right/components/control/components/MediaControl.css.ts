import { style } from "@vanilla-extract/css";
import { COLORS, FONT } from "third-parties/vanilla-extract/styleToken.css";
import { innerControlPanel } from "../../styles/panel.css";

export const mediaContainer = style([
  innerControlPanel,
  {
    boxSizing: "border-box",
    width: "100%",
    height: 62,
    padding: "5px 10px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    overflow: "hidden"
  }
]);

export const leftGroup = style({
  display: "flex",
  alignItems: "center",
  gap: 8,
  minWidth: 0,
  flex: 1
});

export const appIcon = style({
  width: 42,
  height: 42,
  borderRadius: 2,
  backgroundColor: COLORS.fill.primary,
  flexShrink: 0
});

export const appName = style([
  FONT.bold_11,
  {
    color: COLORS.text.primary,
    letterSpacing: 0.22,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  }
]);

export const mediaControls = style({
  display: "flex",
  alignItems: "center",
  flexShrink: 0
});

export const controlButton = style({
  width: 26,
  height: 26,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "none",
  border: "none",
  color: COLORS.text.primary,
  cursor: "pointer",
  borderRadius: 4,
  padding: 0,

  ":hover": {
    backgroundColor: COLORS.fill.tertiary
  },

  ":active": {
    transform: "scale(0.9)"
  }
});
