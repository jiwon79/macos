import { fontFace, style } from "@vanilla-extract/css";

export const sanFrancisco = fontFace([
  {
    src: 'url("/fonts/SFProText-Light.ttf")',
    fontWeight: 300,
    fontStyle: "normal"
  },
  {
    src: 'url("/fonts/SFProText-LightItalic.ttf")',
    fontWeight: 300,
    fontStyle: "italic"
  },
  {
    src: 'url("/fonts/SFProText-Regular.ttf")',
    fontWeight: 400,
    fontStyle: "normal"
  },
  {
    src: 'url("/fonts/SFProText-RegularItalic.ttf")',
    fontWeight: 400,
    fontStyle: "italic"
  },
  {
    src: 'url("/fonts/SFProText-Medium.ttf")',
    fontWeight: 500
  },
  {
    src: 'url("/fonts/SFProText-MediumItalic.ttf")',
    fontWeight: 500,
    fontStyle: "italic"
  },
  {
    src: 'url("/fonts/SFProText-Semibold.ttf")',
    fontWeight: 600,
    fontStyle: "normal"
  },
  {
    src: 'url("/fonts/SFProText-SemiboldItalic.ttf")',
    fontWeight: 600,
    fontStyle: "italic"
  },
  {
    src: 'url("/fonts/SFProText-Bold.ttf")',
    fontWeight: 700,
    fontStyle: "normal"
  },
  {
    src: 'url("/fonts/SFProText-BoldItalic.ttf")',
    fontWeight: 700,
    fontStyle: "italic"
  },
  {
    src: 'url("/fonts/SFProText-Heavy.ttf")',
    fontWeight: 800,
    fontStyle: "normal"
  },
  {
    src: 'url("/fonts/SFProText-HeavyItalic.ttf")',
    fontWeight: 800,
    fontStyle: "italic"
  }
]);

export const Z_INDEX = {
  canvas: 1,
  dock: 10
};

export const FONT = {
  icon: style({
    fontFamily: "Pretendard",
    fontWeight: 500,
    fontSize: 16,
    lineHeight: 20 / 16
  }),

  headline: {
    regular: style({
      fontFamily: "Pretendard",
      fontWeight: 700,
      fontSize: 13,
      lineHeight: 16 / 13
    }),

    emphasized: style({
      fontFamily: "Pretendard",
      fontWeight: 900,
      fontSize: 13,
      lineHeight: 16 / 13
    })
  },

  body: {
    regular: style({
      fontFamily: sanFrancisco,
      fontWeight: 500,
      fontSize: 13,
      lineHeight: 16 / 13
    }),

    emphasized: style({
      fontFamily: sanFrancisco,
      fontWeight: 600,
      fontSize: 13,
      lineHeight: 16 / 13
    })
  }
};
