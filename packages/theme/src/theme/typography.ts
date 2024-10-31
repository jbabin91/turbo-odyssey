import fontFamilies from '@jbabin91/design-tokens/font-families';
import fontSizes from '@jbabin91/design-tokens/font-sizes';
import fontWeights from '@jbabin91/design-tokens/font-weights';
import letterSpacings from '@jbabin91/design-tokens/letter-spacings';
import lineHeights from '@jbabin91/design-tokens/line-heights';
import { type TypographyOptions } from '@mui/material/styles/createTypography.js';

export const typography = {
  fontSize: 14,
  htmlFontSize: 16,
  allVariants: {
    fontFamily: fontFamilies.montserrat,
  },
  fontFamily: fontFamilies.montserrat,
  fontWeightMedium: fontWeights.medium,
  fontWeightBold: fontWeights.bold,
  display: {
    fontFamily: fontFamilies.montserrat,
    fontWeight: fontWeights.bold,
    fontSize: fontSizes.display1,
    lineHeight: lineHeights['145'],
    letterSpacing: letterSpacings['0'],
  },
  h1: {
    fontWeight: fontWeights.bold,
    fontSize: fontSizes.h1,
    lineHeight: lineHeights['145'],
    letterSpacing: letterSpacings['025'],
  },
  h2: {
    fontWeight: fontWeights.bold,
    fontSize: fontSizes.h2,
    lineHeight: lineHeights['145'],
    letterSpacing: letterSpacings['0'],
  },
  h3: {
    fontWeight: fontWeights.bold,
    fontSize: fontSizes.h3,
    lineHeight: lineHeights['145'],
    letterSpacing: letterSpacings['015'],
  },
  h4: {
    fontWeight: fontWeights.bold,
    fontSize: fontSizes.h4,
    lineHeight: lineHeights['150'],
    letterSpacing: letterSpacings['015'],
  },
  h5: {
    fontWeight: fontWeights.bold,
    fontSize: fontSizes.h5,
    lineHeight: lineHeights['150'],
    letterSpacing: letterSpacings['01'],
  },
  h6: undefined,
  body1: {
    fontWeight: fontWeights.medium,
    fontSize: fontSizes.body1,
    lineHeight: lineHeights['150'],
    letterSpacing: letterSpacings['05'],
  },
  body2: {
    fontWeight: fontWeights.medium,
    fontSize: fontSizes.body2,
    lineHeight: lineHeights['150'],
    letterSpacing: letterSpacings['025'],
  },
  caption: {
    fontWeight: fontWeights.medium,
    fontSize: fontSizes.caption1,
    lineHeight: lineHeights['150'],
    letterSpacing: letterSpacings['025'],
  },
  caption2: {
    fontFamily: fontFamilies.montserrat,
    fontWeight: fontWeights.medium,
    fontSize: fontSizes.caption2,
    lineHeight: lineHeights['150'],
    letterSpacing: letterSpacings['025'],
  },
} satisfies TypographyOptions;

declare module '@mui/material/styles' {
  // Add custom typography variants
  interface TypographyVariants {
    display: React.CSSProperties;
    caption2: React.CSSProperties;
  }
  // Add custom typography variants options
  interface TypographyVariantsOptions {
    display?: React.CSSProperties;
    caption2?: React.CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    display: true; // add custom size variant
    caption2: true; // add custom size variant
    h6: false; // disable `h6` variant
  }
}
