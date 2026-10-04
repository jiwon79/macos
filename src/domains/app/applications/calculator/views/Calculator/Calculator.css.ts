import { style } from "@vanilla-extract/css";
import { calcColorTokens } from "../theme.css";

export const movableArea = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  backgroundColor: calcColorTokens.grey700,
  flex: 1,
  padding: "8px 8px 8px 0"
});

export const displayContainer = style({
  display: "block",
  width: "calc(100% - 8px)",
  minWidth: 0,
  height: 36,
  marginLeft: 8,
  overflowX: "auto",
  overflowY: "hidden",
  scrollbarWidth: "none",
  lineHeight: "36px",
  ":focus-visible": { outline: "1px solid currentColor", outlineOffset: -1 }
});

export const displayText = style({
  display: "block",
  width: "max-content",
  minWidth: "100%",
  whiteSpace: "nowrap",
  fontSize: 24,
  textAlign: "right"
});

export const measuredText = style({ display: "inline-block" });
