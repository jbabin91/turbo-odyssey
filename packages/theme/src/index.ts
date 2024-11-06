// MUI Theme
export type { Theme } from './theme/index.js';
export { theme } from './theme/index.js';

// Components
export type {
  AccountPopoverFooterProps,
  AccountPopoverHeaderProps,
  AccountPreviewProps,
  AccountPreviewSlots,
  AccountPreviewVariant,
  AccountProps,
  AccountSlots,
  SignInButtonProps,
  SignOutButtonProps,
} from './components/account';
export {
  Account,
  AccountPopoverFooter,
  AccountPopoverHeader,
  AccountPreview,
  SignInButton,
  SignOutButton,
} from './components/account';
export type { DashboardLayoutProps } from './components/layout/dashboard-layout/index.js';
export { DashboardLayout } from './components/layout/dashboard-layout/index.js';
export { ThemeSwitcher } from './components/layout/dashboard-layout/theme-switcher.js';
export type { PageContainerProps } from './components/layout/page-container.js';
export { PageContainer } from './components/layout/page-container.js';
export type { NotificationsProps } from './components/notifications/index.js';
export { Notifications } from './components/notifications/index.js';
export type { NotificationProps } from './components/notifications/notification.js';
export { Notification } from './components/notifications/notification.js';

// Providers
export type { AppProviderProps } from './providers/app-provider.js';
export { AppProvider } from './providers/app-provider.js';
export type { AuthenticationProviderProps } from './providers/authentication-provider.js';
export { AuthenticationProvider } from './providers/authentication-provider.js';
export type { BrandingProviderProps } from './providers/branding-provider.js';
export { BrandingProvider } from './providers/branding-provider.js';
export type { LocaleProviderProps } from './providers/locale-provider.js';
export { LocaleProvider } from './providers/locale-provider.js';
export type { NavigationProviderProps } from './providers/navigation-provider.js';
export { NavigationProvider } from './providers/navigation-provider.js';
export type { NotificationsProviderProps } from './providers/notifications-provider.js';
export { NotificationsProvider } from './providers/notifications-provider.js';
export type { SessionProviderProps } from './providers/session-provider.js';
export { SessionProvider } from './providers/session-provider.js';
export type { ThemeProviderProps } from './providers/theme-provider.js';
export { ThemeProvider } from './providers/theme-provider.js';

// Hooks
export { useAuthentication } from './providers/authentication-provider.js';
export { useLocaleText } from './providers/locale-provider.js';
export { useNavigation } from './providers/navigation-provider.js';
export { useNotifications } from './providers/notifications-provider.js';
export { useSession } from './providers/session-provider.js';
