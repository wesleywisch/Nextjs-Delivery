/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { getCookie } from 'cookies-next'

import { Header } from '../../../components/Header'
import { InputField } from '../../../components/InputField'
import { Button } from '../../../components/Button'
import { CartProductItem } from '../../../components/CartProductItem'
import { ButtonWithIcon } from '../../../components/ButtonWithIcon'

import { useApi } from '../../../hooks/useApi'
import { useAppContext } from '../../../hooks/useAppContext'
import { useAuthContext } from '../../../hooks/useAuthContext'
import { useFormatter } from '../../../hooks/useFormatter'

import { Tenant } from '../../../types/Tenant'
import { CartIem } from '../../../types/CartItem'
import { User } from '../../../types/user'
import { Address } from '../../../types/Address'

import { Container, SectionInfoGroupCheckout, ProductsAreaListCart, ResumeAreaCart } from './styles'

type CheckoutProps = {
  tenant: Tenant;
  user: User | null;
  token: string;
  cart: CartIem[];
}

export default function Checkout(data: CheckoutProps) {
  const { tenant, setTenant } = useAppContext();
  const { setToken, setUser } = useAuthContext();

  const formatter = useFormatter();
  const router = useRouter();

  const [cart, setCart] = useState<CartIem[]>(data.cart);
  const [subtotal, setSubtotal] = useState(0);
  const [shippingPrice, setShippingPrice] = useState(0);
  const [shippingAddress, setShippingAddress] = useState<Address>();
  const [paymentType, setPaymentType] = useState<'money' | 'card'>('money');
  const [paymentChange, setPaymentChange] = useState(0);
  const [coupon, setCoupon] = useState('');
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponInput, setCouponInput] = useState('');

  async function handleChangeAddress() {
    // await router.push(`/${data.tenant.slug}/myaddresses`)
    setShippingAddress({
      id: '1',
      zipcode: '99999999',
      street: 'Rua das flores',
      number: '321',
      neighborhood: 'Jardins',
      city: 'São Paulo',
      state: 'SP',
    });
    setShippingPrice(9.50);
  }

  function handleSetCoupon() {
    if (couponInput) {
      setCoupon(couponInput);
      setCouponDiscount(15.20);
    }
  }

  function handleFinish() {

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
        <title>Checkout | {data.tenant.name}</title>
      </Head>

      <Header
        backHref={`/${data.tenant.slug}`}
        color={data.tenant.tenantPrimaryColor}
        title='Checkout'
      />

      <main>

        <SectionInfoGroupCheckout className="infoGroupCheckout">
          <div className="infoAreaCheckout">
            <span className="infoTitleCheckout">Endereço</span>
            <div className="infoBodyCheckout">
              <ButtonWithIcon
                tenantColor={data.tenant.tenantPrimaryColor}
                leftIcon='location'
                rightIcon='rightArrow'
                value={shippingAddress ? `${shippingAddress.number} - ${shippingAddress.street} - ${shippingAddress.city}` : 'Escolha um endereço'}
                onClick={handleChangeAddress}
              />
            </div>
          </div>

          <div className="infoAreaCheckout">
            <span className="infoTitleCheckout">Tipo de pagamento</span>
            <div className="infoBodyCheckout">
              <div className="paymentTypes">
                <div className="paymentBtn">
                  <ButtonWithIcon
                    tenantColor={data.tenant.tenantPrimaryColor}
                    leftIcon='money'
                    value='Dinheiro'
                    onClick={() => setPaymentType('money')}
                    fill={paymentType === 'money'}
                  />
                </div>

                <div className="paymentBtn">
                  <ButtonWithIcon
                    tenantColor={data.tenant.tenantPrimaryColor}
                    leftIcon='card'
                    value='Cartão'
                    onClick={() => setPaymentType('card')}
                    fill={paymentType === 'card'}
                  />
                </div>
              </div>
            </div>
          </div>

          {paymentType === 'money' && (
            <div className="infoAreaCheckout">
              <span className="infoTitleCheckout">Troco</span>
              <div className="infoBodyCheckout">
                <InputField
                  color={data.tenant.tenantPrimaryColor}
                  placeholder="Quanto você tem em dinheiro"
                  value={paymentChange ? paymentChange.toString() : ''}
                  onChange={newValue => setPaymentChange(Number(newValue))}
                />
              </div>
            </div>
          )}

          <div className="infoAreaCheckout">
            <span className="infoTitleCheckout">Cupom de desconto</span>
            <div className="infoBodyCheckout">
              {coupon ? (
                <ButtonWithIcon
                  tenantColor={data.tenant.tenantPrimaryColor}
                  leftIcon='coupon'
                  rightIcon='checked'
                  value={coupon.toUpperCase()}
                  onClick={() => { }}
                />
              ) : (
                <div className="couponInput">
                  <InputField
                    color={data.tenant.tenantPrimaryColor}
                    placeholder='Possui algum cupom?'
                    value={couponInput}
                    onChange={newValue => setCouponInput(newValue)}
                  />

                  <Button
                    tenantColor={data.tenant.tenantPrimaryColor}
                    label="Ok"
                    handleOnClick={handleSetCoupon}
                    notWidth
                  />
                </div>
              )}
            </div>
          </div>
        </SectionInfoGroupCheckout>

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
              onChange={() => { }}
              noEdit
            />
          ))}
        </ProductsAreaListCart>

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

          {couponDiscount > 0 && (
            <div className="resumeItemCart">
              <p className="resumeLeftCart">Desconto</p>

              <span className="resumeRightCart discount">
                - {formatter.formatPrice(couponDiscount)}
              </span>
            </div>
          )}

          <div className="resumeLineCart" />

          <div className="resumeItemCart">
            <p className="resumeLeftCart">Total</p>

            <span className="resumeRightBigCart">
              {formatter.formatPrice(subtotal - couponDiscount + shippingPrice)}
            </span>
          </div>

          <div className="resumeButtonCart">
            <Button
              tenantColor={data.tenant.tenantPrimaryColor}
              label='Finalizar pedido'
              handleOnClick={handleFinish}
              disabled={!shippingAddress}
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
