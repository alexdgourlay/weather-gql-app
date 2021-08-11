import { breakpoints } from "../util/mediaQueries";

const colorPalette = {
  black: "rgb(0, 0, 0)",
  offBlack: "rgb(14, 14, 16)",
  white: "rgb(255, 255, 255)",
  red: "rgb(255, 25, 64)",
  blue: "rgb(38, 111, 255)",
  grey: "rgb(108, 103, 114)",
  lightGrey: "rgb(239, 237, 237)",
  midGrey: "rgb(194, 204, 210)",
};

export const baseTheme = {
  spacing: {
    xxs: "0.125em",
    xs: "0.25em",
    s: "0.5em",
    m: "1.25em",
    l: "2em",
    xl: "4em",
    xxl: "8em",
    xxxl: "12em",
  },
  boxShadows: {
    raised: "0 1px 3px 0 rgba(0, 0, 0, 0.15), 0 2px 4px 0 rgba(0, 0, 0, 0.1)",
  },
  color: {
    background: colorPalette.offBlack,
    surface: colorPalette.grey,
    text: colorPalette.white,
    primaryAccent: colorPalette.blue,
    strongGrey: colorPalette.lightGrey,
    midGrey: "rgb(181, 181, 186)",
    weakGrey: colorPalette.black,
  },
  breakpoints,
};

export const darkTheme: typeof baseTheme = {
  ...baseTheme,
  color: {
    background: colorPalette.offBlack,
    surface: colorPalette.grey,
    text: colorPalette.white,
    primaryAccent: colorPalette.blue,
    strongGrey: colorPalette.lightGrey,
    midGrey: "rgb(181, 181, 186)",
    weakGrey: colorPalette.black,
  },
};

export const lightTheme: typeof baseTheme = {
  ...baseTheme,
  color: {
    background: colorPalette.white,
    surface: colorPalette.midGrey,
    text: colorPalette.black,
    primaryAccent: colorPalette.blue,
    strongGrey: colorPalette.grey,
    midGrey: colorPalette.midGrey,
    weakGrey: colorPalette.lightGrey,
  },
};
