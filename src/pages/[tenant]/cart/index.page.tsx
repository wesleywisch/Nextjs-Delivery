/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { FormEvent, useEffect, useState } from 'react'
import { getCookie, setCookie } from 'cookies-next'

import { Header } from '../../../components/Header'
import { InputField } from '../../../components/InputField'
import { Button } from '../../../components/Button'
import { CartProductItem } from '../../../components/CartProductItem'

import { useApi } from '../../../hooks/useApi'
import { useAppContext } from '../../../hooks/useAppContext'
import { useAuthContext } from '../../../hooks/useAuthContext'
import { useFormatter } from '../../../hooks/useFormatter'

import { Tenant } from '../../../types/Tenant'
import { CartIem } from '../../../types/CartItem'
import { User } from '../../../types/user'
import { CartCookie } from '../../../types/CartCookie'

import { Container, ProductsAreaListCart, ShippingAreaCart, ResumeAreaCart } from './styles'

type CartProps = {
  tenant: Tenant;
  user: User | null;
  token: string;
  cart: CartIem[];
}

export default function Cart(data: CartProps) {
  const { tenant, setTenant } = useAppContext();
  const { setToken, setUser } = useAuthContext();

  const formatter = useFormatter();
  const router = useRouter();

  const [cart, setCart] = useState<CartIem[]>(data.cart)
  const [shippingInput, setShippingInput] = useState('')
  const [shippingPrice, setShippingPrice] = useState(0)
  const [shippingTime, setShippingTime] = useState(0)
  const [shippingAddress, setShippingAddress] = useState('')
  const [subtotal, setSubtotal] = useState(0)

  function handleCalculateShipping(event: FormEvent) {
    event.preventDefault();
    setShippingPrice(9.50)
    setShippingAddress('Rua 8432')
    setShippingTime(20);
  }

  function handleCartChange(newCount: number, id: string) {
    const tempCart: CartIem[] = [...cart];
    const cartIndex = tempCart.findIndex(item => item.product.id === id);

    if (newCount > 0) {
      tempCart[cartIndex].quantity = newCount;
    } else {
      delete tempCart[cartIndex]
    }

    let newCart: CartIem[] = tempCart.filter(item => item);

    let cartCookie: CartCookie[] = [];

    for (let i in tempCart) {
      cartCookie.push({
        id: tempCart[i].product.id,
        quantity: tempCart[i].quantity,
      })
    }

    setCookie('@cart', JSON.stringify(cartCookie))
    setCart(newCart);
  }

  async function handleFinish() {
    await router.push(`${data.tenant.slug}/checkout`)
  }

  useEffect(() => {
    setTenant(data.tenant)
    if (data.token) setToken(data.token)
    if (data.user) setUser(data.user)
  }, [])

  useEffect(() => {
    let sub = 0;

    for (let i in cart) {
      sub += cart[i].product.price * cart[i].quantity;
    }

    setSubtotal(sub)
  }, [cart])

  return (
    <Container>
      <Head>
        <title>Sacola | {data.tenant.name}</title>
      </Head>

      <Header
        backHref={`/${data.tenant.slug}`}
        color={data.tenant.tenantPrimaryColor}
        title='Sacola'
      />

      <main>
        <div className="productsQuantityCart">
          <span>{cart.length} {cart.length === 1 ? 'item' : 'itens'}</span>
        </div>

        <ProductsAreaListCart>
          {cart.length > 0 && cart.map((item, key) => (
            <CartProductItem
              key={key}
              tenantColor={data.tenant.tenantPrimaryColor}
              productQuantity={item.quantity}
              product={item.product}
              onChange={handleCartChange}
            />
          ))}
        </ProductsAreaListCart>

        <ShippingAreaCart tenantColor={data.tenant.tenantPrimaryColor}>
          <p className="shippingTitle">Calcular frete e prazo.</p>

          <form onSubmit={handleCalculateShipping} className="shippingFormAreaCart">
            <InputField
              color={data.tenant.tenantPrimaryColor}
              placeholder='Digite seu cep'
              value={shippingInput}
              onChange={newValue => setShippingInput(newValue)}
            />

            <Button
              tenantColor={data.tenant.tenantPrimaryColor}
              label='OK'
              handleOnClick={handleCalculateShipping}
              type='submit'
              notWidth
            />
          </form>

          {shippingTime > 0 && (
            <div className="shippingInfoCart">
              <span className="shippingAddress">{shippingAddress}</span>

              <div className="shippingTimeCart">
                <p className="shippingTextCart">Receba em até {shippingTime} minutos</p>

                <p className="shippingPriceCart">
                  {formatter.formatPrice(shippingPrice)}
                </p>
              </div>
            </div>
          )}
        </ShippingAreaCart>

        <ResumeAreaCart tenantColor={data.tenant.tenantPrimaryColor}>
          <div className="resumeItemCart">
            <p className="resumeLeftCart">Subtotal</p>

            <span className="resumeRightCart">
              {formatter.formatPrice(subtotal)}
            </span>
          </div>

          <div className="resumeItemCart">
            <p className="resumeLeftCart">Frete</p>

            <span className="resumeRightCart">
              {shippingPrice > 0 ? formatter.formatPrice(shippingPrice) : '--'}
            </span>
          </div>

          <div className="resumeLineCart" />

          <div className="resumeItemCart">
            <p className="resumeLeftCart">Total</p>

            <span className="resumeRightBigCart">
              {formatter.formatPrice(shippingPrice + subtotal)}
            </span>
          </div>

          <div className="resumeButtonCart">
            <Button
              tenantColor={data.tenant.tenantPrimaryColor}
              label='Continuar'
              handleOnClick={handleFinish}
              fill
            />
          </div>
        </ResumeAreaCart>
      </main>
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { tenant: tenantSlug } = ctx.query;
  const api = useApi(tenantSlug as string);

  const tenant = await api.getTenant();

  if (!tenant) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  const token = getCookie('@token', ctx) as string;
  const user = await api.authorizeToken(token);

  const cartCookie = getCookie('@cart', ctx);
  const cart = await api.getCartProducts(cartCookie as string)

  return {
    props: {
      tenant,
      user,
      token,
      cart,
    }
  }
}
