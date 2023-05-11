/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { FormEvent, useEffect, useState } from 'react'
import { getCookie } from 'cookies-next'

import { Header } from '../../../../components/Header'
import { Button } from '../../../../components/Button'
import { InputField } from '../../../../components/InputField'

import { useApi } from '../../../../hooks/useApi'
import { useAppContext } from '../../../../hooks/useAppContext'
import { useAuthContext } from '../../../../hooks/useAuthContext'
import { useFormatter } from '../../../../hooks/useFormatter'

import { Tenant } from '../../../../types/Tenant'
import { Address } from '../../../../types/Address'
import { User } from '../../../../types/user'

import { Container, InputsArea } from './styles'

type CheckoutProps = {
  tenant: Tenant;
  user: User | null;
  token: string;
  addresses: Address[];
}

export default function NewAddress(data: CheckoutProps) {
  const { tenant, setTenant, setShippingAddress, setShippingPrice } = useAppContext();
  const { setToken, setUser } = useAuthContext();

  const api = useApi(data.tenant.slug);

  const formatter = useFormatter();
  const router = useRouter();

  const [errorsFields, setErrorFields] = useState<string[]>([]);
  const [addressZipcode, setAddressZipcode] = useState('');
  const [addressStreet, setAddressStreet] = useState('');
  const [addressNumber, setAddressNumber] = useState('');
  const [addressNeighborhood, setAddressNeighborhood] = useState('');
  const [addressCity, setAddressCity] = useState('');
  const [addressState, setAddressState] = useState('');
  const [addressComplement, setAddressComplement] = useState('');

  function verifyAddress() {
    let approved = true;
    let newErrorFields = [];

    if (addressZipcode.replaceAll(/[^0-9]/g, '').length !== 8) {
      newErrorFields.push('zipcode');
      approved = false;
    }
    if (addressStreet.length <= 2) {
      newErrorFields.push('street');
      approved = false;
    }
    if (addressNumber.length <= 1) {
      newErrorFields.push('number');
      approved = false;
    }
    if (addressNeighborhood.length <= 2) {
      newErrorFields.push('neighborhood');
      approved = false;
    }
    if (addressCity.length <= 2) {
      newErrorFields.push('city');
      approved = false;
    }
    if (addressState.length !== 2) {
      newErrorFields.push('state');
      approved = false;
    }

    setErrorFields(newErrorFields);
    return approved;
  }

  async function handleNewAddress(event: FormEvent) {
    event.preventDefault();

    if (verifyAddress()) {
      let address: Address = {
        id: '123',
        zipcode: addressZipcode,
        city: addressCity,
        neighborhood: addressNeighborhood,
        number: addressNumber,
        state: addressState,
        street: addressStreet,
        complement: addressComplement,
      }

      let newAddress = await api.addUserAddress(address);

      if (newAddress.id !== '') {
        await router.push(`/${data.tenant.slug}/myaddresses`);
      } else {
        alert('Ocorreu um erro! Tente novamente.')
      }
    }
  }

  useEffect(() => {
    setTenant(data.tenant)
    if (data.token) setToken(data.token)
    if (data.user) setUser(data.user)
  }, [])

  return (
    <Container>
      <Head>
        <title>Novo Endereço | {data.tenant.name}</title>
      </Head>

      <Header
        backHref={`/${data.tenant.slug}/myaddresses`}
        color={data.tenant.tenantPrimaryColor}
        title='Novo Endereço'
      />

      <main>
        <InputsArea>
          <form onSubmit={handleNewAddress}>
            <div className="inputRow">
              <div className="inputColumn">
                <label htmlFor='zipcode'>CEP</label>

                <InputField
                  id="zipcode"
                  color={data.tenant.tenantPrimaryColor}
                  placeholder='Digite um CEP'
                  value={addressZipcode}
                  onChange={value => setAddressZipcode(value)}
                  error={errorsFields.includes('zipcode')}
                />
              </div>
            </div>

            <div className="inputRow">
              <div className="inputColumn">
                <label htmlFor='street'>Rua</label>

                <InputField
                  id="street"
                  color={data.tenant.tenantPrimaryColor}
                  placeholder='Digite uma rua'
                  value={addressStreet}
                  onChange={value => setAddressStreet(value)}
                  error={errorsFields.includes('street')}
                />
              </div>

              <div className="inputColumn">
                <label htmlFor='number'>Número</label>

                <InputField
                  id="number"
                  color={data.tenant.tenantPrimaryColor}
                  placeholder='Digite um número'
                  value={addressNumber}
                  onChange={value => setAddressNumber(value)}
                  error={errorsFields.includes('number')}
                />
              </div>
            </div>

            <div className="inputRow">
              <div className="inputColumn">
                <label htmlFor='neighborhood'>Bairro</label>

                <InputField
                  id="neighborhood"
                  color={data.tenant.tenantPrimaryColor}
                  placeholder='Digite um bairro'
                  value={addressNeighborhood}
                  onChange={value => setAddressNeighborhood(value)}
                  error={errorsFields.includes('neighborhood')}
                />
              </div>
            </div>

            <div className="inputRow">
              <div className="inputColumn">
                <label htmlFor='city'>Cidade</label>

                <InputField
                  id="city"
                  color={data.tenant.tenantPrimaryColor}
                  placeholder='Digite uma cidade'
                  value={addressCity}
                  onChange={value => setAddressCity(value)}
                  error={errorsFields.includes('city')}
                />
              </div>
            </div>

            <div className="inputRow">
              <div className="inputColumn">
                <label htmlFor='state'>Estado</label>

                <InputField
                  id="state"
                  color={data.tenant.tenantPrimaryColor}
                  placeholder='Digite um estado'
                  value={addressState}
                  onChange={value => setAddressState(value)}
                  error={errorsFields.includes('state')}
                />
              </div>
            </div>

            <div className="inputRow">
              <div className="inputColumn">
                <label htmlFor='complement'>Complemento</label>

                <InputField
                  id="complement"
                  color={data.tenant.tenantPrimaryColor}
                  placeholder='Digite um complemento'
                  value={addressComplement}
                  onChange={value => setAddressComplement(value)}
                  error={errorsFields.includes('complement')}
                />
              </div>
            </div>

            <div className="btnArea">
              <Button
                tenantColor={data.tenant.tenantPrimaryColor}
                label="Adicionar"
                handleOnClick={handleNewAddress}
                type='submit'
                fill
              />
            </div>
          </form>
        </InputsArea>
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

  const addresses = await api.getUserAddress(user.email);

  return {
    props: {
      tenant,
      user,
      token,
      addresses,
    }
  }
}
