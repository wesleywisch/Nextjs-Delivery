/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { getCookie } from 'cookies-next'

import { Header } from '../../../components/Header'
import { Button } from '../../../components/Button'
import { AddressItem } from '../../../components/AddressItem'

import { useApi } from '../../../hooks/useApi'
import { useAppContext } from '../../../hooks/useAppContext'
import { useAuthContext } from '../../../hooks/useAuthContext'
import { useFormatter } from '../../../hooks/useFormatter'

import { Tenant } from '../../../types/Tenant'
import { Address } from '../../../types/Address'
import { User } from '../../../types/user'

import { Container, SectionListAddress } from './styles'

type CheckoutProps = {
  tenant: Tenant;
  user: User | null;
  token: string;
  addresses: Address[];
}

export default function MyAddress(data: CheckoutProps) {
  const { tenant, setTenant, setShippingAddress, setShippingPrice } = useAppContext();
  const { setToken, setUser } = useAuthContext();

  const api = useApi(data.tenant.slug);

  const formatter = useFormatter();
  const router = useRouter();

  const [menuOpened, setMenuOpened] = useState('');

  async function handleAddressSelect(address: Address) {
    const price = await api.getShippingPrice(address);

    if (price) {
      setShippingAddress(address);
      setShippingPrice(price);
      await router.push(`/${data.tenant.slug}/checkout`)
    }
  }

  async function handleAddressEdit(id: string) {
    await router.push(`/${data.tenant.slug}/address/${id}`);
  }

  function handleAddressDelete(id: string) { }

  async function handleNewAddress() {
    await router.push(`/${data.tenant.slug}/address/new`);
  }

  function handleMenuEvent(event: MouseEvent) {
    const tagName = (event.target as Element).tagName;

    if (!['path', 'svg'].includes(tagName)) {
      setMenuOpened('');
    }
  }

  useEffect(() => {
    window.removeEventListener('click', handleMenuEvent);
    window.addEventListener('click', handleMenuEvent);
    return () => window.removeEventListener('click', handleMenuEvent);
  }, [menuOpened])

  useEffect(() => {
    setTenant(data.tenant)
    if (data.token) setToken(data.token)
    if (data.user) setUser(data.user)
  }, [])

  return (
    <Container>
      <Head>
        <title>Meus Endereços | {data.tenant.name}</title>
      </Head>

      <Header
        backHref={`/${data.tenant.slug}/checkout`}
        color={data.tenant.tenantPrimaryColor}
        title='Meus Endereços'
      />

      <main>
        <SectionListAddress>
          {data.addresses.length > 0 && data.addresses.map((address, key) => (
            <AddressItem
              key={key}
              tenantColor={data.tenant.tenantPrimaryColor}
              address={address}
              onSelect={handleAddressSelect}
              onEdit={handleAddressEdit}
              onDelete={handleAddressDelete}
              menuOpened={menuOpened}
              setMenuOpened={setMenuOpened}
            />
          ))}
        </SectionListAddress>

        <div className="btnArea">
          <Button
            tenantColor={data.tenant.tenantPrimaryColor}
            label="Novo endereço"
            handleOnClick={handleNewAddress}
            fill
          />
        </div>
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

  if (!user) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }

  const addresses = await api.getUserAddresses(user.email);

  return {
    props: {
      tenant,
      user,
      token,
      addresses,
    }
  }
}
