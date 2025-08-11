import { style } from "@vanilla-extract/css";

export const slider = style({
  backgroundColor: "rgba(44, 44, 46, 0.8)",
  borderRadius: 8,
  padding: 12,
  display: "flex",
  flexDirection: "column",
  gap: 8
});

export const sliderHeader = style({
  display: "flex",
  alignItems: "center",
  gap: 8,
  fontSize: 13,
  fontWeight: 600,
  color: "white"
});

export const sliderIcon = style({
  fontSize: 16
});

export const sliderTrack = style({
  position: "relative",
  height: 4,
  backgroundColor: "rgba(255, 255, 255, 0.2)",
  borderRadius: 2,
  cursor: "pointer"
});

export const sliderFill = style({
  position: "absolute",
  top: 0,
  left: 0,
  height: "100%",
  backgroundColor: "white",
  borderRadius: 2,
  transition: "width 0.1s ease"
});

export const sliderThumb = style({
  position: "absolute",
  top: "50%",
  width: 12,
  height: 12,
  backgroundColor: "white",
  borderRadius: "50%",
  transform: "translate(-50%, -50%)",
  cursor: "pointer",
  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.3)"
});

export const airPlayButton = style({
  marginLeft: "auto",
  background: "none",
  border: "none",
  color: "white",
  fontSize: 14,
  cursor: "pointer",
  padding: 4,
  borderRadius: 4,

  ":hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1)"
  }
});
