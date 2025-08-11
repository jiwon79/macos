import { style } from "@vanilla-extract/css";

export const tile = style({
  backgroundColor: "rgba(44, 44, 46, 0.8)",
  borderRadius: 12,
  padding: 12,
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: 6,
  cursor: "pointer",
  transition: "all 0.2s ease",
  minHeight: 60,
  border: "none",
  width: "100%",

  ":hover": {
    backgroundColor: "rgba(58, 58, 60, 0.8)"
  }
});

export const tileEnabled = style({
  backgroundColor: "rgba(0, 122, 255, 0.8)",

  ":hover": {
    backgroundColor: "rgba(0, 122, 255, 0.9)"
  }
});

export const tileIcon = style({
  fontSize: 20,
  lineHeight: 1
});

export const tileContent = style({
  display: "flex",
  flexDirection: "column",
  gap: 2
});

export const tileTitle = style({
  fontSize: 13,
  fontWeight: 600,
  color: "white"
});

export const tileSubtitle = style({
  fontSize: 11,
  color: "rgba(255, 255, 255, 0.6)"
});
