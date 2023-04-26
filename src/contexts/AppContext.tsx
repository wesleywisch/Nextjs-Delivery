import { ReactNode, createContext, useState } from 'react';

import { Tenant } from '../types/Tenant';

type AppContextProps = {
  tenant: Tenant | null;
  setTenant: (newTenant: Tenant) => void;
}

const defaultValues: AppContextProps = {
  tenant: null,
  setTenant: () => null,
}

export const AppContext = createContext<AppContextProps>(defaultValues);

export function AppContextProvider({ children }: { children: ReactNode }) {
  const [tenant, setTenant] = useState<Tenant | null>(null)

  return (
    <AppContext.Provider
      value={{
        tenant,
        setTenant,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
