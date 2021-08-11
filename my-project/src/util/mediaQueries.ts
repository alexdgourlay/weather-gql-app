export const breakpointSizes = {
  mobileS: "320px",
  mobileM: "450px",
  mobileL: "600px",
  tablet: "768px",
  laptop: "1024px",
  laptopL: "1440px",
  desktop: "2560px",
};

export const breakpoints = {
  mobileS: `@media only screen and (min-width: ${breakpointSizes.mobileS})`,
  mobileM: `@media only screen and (min-width: ${breakpointSizes.mobileM})`,
  mobileL: `@media only screen and (min-width: ${breakpointSizes.mobileL})`,
  tablet: `@media only screen and (min-width: ${breakpointSizes.tablet})`,
  laptop: `@media only screen and (min-width: ${breakpointSizes.laptop})`,
  laptopL: `@media only screen and (min-width: ${breakpointSizes.laptopL})`,
  desktop: `@media only screen and (min-width: ${breakpointSizes.desktop})`,
};

export const hoverEnabled = "@media (hover: hover) and (pointer: fine)";
