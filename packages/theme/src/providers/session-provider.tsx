import { createContext, useContext } from 'react';

export type Session = {
  user?: {
    id?: string | undefined | null;
    name?: string | undefined | null;
    email?: string | undefined | null;
    image?: string | undefined | null;
  };
};

const SessionContext = createContext<Session | null>(null);

export type SessionProviderProps = {
  children: React.ReactNode;
  session: Session | null;
};

export function SessionProvider({ children, session }: SessionProviderProps) {
  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);
  return context;
}
