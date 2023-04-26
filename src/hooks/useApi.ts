export type getTenantResponse = {
  name: string;
  tenantPrimaryColor: string;
  tenantSecondaryColor: string;
}

export function useApi() {
  return {
    getTenant: (tenantSlug: string): boolean | getTenantResponse => {
      switch(tenantSlug) {
        case 'B7Burger':
          return {
            name: 'B7Burger',
            tenantPrimaryColor: '#ff0000',
            tenantSecondaryColor: '#00ff00',
          }
        case 'B7Pizza':
          return {
            name: 'B7Pizza',
            tenantPrimaryColor: '#0000ff',
            tenantSecondaryColor: '#ff0000',
          }
        default: return false;
      }
    }
  }
}
