'use client'
import { api } from "../lib/api";
import { useParams } from 'next/navigation'

import { CategoryProduct } from "../types/CategoryProduct";
import { OrderStatus } from "../types/OrderStatus";
import { OrderUserInTenant } from "../types/OrderUserInTenant";
import { Product } from "../types/Product";

const TemporaryOneProduct: Product = {
  id: '1',
  image: "/tmp/burger.png",
  category: {
    id: '123',
    name: 'Burgers'
  },
  name: "Texas Burger",
  price: 25.50,
  description: "2 Blends de carne de 150g, Queijo Cheddar, Bacon Caramelizado, Salada, Molho da casa, Pão brioche artesanal."
}

type Params = {
  tenant: string
}

type CreateProduct = {
  name: string
  image: string
  price: string
  description?: string
  category_id: string
}

type EditProduct = {
  productId: string;
  name: string
  image: string
  price: string
  description?: string
  category_id: string
}

export function useApiTenant() {
  const params = useParams() as Params;

  return {
    login: async (email: string, password: string): Promise<{ error: string, token?: string }> => {
      return new Promise(resolve => {
        setTimeout(() => {
          if (email !== 'adminTenant@admin.com') {
            return resolve({
              error: 'E-mail e/ou senha estão errados.'
            });
          }

          return resolve({
            error: '',
            token: 'adminTenantLogged123',
          })
        }, 1000)
      })
    },
    forgotPassword: async (email: string): Promise<{ error: string }> => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve({ error: '' })
        }, 1000)
      })
    },
    redefinePassword: async (password: string, token: string): Promise<{ error: string }> => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve({ error: '' })
        }, 1000)
      })
    },
    getOrders: async (): Promise<OrderUserInTenant[]> => {
      return new Promise(resolve => {
        setTimeout(() => {
          const orders: OrderUserInTenant[] = [];
          const statuses: OrderStatus[] = ['preparing', 'sent', 'delivered']

          for (let i = 0; i < 6; i++) {
            orders.push({
              id: `12${i}`,
              status: statuses[Math.floor(Math.random() * 3)],
              orderDate: '2023-05-15 19:00',
              userId: '1',
              userName: 'Wesley',
              shippingAddress: {
                id: '99',
                zipcode: '99999999',
                street: 'Rua Santos do Pedro',
                number: '87',
                neighborhood: 'Centro',
                city: 'Santa Catarina',
                state: 'SC',
                complement: 'Apto 309',
              },
              shippingPrice: 80,
              paymentType: 'card',
              changeValue: 0,
              coupon: 'ABC12',
              couponDiscount: 2,
              products: [
                { quantity: 2, product: TemporaryOneProduct, },
                { quantity: 2, product: { ...TemporaryOneProduct, id: '8888', name: 'Burger Vegetariano' }, },
              ],
              subTotal: 99,
              total: 120,
            })
          }

          resolve(orders)
        }, 1000)
      })
    },
    changeOrderStatus: async (id: string, newStatus: OrderStatus) => {
      return true
    },
    getCategories: async (): Promise<CategoryProduct[]> => {
      const list = await api.get(`/${params.tenant}/categories`)

      return list.data;
    },
    getProducts: async (): Promise<Product[]> => {
      const products = await api.get(`/${params.tenant}/products`)

      return products.data;
    },
    deleteProduct: async (id: string): Promise<boolean> => {
      const response = await api.delete(`/${params.tenant}/products?id=${id}`)

      if (response.status === 200) {
        return true;
      }

      return false;
    },
    createProduct: async (data: CreateProduct): Promise<boolean> => {
      const response = await api.post(`/${params.tenant}/products`, {
        data,
      })

      if (response.status === 200) {
        return true;
      }

      return false;
    },
    updateProduct: async (data: EditProduct): Promise<boolean> => {
      const response = await api.put(`/${params.tenant}/products`, {
        data,
      })

      if (response.status === 200) {
        return true;
      }

      return false;
    },
  }
}
