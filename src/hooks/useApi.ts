import { Address } from "../types/Address";
import { CartIem } from "../types/CartItem";
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
        products.push({
          ...TemporaryOneProduct,
          id: `${i + 1}`,
        })
      }

      return products;
    },
    getProduct: async (id: string) => {
      return { ...TemporaryOneProduct, id };
    },
    authorizeToken: async (token: string): Promise<User | false> => {
      if (!token) return false;

      return {
        name: 'Teste user',
        email: 'teste@teste.com',
      }
    },
    getCartProducts: async (cartCookie: string) => {
      let cart: CartIem[] = [];

      if (!cartCookie) return cart;

      const cartJson = JSON.parse(cartCookie);

      for (let i in cartJson) {
        if (cartJson[i].id && cartJson[i].quantity) {
          const product = {
            ...TemporaryOneProduct,
            id: cartJson[i].id,
          }

          cart.push({
            quantity: cartJson[i].quantity,
            product,
          })
        }
      }

      return cart;
    },
    getUserAddresses: async (email: string) => {
      const addresses: Address[] = [];

      for (let i = 0; i < 4; i++) {
        addresses.push({
          id: `${i + 1}`,
          street: 'Rua das Flores',
          number: `${i + 1}00`,
          zipcode: '99999-999',
          city: 'São Paulo',
          neighborhood: 'Jardins',
          state: 'SP',
        })
      }

      return addresses;
    },
    getUserAddress: async (addressId: string) => {
      let address: Address = {
        id: addressId,
        street: 'Rua das Flores',
        number: `${addressId}00`,
        zipcode: '99999-999',
        city: 'São Paulo',
        neighborhood: 'Jardins',
        state: 'SP',
      }

      return address;
    },
    addUserAddress: async (address: Address) => {
      return address;
    },
    editUserAddress: async (newAddressData: Address) => {
      return true;
    },
    getShippingPrice: async (address: Address) => {
      return 9.16;
    },
  }
}
