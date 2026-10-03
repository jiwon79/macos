import { style } from "@vanilla-extract/css";

export const clock = style({
  fontSize: 12,
  fontWeight: 500,
  padding: "0 7px",
  fontVariantNumeric: "tabular-nums"
});
export const date = style({
  "@media": { "(max-width: 600px)": { display: "none" } }
});
