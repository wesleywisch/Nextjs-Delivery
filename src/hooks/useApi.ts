import { Product } from "../types/Product";
import { Tenant } from "../types/Tenant";
import { User } from "../types/user";

const TemporaryOneProduct: Product = {
  id: '1',
  image: "/tmp/burger.png",
  categoryName: "Tradicional",
  name: "Texas Burger",
  price: 25.50,
  description: "2 Blends de carne de 150g, Queijo Cheddar, Bacon Caramelizado, Salada, Molho da casa, Pão brioche artesanal."
}

export function useApi(tenantSlug: string) {
  return {
    getTenant: async (): Promise<boolean | Tenant> => {
      switch(tenantSlug) {
        case 'B7Burger':
          return {
            slug: 'B7Burger',
            name: 'B7Burger',
            tenantPrimaryColor: '#fb9400',
            tenantSecondaryColor: '#fff9f2',
          }
        case 'B7Pizza':
          return {
            slug: 'B7Pizza',
            name: 'B7Pizza',
            tenantPrimaryColor: '#6ab70a',
            tenantSecondaryColor: '#e0e0e0',
          }
        default: return false;
      }
    },
    getAllProducts: async () => {
      let products = []

      for (let i = 0; i < 10; i++) {
        products.push(TemporaryOneProduct)
      }

      return products;
    },
    getProduct: async (id: string) => {
      return TemporaryOneProduct;
    },
    authorizeToken: async (token: string): Promise<User | false> => {
      if (!token) return false;

      return {
        name: 'Teste user',
        email: 'teste@teste.com',
      }
    }
  }
}
