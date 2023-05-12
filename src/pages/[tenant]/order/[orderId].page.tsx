/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { getCookie } from 'cookies-next'

import { Header } from '../../../components/Header'
import { InputField } from '../../../components/InputField'
import { CartProductItem } from '../../../components/CartProductItem'
import { ButtonWithIcon } from '../../../components/ButtonWithIcon'

import { useApi } from '../../../hooks/useApi'
import { useAppContext } from '../../../hooks/useAppContext'
import { useAuthContext } from '../../../hooks/useAuthContext'
import { useFormatter } from '../../../hooks/useFormatter'

import { Tenant } from '../../../types/Tenant'
import { User } from '../../../types/user'
import { Order } from '../../../types/Order'

import { Container, SectionInfoGroupOrder, ProductsAreaListCart, ResumeAreaCart } from './styles'

type OrderProps = {
  tenant: Tenant;
  user: User | null;
  token: string;
  order: Order;
}

export default function OrderID(data: OrderProps) {
  const { tenant, setTenant } = useAppContext();
  const { setToken, setUser } = useAuthContext();

  const formatter = useFormatter();
  const router = useRouter();

  const orderStatusList = {
    preparing: {
      label: 'Preparando',
      longLabel: 'Preparando o seu pedido...',
      backgroundColor: '#fefae6',
      textColor: '#d4bc34',
      percentage: 25,
    },
    sent: {
      label: 'Enviado',
      longLabel: 'Enviamos o seu pedido!',
      backgroundColor: '#f1f3f8',
      textColor: '#758cbd',
      percentage: 75,
    },
    delivered: {
      label: 'Entregue',
      longLabel: 'Seu pedido foi entregue!',
      backgroundColor: '#f1f8f6',
      textColor: '#6ab70a',
      percentage: 100,
    },
  }

  useEffect(() => {
    if (data.order.status !== 'delivered') {
      setTimeout(() => {
        router.reload();
      }, 60000); // 60s.
    }
  }, [])

  useEffect(() => {
    setTenant(data.tenant)
    if (data.token) setToken(data.token)
    if (data.user) setUser(data.user)
  }, [])

  return (
    <Container
      orderBackgroundColor={orderStatusList[data.order.status].backgroundColor}
      orderTextColor={orderStatusList[data.order.status].textColor}
    >
      <Head>
        <title>Pedido #{`${data.order.id}`} | {data.tenant.name}</title>
      </Head>

      <Header
        backHref={`/${data.tenant.slug}`}
        color={data.tenant.tenantPrimaryColor}
        title={`Pedido #${data.order.id}`}
      />

      <main>
        <div className="lineOrder" />

        {data.order.status !== 'delivered' && (
          <div className="orderStatusArea">
            <div className="orderStatusTitle">
              <span>{orderStatusList[data.order.status].longLabel}</span>
            </div>

            <div className="orderStatusPercentage">
              <div
                className="orderStatusPercentageBar"
                style={{ width: `${orderStatusList[data.order.status].percentage}%` }}
              />
            </div>

            <div className="orderStatusMensagem">
              <p>Aguardando mudança de status...</p>
            </div>
          </div>
        )}

        <div className="orderInfoArea">
          <div className="orderInfoStatus">
            <span>{orderStatusList[data.order.status].label}</span>
          </div>
          <div className="orderInfoQuantity">
            <span>{data.order.products.length} {data.order.products.length === 1 ? 'item' : 'itens'}</span>
          </div>
          <div className="orderInfoDate">
            <span>{formatter.formatDate(data.order.orderDate)}</span>
          </div>
        </div>

        <ProductsAreaListCart>
          {data.order.products.length > 0 && data.order.products.map((item, key) => (
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

        <SectionInfoGroupOrder className="infoGroupOrder">
          <div className="infoAreaOrder">
            <span className="infoTitleOrder">Endereço</span>
            <div className="infoBodyOrder">
              <ButtonWithIcon
                tenantColor={data.tenant.tenantPrimaryColor}
                leftIcon='location'
                rightIcon='rightArrow'
                value={`${data.order.shippingAddress.number} - ${data.order.shippingAddress.street} - ${data.order.shippingAddress.city}`}
                onClick={() => { }}
              />
            </div>
          </div>

          <div className="infoAreaOrder">
            <span className="infoTitleOrder">Tipo de pagamento</span>
            <div className="infoBodyOrder">
              <div className="paymentTypes">
                <div className="paymentBtn">
                  <ButtonWithIcon
                    tenantColor={data.tenant.tenantPrimaryColor}
                    leftIcon='money'
                    value='Dinheiro'
                    onClick={() => { }}
                    fill={data.order.paymentType === 'money'}
                  />
                </div>

                <div className="paymentBtn">
                  <ButtonWithIcon
                    tenantColor={data.tenant.tenantPrimaryColor}
                    leftIcon='card'
                    value='Cartão'
                    onClick={() => { }}
                    fill={data.order.paymentType === 'card'}
                  />
                </div>
              </div>
            </div>
          </div>

          {data.order.paymentType === 'money' && (
            <div className="infoAreaOrder">
              <span className="infoTitleOrder">Troco</span>
              <div className="infoBodyOrder">
                <InputField
                  color={data.tenant.tenantPrimaryColor}
                  placeholder="Quanto você tem em dinheiro"
                  value={data.order.paymentChange?.toString() ?? ''}
                  onChange={() => { }}
                />
              </div>
            </div>
          )}

          {data.order.coupon && (
            <div className="infoAreaOrder">
              <span className="infoTitleOrder">Cupom de desconto</span>
              <div className="infoBodyOrder">
                <ButtonWithIcon
                  tenantColor={data.tenant.tenantPrimaryColor}
                  leftIcon='coupon'
                  rightIcon='checked'
                  value={data.order.coupon.toUpperCase()}
                  onClick={() => { }}
                />
              </div>
            </div>
          )}
        </SectionInfoGroupOrder>

        <ResumeAreaCart tenantColor={data.tenant.tenantPrimaryColor}>
          <div className="resumeItemCart">
            <p className="resumeLeftCart">Subtotal</p>

            <span className="resumeRightCart">
              {formatter.formatPrice(data.order.subTotal)}
            </span>
          </div>

          <div className="resumeItemCart">
            <p className="resumeLeftCart">Frete</p>

            <span className="resumeRightCart">
              {data.order.shippingPrice > 0 ? formatter.formatPrice(data.order.shippingPrice) : '--'}
            </span>
          </div>

          {data.order.couponDiscount && (
            <div className="resumeItemCart">
              <p className="resumeLeftCart">Desconto</p>

              <span className="resumeRightCart discount">
                - {formatter.formatPrice(data.order.couponDiscount)}
              </span>
            </div>
          )}

          <div className="resumeLineCart" />

          <div className="resumeItemCart">
            <p className="resumeLeftCart">Total</p>

            <span className="resumeRightBigCart">
              {formatter.formatPrice(data.order.total)}
            </span>
          </div>
        </ResumeAreaCart>
      </main>
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { tenant: tenantSlug, orderId } = ctx.query;
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

  const order = await api.getOrder(orderId as string);

  return {
    props: {
      tenant,
      user,
      token,
      order,
    }
  }
}
