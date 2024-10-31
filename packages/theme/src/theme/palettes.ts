import colors from '@jbabin91/design-tokens/colors';
import { type PaletteOptions } from '@mui/material';

export const lightPalette = {
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

export const darkPalette = {
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
