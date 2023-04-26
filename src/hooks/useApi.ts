import { Tenant } from "../types/Tenant";

export function useApi() {
  return {
    getTenant: (tenantSlug: string): boolean | Tenant => {
      switch(tenantSlug) {
        case 'B7Burger':
          return {
            slug: 'B7Burger',
            name: 'B7Burger',
            tenantPrimaryColor: '#ff0000',
            tenantSecondaryColor: '#00ff00',
          }
        case 'B7Pizza':
          return {
            slug: 'B7Pizza',
            name: 'B7Pizza',
            tenantPrimaryColor: '#0000ff',
            tenantSecondaryColor: '#ff0000',
          }
        default: return false;
      }
    }
  }
}
