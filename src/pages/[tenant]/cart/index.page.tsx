/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { FormEvent, useEffect, useState } from 'react'
import { getCookie } from 'cookies-next'

import { Header } from '../../../components/Header'
import { InputField } from '../../../components/InputField'
import { Button } from '../../../components/Button'

import { useApi } from '../../../hooks/useApi'
import { useAppContext } from '../../../hooks/useAppContext'
import { useAuthContext } from '../../../hooks/useAuthContext'
import { useFormatter } from '../../../hooks/useFormatter'

import { Tenant } from '../../../types/Tenant'
import { Product } from '../../../types/Product'
import { User } from '../../../types/user'

import { Container, ProductsAreaListCart, ShippingAreaCart, ResumeAreaCart } from './styles'

type CartProps = {
  tenant: Tenant;
  products: Product[];
  user: User | null;
  token: string;
}

export default function Cart(data: CartProps) {
  const { tenant, setTenant } = useAppContext();
  const { setToken, setUser } = useAuthContext();

  const formatter = useFormatter();

  const [shippingInput, setShippingInput] = useState('')
  const [shippingPrice, setShippingPrice] = useState(0)
  const [subtotal, setSubtotal] = useState(0)

  function handleCalculateShipping(event: FormEvent) {
    event.preventDefault();
  }

  function handleFinish() {

  }

  useEffect(() => {
    setTenant(data.tenant)
    if (data.token) setToken(data.token)
    if (data.user) setUser(data.user)
  }, [])

  return (
    <Container>
      <Head>
        <title>Sacola | {data.tenant.name}</title>
      </Head>

      <Header
        backHref={`${data.tenant.slug}`}
        color={data.tenant.tenantPrimaryColor}
        title='Sacola'
      />

      <main>
        <div className="productsQuantityCart">
          <span>0 itens</span>
        </div>

        <ProductsAreaListCart>

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

          <div className="shippingInfoCart">
            <span className="shippingAddress">Rua bla bla bla</span>

            <div className="shippingTimeCart">
              <p className="shippingTextCart">Receba em até 20 minutos</p>

              <p className="shippingPriceCart">
                {formatter.formatPrice(shippingPrice)}
              </p>
            </div>
          </div>
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

  const products = await api.getAllProducts();

  const token = getCookie('@token', ctx) as string;
  const user = await api.authorizeToken(token);

  console.log(token)

  return {
    props: {
      tenant,
      products,
      user,
      token,
    }
  }
}
