import { createContext, useContext } from 'react';

export type Authentication = {
  signIn: () => void;
  signOut: () => void;
};

const AuthenticationContext = createContext<Authentication | null>(null);

export type AuthenticationProviderProps = {
  children: React.ReactNode;
  authentication: Authentication | null;
};

export function AuthenticationProvider({
  children,
  authentication,
}: AuthenticationProviderProps) {
  return (
    <AuthenticationContext.Provider value={authentication}>
      {children}
    </AuthenticationContext.Provider>
  );
}

export function useAuthentication() {
  const context = useContext(AuthenticationContext);
  return context;
}
