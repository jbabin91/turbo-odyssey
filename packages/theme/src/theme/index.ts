import type {} from '@mui/lab/themeAugmentation';
import { createTheme } from '@mui/material';
import type {} from '@mui/x-data-grid/themeAugmentation';
import type {} from '@mui/x-date-pickers/themeAugmentation';
import type {} from '@mui/x-tree-view/themeAugmentation';
import colors from '@repo/design-tokens/colors';

import { components } from './components.js';
import { darkPalette, lightPalette } from './palettes.js';
import { typography } from './typography.js';

export const theme = createTheme({
  colorSchemes: {
    light: { palette: lightPalette },
    dark: { palette: darkPalette },
  },
  cssVariables: true,
  background: {
    black: colors.common.black,
    white: colors.common.white,
    navy: colors.navy[900],
  },
  status: {
    danger: colors.orange[500],
  },
  typography,
  components,
});

declare module '@mui/material/styles' {
  interface Theme {
    background: {
      black: string;
      white: string;
      navy: string;
    };
    status: {
      danger: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    background?: {
      black?: string;
      white?: string;
      navy?: string;
    };
    status?: {
      danger?: string;
    };
  }
}
