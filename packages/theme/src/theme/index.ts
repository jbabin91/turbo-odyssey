import {
  colors,
  fontFamilies,
  fontSizes,
  fontWeights,
  letterSpacings,
  lineHeights,
} from '@jbabin91/design-tokens';
import type {} from '@mui/lab/themeAugmentation';
import {
  type Components,
  createTheme,
  type PaletteOptions,
} from '@mui/material';
import type { TypographyOptions } from '@mui/material/styles/createTypography.js';
import type {} from '@mui/material/themeCssVarsAugmentation';
import type {} from '@mui/x-data-grid/themeAugmentation';
import type {} from '@mui/x-date-pickers/themeAugmentation';
import type {} from '@mui/x-tree-view/themeAugmentation';

const lightPalette = {
  text: {
    primary: colors.navy[900],
    secondary: 'rgba(7,20,51,0.57)',
    disabled: 'rgba(7,20,51,0.38)',
  },
  primary: {
    main: colors.navy[900],
    dark: colors.navy[1000],
    light: colors.navy[300],
    contrastText: colors.common.white,
  },
  secondary: {
    main: colors.grey[100],
    dark: colors.grey[300],
    light: colors.grey[50],
    contrastText: colors.navy[900],
  },
  info: {
    main: colors.blue[700],
    dark: colors.blue[900],
    light: colors.blue[600],
    contrastText: colors.common.white,
  },
  error: {
    main: colors.red[600],
    dark: colors.red[800],
    light: colors.red[300],
    contrastText: colors.common.white,
  },
  success: {
    main: colors.green[400],
    dark: colors.green[700],
    light: colors.green[300],
    contrastText: colors.common.white,
  },
  warning: {
    main: colors.orange[400],
    dark: colors.orange[600],
    light: colors.orange[200],
    contrastText: colors.common.white,
  },
  action: {
    activatedOpacity: 0.46,
    hoverOpacity: 0.04,
    selectedOpacity: 0.08,
    focusOpacity: 0.1,
    disabledOpacity: 0.28,
    disabledBackground: 'rgba(7,20,51,0.10)',
  },
  background: {
    default: colors.grey[50],
    paper: colors.common.white,
  },
  divider: 'rgba(7,20,51,0.12)',
} satisfies PaletteOptions;

const darkPalette = {
  text: {
    primary: colors.common.white,
    secondary: 'rgba(255,255,255,0.50)',
    disabled: 'rgba(255,255,255,0.38)',
  },
  primary: {
    main: colors.navy[200],
    dark: colors.navy[400],
    light: colors.navy[100],
    contrastText: colors.navy[900],
  },
  secondary: {
    main: colors.grey[600],
    dark: colors.grey[700],
    light: colors.grey[900],
    contrastText: colors.grey[100],
  },
  info: {
    main: colors.navy[200],
    dark: colors.navy[400],
    light: colors.navy[100],
    contrastText: 'rgba(7,20,51,0.87)',
  },
  error: {
    main: colors.red[600],
    dark: colors.red[800],
    light: colors.red[300],
    contrastText: colors.common.white,
  },
  success: {
    main: colors.green[600],
    dark: colors.green[700],
    light: colors.green[400],
    contrastText: 'rgba(255,255,255,0.87)',
  },
  warning: {
    main: colors.orange[400],
    dark: colors.orange[600],
    light: colors.orange[200],
    contrastText: 'rgba(0,0,0,0.87)',
  },
  action: {
    activatedOpacity: 0.56,
    hoverOpacity: 0.08,
    selectedOpacity: 0.16,
    focusOpacity: 0.12,
    disabledOpacity: 0.38,
    disabledBackground: 'rgba(255,255,255,0.12)',
  },
  background: {
    default: colors.navy[900],
    paper: '#071433',
  },
  divider: 'rgba(255,255,255,0.12)',
} satisfies PaletteOptions;

const typography = {
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

const components = {
  MuiBadge: {
    defaultProps: {
      variant: 'standard',
      color: 'error',
      anchorOrigin: { vertical: 'top', horizontal: 'right' },
    },
    styleOverrides: {
      colorPrimary: ({ theme }) => {
        return theme.unstable_sx({
          backgroundColor:
            theme.palette.mode === 'dark'
              ? theme.palette.primary.dark
              : undefined,
          color:
            theme.palette.mode === 'dark'
              ? theme.palette.common.white
              : undefined,
        });
      },
    },
  },
  MuiButton: {
    defaultProps: {
      variant: 'contained',
      size: 'medium',
      color: 'primary',
      disableElevation: true,
    },
    styleOverrides: {
      root: ({ theme }) =>
        theme.unstable_sx({
          textTransform: 'none',
          borderRadius: '0.5rem',
        }),
    },
  },
  MuiLoadingButton: {
    defaultProps: {
      variant: 'contained',
      size: 'medium',
      color: 'primary',
      disableElevation: true,
    },
    styleOverrides: {
      root: ({ theme }) =>
        theme.unstable_sx({
          textTransform: 'none',
          borderRadius: '0.5rem',
        }),
    },
  },
  MuiButtonGroup: {
    defaultProps: {
      variant: 'contained',
      color: 'primary',
      size: 'medium',
      disableElevation: true,
    },
  },
  MuiCheckbox: {
    defaultProps: {
      size: 'small',
      color: 'primary',
      indeterminate: false,
    },
    styleOverrides: {
      root: ({ theme }) =>
        theme.unstable_sx({
          padding: '0.5rem',
        }),
    },
  },
  MuiFormControlLabel: {
    defaultProps: {
      componentsProps: {
        typography: { variant: 'body2' },
      },
    },
  },
  MuiToggleButton: {
    defaultProps: {
      color: 'primary',
      size: 'medium',
    },
    styleOverrides: {
      root: ({ theme }) =>
        theme.unstable_sx({
          textTransform: 'none',
          borderRadius: '0.5rem',
          color: theme.palette.text.secondary,
          backgroundColor: theme.palette.secondary.main,
          '&.Mui-selected': {
            color:
              theme.palette.mode === 'light'
                ? theme.palette.text.primary
                : theme.palette.common.white,
            backgroundColor: theme.palette.secondary.dark,
          },
        }),
    },
    variants: [
      {
        props: {
          size: 'small',
        },
        style: ({ theme }) =>
          theme.unstable_sx({
            padding: '0.188rem',
          }),
      },
      {
        props: {
          size: 'medium',
        },
        style: ({ theme }) =>
          theme.unstable_sx({
            padding: '0.375rem',
          }),
      },
      {
        props: {
          size: 'large',
        },
        style: ({ theme }) =>
          theme.unstable_sx({
            padding: '0.563rem',
          }),
      },
    ],
  },
  MuiToggleButtonGroup: {
    defaultProps: {
      color: 'primary',
      size: 'medium',
    },
  },
  MuiRadio: {
    defaultProps: {
      color: 'primary',
      size: 'small',
    },
    styleOverrides: {
      root: ({ theme }) =>
        theme.unstable_sx({
          padding: '0.5rem',
        }),
    },
    variants: [
      {
        props: {
          size: 'small',
        },
        style: ({ theme }) =>
          theme.unstable_sx({
            '& .MuiSvgIcon-root': {
              width: '1.25rem',
              height: '1.25rem',
            },
          }),
      },
      {
        props: {
          size: 'medium',
        },
        style: ({ theme }) =>
          theme.unstable_sx({
            '& .MuiSvgIcon-root': {
              width: '1.5rem',
              height: '1.5rem',
            },
          }),
      },
    ],
  },
  MuiSelect: {
    styleOverrides: {
      root: ({ theme }) =>
        theme.unstable_sx({
          '& .MuiInputBase-root': {
            borderRadius: '0.5rem',
          },
        }),
    },
  },
  MuiSkeleton: {
    defaultProps: {
      variant: 'text',
      animation: 'pulse',
    },
  },
  MuiTextField: {
    defaultProps: {
      variant: 'outlined',
      size: 'medium',
      minRows: 4,
      maxRows: 4,
    },
    styleOverrides: {
      root: ({ theme }) =>
        theme.unstable_sx({
          '& .MuiInputBase-root': {
            borderRadius: '0.5rem',
          },
          minWidth: '13.75rem',
          fontSize: '1rem',
        }),
    },
  },
  MuiAvatar: {
    defaultProps: {
      variant: 'circular',
    },
    styleOverrides: {
      root: ({ theme }) =>
        theme.unstable_sx({
          height: '2rem',
          width: '2rem',
          fontSize: '1.125rem',
          backgroundColor: theme.palette.primary.light,
        }),
    },
  },
  MuiCard: {
    defaultProps: {
      elevation: 2,
    },
  },
  MuiOutlinedInput: {
    defaultProps: {
      minRows: 4,
      maxRows: 4,
    },
    styleOverrides: {
      root: ({ theme }) =>
        theme.unstable_sx({
          borderRadius: '0.5rem',
          minWidth: '13.75rem',
        }),
    },
  },
  MuiCssBaseline: {
    styleOverrides: {
      html: {
        textRendering: 'optimizeLegibility',
      },
    },
  },
} satisfies Components<Omit<Theme, 'components'>>;

export const theme = createTheme({
  colorSchemes: {
    light: { palette: lightPalette },
    dark: { palette: darkPalette },
  },
  cssVariables: {
    colorSchemeSelector: 'class',
  },
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

export type Theme = typeof theme;

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
