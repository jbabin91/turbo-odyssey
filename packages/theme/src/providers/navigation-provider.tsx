import { createContext, useContext } from 'react';

export type NavigationPageItem = {
  kind?: 'page';
  segment?: string;
  title?: string;
  icon?: React.ReactNode;
  pattern?: string;
  action?: React.ReactNode;
  children?: Navigation;
};

export type NavigationSubheaderItem = {
  kind: 'header';
  title: string;
};

export type NavigationDividerItem = {
  kind: 'divider';
};

export type NavigationItem =
  | NavigationPageItem
  | NavigationSubheaderItem
  | NavigationDividerItem;

export type Navigation = NavigationItem[];

const NavigationContext = createContext<Navigation>([]);

export type NavigationProviderProps = {
  children: React.ReactNode;
  navigation: Navigation;
};

export function NavigationProvider({
  children,
  navigation,
}: NavigationProviderProps) {
  return (
    <NavigationContext.Provider value={navigation}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  return context;
}
