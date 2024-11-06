import { createContext, useContext, useMemo } from 'react';

const DEFAULT_LOCALE_TEXT = {
  // Account Preview
  iconButtonAriaLabel: 'Current User',
  // Account
  signInLabel: 'Sign In',
  signOutLabel: 'Sign Out',
} as const;

export type LocaleState = {
  signInLabel?: string;
  signOutLabel?: string;
  iconButtonAriaLabel?: string;
};

const LocaleContext = createContext<LocaleState>(DEFAULT_LOCALE_TEXT);

export type LocaleProviderProps = {
  children: React.ReactNode;
  localeText?: Partial<LocaleState>;
};

export function LocaleProvider({ children, localeText }: LocaleProviderProps) {
  const mergedLocaleText = useMemo(
    () => ({
      ...DEFAULT_LOCALE_TEXT,
      ...localeText,
    }),
    [localeText],
  );

  return (
    <LocaleContext.Provider value={mergedLocaleText}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocaleText() {
  const context = useContext(LocaleContext);
  return context;
}
