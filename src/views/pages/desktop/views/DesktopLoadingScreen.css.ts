import { keyframes, style } from "@vanilla-extract/css";
import { darkModeStyle } from "third-parties/vanilla-extract";

const spin = keyframes({
  to: { transform: "rotate(360deg)" }
});

export const screen = style({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: 20,
  backgroundColor: "#e6edf4",
  color: "#202734"
});

darkModeStyle(screen, {
  backgroundColor: "#171d2b",
  color: "#f1f3f8"
});

export const status = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 16
});

export const spinner = style({
  width: 28,
  height: 28,
  border: "3px solid currentColor",
  borderRightColor: "transparent",
  borderRadius: "50%",
  animation: `${spin} 0.8s linear infinite`,
  "@media": {
    "(prefers-reduced-motion: reduce)": { animation: "none" }
  }
});

export const actions = style({
  display: "flex",
  gap: 12
});
