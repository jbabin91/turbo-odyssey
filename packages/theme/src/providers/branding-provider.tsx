import { createContext, useContext } from 'react';

type BrandingState = {
  title?: string;
  logo?: React.ReactNode;
};

export type Branding = BrandingState | null;

const BrandingContext = createContext<Branding>(null);

export type BrandingProviderProps = {
  children: React.ReactNode;
  branding: Branding;
};

export function BrandingProvider({
  children,
  branding = null,
}: BrandingProviderProps) {
  return (
    <BrandingContext.Provider value={branding}>
      {children}
    </BrandingContext.Provider>
  );
}

export function useBranding() {
  const context = useContext(BrandingContext);
  return context;
}
