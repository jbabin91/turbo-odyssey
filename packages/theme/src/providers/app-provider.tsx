import { type Theme } from '@mui/material/styles';

import {
  type Authentication,
  AuthenticationProvider,
} from './authentication-provider';
import { type Branding, BrandingProvider } from './branding-provider';
import { LocaleProvider, type useLocaleText } from './locale-provider';
import { type Navigation, NavigationProvider } from './navigation-provider';
import { type Session, SessionProvider } from './session-provider';
import { ThemeProvider } from './theme-provider';

export type AppProviderProps = {
  /**
   * The content of the app provider.
   */
  children: React.ReactNode;
  /**
   * [Theme or themes](https://mui.com/toolpad/core/react-app-provider/#theming) to be used by the app in light/dark mode. A [CSS variables theme](https://mui.com/material-ui/customization/css-theme-variables/overview/) is recommended.
   * @default createTheme()
   */
  theme?: Theme | null;
  /**
   * Branding options for the app.
   * @default null
   */
  branding?: Branding | null;
  /**
   * Navigation definition for the app.
   * @default []
   */
  navigation?: Navigation;
  /**
   * Session info about the current user.
   * @default null
   */
  session?: Session | null;
  /**
   * Authentication methods.
   * @default null
   */
  authentication?: Authentication | null;
  /**
   * The labels for the account component.
   */
  localeText?: Partial<ReturnType<typeof useLocaleText>>;
};

export function AppProvider({
  children,
  theme,
  branding = null,
  navigation = [],
  session = null,
  authentication = null,
  localeText,
}: AppProviderProps) {
  return (
    <LocaleProvider localeText={localeText}>
      <AuthenticationProvider authentication={authentication}>
        <SessionProvider session={session}>
          <NavigationProvider navigation={navigation}>
            <ThemeProvider theme={theme}>
              <BrandingProvider branding={branding}>
                {children}
              </BrandingProvider>
            </ThemeProvider>
          </NavigationProvider>
        </SessionProvider>
      </AuthenticationProvider>
    </LocaleProvider>
  );
}
