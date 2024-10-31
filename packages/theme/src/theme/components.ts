import type {} from '@mui/lab/themeAugmentation';
import { type Components, type Theme } from '@mui/material';
import type {} from '@mui/x-data-grid/themeAugmentation';
import type {} from '@mui/x-date-pickers/themeAugmentation';
import type {} from '@mui/x-tree-view/themeAugmentation';

export const components = {
  MuiBadge: {
    defaultProps: {
      variant: 'standard',
      color: 'error',
      anchorOrigin: { vertical: 'top', horizontal: 'right' },
    },
  },
  MuiButton: {
    defaultProps: {
      variant: 'contained',
      size: 'medium',
      color: 'primary',
      disableElevation: true,
    },
  },
  MuiLoadingButton: {
    defaultProps: {
      variant: 'contained',
      size: 'medium',
      color: 'primary',
      disableElevation: true,
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
  },
  MuiSelect: {},
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
  },
  MuiAvatar: {
    defaultProps: {
      variant: 'circular',
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
  },
  MuiCssBaseline: {
    styleOverrides: {
      html: {
        textRendering: 'optimizeLegibility',
      },
    },
  },
} satisfies Components<Omit<Theme, 'components'>>;
