import { style } from "@vanilla-extract/css";
import { calcColorTokens } from "../theme.css";

export const keypadContainer = style({
  display: "grid",
  gridTemplateColumns: "56fr 57fr 57fr 59fr",
  gridTemplateRows: "repeat(5, minmax(0, 1fr))",
  flex: "0 1 239px",
  minHeight: 0,
  gap: "1px",
  backgroundColor: calcColorTokens.grey700
});
