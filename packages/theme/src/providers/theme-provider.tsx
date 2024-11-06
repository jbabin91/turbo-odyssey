import { CssBaseline, type Theme } from '@mui/material';
import MUIThemeProvider, {
  type ThemeProviderProps as MUIThemeProviderProps,
} from '@mui/material/styles/ThemeProvider';

import { theme as appTheme } from '../theme';

export type ThemeProviderProps = {
  theme?: Theme | null;
} & Omit<MUIThemeProviderProps<Theme>, 'theme'>;

export function ThemeProvider({
  children,
  theme = null,
  ...props
}: ThemeProviderProps) {
  const muiTheme = theme ?? appTheme;

  return (
    <MUIThemeProvider {...props} defaultMode="dark" theme={muiTheme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
}
