import { style } from "@vanilla-extract/css";
import { COLORS } from "third-parties/vanilla-extract";

const Z_INDEX = {
  TRACK: 1,
  TRACK_OUTLINE: 2,
  ICON: 3,
  INPUT: 10,
  INPUT_THUMB: 10
};

export const sliderContainer = style({
  position: "relative",
  height: 22,
  width: 256,
  borderRadius: 100,
  backgroundColor: COLORS.fill.primary
});

export const sliderTrack = style({
  position: "absolute",
  top: 0,
  bottom: 0,
  left: 0,
  backgroundColor: "white",
  borderRadius: 100,
  zIndex: Z_INDEX.TRACK
});

export const sliderTrackOutline = style({
  position: "absolute",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  boxShadow: "0px 0px 0px 1px #C0C0C0 inset",
  pointerEvents: "none",
  borderRadius: 100,
  zIndex: Z_INDEX.TRACK_OUTLINE
});

export const iconContainer = style({
  position: "absolute",
  top: 1,
  left: 1,
  width: 20,
  height: 20,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: Z_INDEX.ICON,
  pointerEvents: "none",
  color: "rgba(0, 0, 0, 0.25)"
});

export const sliderInput = style({
  outline: "none",
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  appearance: "none",
  background: "transparent",
  cursor: "pointer",
  zIndex: Z_INDEX.INPUT,
  margin: 0,

  "::-webkit-slider-thumb": {
    appearance: "none",
    backgroundColor: "transparent",
    width: 22,
    height: 22
  },

  "::-moz-range-thumb": {
    backgroundColor: "transparent",
    border: "none",
    width: 22,
    height: 22
  }
});

export const sliderInputThumb = style({
  position: "absolute",
  width: 22,
  height: 22,
  borderRadius: "50%",
  backgroundColor: "white",
  boxShadow: `0px 0px 0px 1px ${COLORS.fill.primary} inset, -2px 0px 4px rgba(0, 0, 0, 0.05)`,
  zIndex: Z_INDEX.INPUT_THUMB,
  top: 0,
  pointerEvents: "none",

  selectors: {
    [`${sliderInput}:active + &`]: {
      backgroundColor: COLORS.fill.tertiary,
      boxShadow: `0px 0px 0px 1px ${COLORS.fill.primary} inset`
    }
  }
});
