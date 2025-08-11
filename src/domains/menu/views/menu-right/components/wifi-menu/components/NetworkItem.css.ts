import { style } from "@vanilla-extract/css";

export const networkItem = style({
  display: "flex",
  alignItems: "center",
  gap: 8,
  padding: "8px 12px",
  borderRadius: 6,
  cursor: "pointer",

  ":hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1)"
  }
});

export const networkIcon = style({
  fontSize: 16,
  width: 20,
  textAlign: "center"
});

export const networkInfo = style({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: 2
});

export const networkName = style({
  fontSize: 14,
  fontWeight: 500,
  color: "white",
  display: "flex",
  alignItems: "center"
});

export const networkSignal = style({
  fontSize: 12,
  color: "rgba(255, 255, 255, 0.6)",
  fontFamily: "monospace"
});

export const connectedIndicator = style({
  color: "#30D158",
  fontSize: 12
});

export const passwordIcon = style({
  fontSize: 10,
  color: "rgba(255, 255, 255, 0.6)"
});
