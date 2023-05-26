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

export function useApiTenant() {
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
  }
}
