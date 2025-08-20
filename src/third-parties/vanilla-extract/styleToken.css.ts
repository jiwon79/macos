import { createVar, fontFace, style } from "@vanilla-extract/css";
import { darkModeStyle } from "./darkModeStyle";

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
  },

  bold_13: {
    fontFamily: sanFrancisco,
    fontWeight: 700,
    fontSize: 13,
    lineHeight: 16 / 13
  },
  medium_13: {
    fontFamily: sanFrancisco,
    fontWeight: 500,
    fontSize: 13,
    lineHeight: 16 / 13
  },

  bold_12: {
    fontFamily: sanFrancisco,
    fontWeight: 700,
    fontSize: 12,
    lineHeight: 15 / 12
  },
  medium_12: {
    fontFamily: sanFrancisco,
    fontWeight: 500,
    fontSize: 12,
    lineHeight: 15 / 12
  },

  bold_11: {
    fontFamily: sanFrancisco,
    fontWeight: 700,
    fontSize: 11,
    lineHeight: 14 / 11
  },
  medium_11: {
    fontFamily: sanFrancisco,
    fontWeight: 500,
    fontSize: 11,
    lineHeight: 14 / 11
  }
};

export const COLORS = {
  white: "rgba(255, 255, 255, 1)",
  blue: createVar(),

  text: {
    primary: createVar(),
    secondary: createVar(),
    tertiary: createVar(),
    quaternary: createVar(),
    quinary: createVar()
  },

  fill: {
    primary: createVar(),
    secondary: createVar(),
    tertiary: createVar(),
    quaternary: createVar(),
    quinary: createVar()
  }
};

export const colorProvider = style({
  vars: {
    [COLORS.blue]: "#007AFF",

    [COLORS.text.primary]: "rgba(0, 0, 0, 0.85)",
    [COLORS.text.secondary]: "rgba(0, 0, 0, 0.50)",
    [COLORS.text.tertiary]: "rgba(0, 0, 0, 0.25)",
    [COLORS.text.quaternary]: "rgba(0, 0, 0, 0.10)",
    [COLORS.text.quinary]: "rgba(0, 0, 0, 0.05)",

    [COLORS.fill.primary]: "rgba(0, 0, 0, 0.10)",
    [COLORS.fill.secondary]: "rgba(0, 0, 0, 0.08)",
    [COLORS.fill.tertiary]: "rgba(0, 0, 0, 0.05)",
    [COLORS.fill.quaternary]: "rgba(0, 0, 0, 0.03)",
    [COLORS.fill.quinary]: "rgba(0, 0, 0, 0.015)"
  }
});

darkModeStyle(colorProvider, {
  vars: {
    [COLORS.blue]: "#0A84FF",

    [COLORS.text.primary]: "rgba(255, 255, 255, 0.85)",
    [COLORS.text.secondary]: "rgba(255, 255, 255, 0.55)",
    [COLORS.text.tertiary]: "rgba(255, 255, 255, 0.25)",
    [COLORS.text.quaternary]: "rgba(255, 255, 255, 0.10)",
    [COLORS.text.quinary]: "rgba(255, 255, 255, 0.05)",

    [COLORS.fill.primary]: "rgba(255, 255, 255, 0.10)",
    [COLORS.fill.secondary]: "rgba(255, 255, 255, 0.08)",
    [COLORS.fill.tertiary]: "rgba(255, 255, 255, 0.05)",
    [COLORS.fill.quaternary]: "rgba(255, 255, 255, 0.03)",
    [COLORS.fill.quinary]: "rgba(255, 255, 255, 0.015)"
  }
});

export const BACKDROP_FILTER = {
  panel: {
    outer: createVar()
  }
};

export const backdropFilterProvider = style({
  vars: {
    [BACKDROP_FILTER.panel.outer]: "blur(80px)"
  }
});

darkModeStyle(backdropFilterProvider, {
  vars: {
    [BACKDROP_FILTER.panel.outer]: "blur(60px)"
  }
});
