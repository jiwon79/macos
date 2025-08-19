import { style } from "@vanilla-extract/css";

export const panel = style({
  width: 320,
  backgroundColor: "rgba(28, 28, 30, 0.9)",
  backdropFilter: "blur(20px)",
  borderRadius: 12,
  padding: 12,
  color: "white",
  fontSize: 14
});

export const topGrid = style({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 8,
  marginBottom: 12
});

export const bottomGrid = style({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 8,
  marginBottom: 12
});

export const sliderSection = style({
  display: "flex",
  flexDirection: "column",
  gap: 8,
  marginBottom: 12
});

export const musicSection = style({
  backgroundColor: "rgba(44, 44, 46, 0.8)",
  borderRadius: 8,
  padding: 12
});
