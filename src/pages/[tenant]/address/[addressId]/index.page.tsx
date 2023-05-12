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
  address: Address;
}

export default function EditAddress(data: CheckoutProps) {
  const { tenant, setTenant, setShippingAddress, setShippingPrice } = useAppContext();
  const { setToken, setUser } = useAuthContext();

  const api = useApi(data.tenant.slug);

  const formatter = useFormatter();
  const router = useRouter();

  const [errorsFields, setErrorFields] = useState<string[]>([]);
  const [address, setAddress] = useState<Address>(data.address);

  function handleChangeAddressField(
    field: keyof Address,
    value: typeof address[keyof Address]
  ) {
    setAddress({ ...address, [field]: value })
  }

  function verifyAddress() {
    let approved = true;
    let newErrorFields = [];

    if (address.zipcode.replaceAll(/[^0-9]/g, '').length !== 8) {
      newErrorFields.push('zipcode');
      approved = false;
    }
    if (address.street.length <= 2) {
      newErrorFields.push('street');
      approved = false;
    }
    if (address.number.length <= 1) {
      newErrorFields.push('number');
      approved = false;
    }
    if (address.neighborhood.length <= 2) {
      newErrorFields.push('neighborhood');
      approved = false;
    }
    if (address.city.length <= 2) {
      newErrorFields.push('city');
      approved = false;
    }
    if (address.state.length !== 2) {
      newErrorFields.push('state');
      approved = false;
    }

    setErrorFields(newErrorFields);
    return approved;
  }

  async function handleSaveAddress(event: FormEvent) {
    event.preventDefault();

    if (verifyAddress()) {
      const response = await api.editUserAddress(address);

      if (response === true) {
        await router.push(`/${data.tenant.slug}/myaddresses`)
      } else {
        alert('Não foi possível salvar o endereço! Tente novamente.')
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
        <title>Editar Endereço | {data.tenant.name}</title>
      </Head>

      <Header
        backHref={`/${data.tenant.slug}/myaddresses`}
        color={data.tenant.tenantPrimaryColor}
        title='Editar Endereço'
      />

      <main>
        <InputsArea>
          <form onSubmit={handleSaveAddress}>
            <div className="inputRow">
              <div className="inputColumn">
                <label htmlFor='zipcode'>CEP</label>

                <InputField
                  id="zipcode"
                  color={data.tenant.tenantPrimaryColor}
                  placeholder='Digite um CEP'
                  value={address.zipcode}
                  onChange={value => handleChangeAddressField('zipcode', value)}
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
                  value={address.street}
                  onChange={value => handleChangeAddressField('street', value)}
                  error={errorsFields.includes('street')}
                />
              </div>

              <div className="inputColumn">
                <label htmlFor='number'>Número</label>

                <InputField
                  id="number"
                  color={data.tenant.tenantPrimaryColor}
                  placeholder='Digite um número'
                  value={address.number}
                  onChange={value => handleChangeAddressField('number', value)}
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
                  value={address.neighborhood}
                  onChange={value => handleChangeAddressField('neighborhood', value)}
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
                  value={address.city}
                  onChange={value => handleChangeAddressField('city', value)}
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
                  value={address.state}
                  onChange={value => handleChangeAddressField('state', value)}
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
                  value={address.complement ?? ''}
                  onChange={value => handleChangeAddressField('complement', value)}
                  error={errorsFields.includes('complement')}
                />
              </div>
            </div>

            <div className="btnArea">
              <Button
                tenantColor={data.tenant.tenantPrimaryColor}
                label="Atualizar"
                handleOnClick={handleSaveAddress}
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
  const { tenant: tenantSlug, addressId } = ctx.query;
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

  const address = await api.getUserAddress(addressId as string);

  if (!address) {
    if (!tenant) {
      return {
        redirect: {
          destination: '/myaddresses',
          permanent: false,
        }
      }
    }
  }

  return {
    props: {
      tenant,
      user,
      token,
      address,
    }
  }
}
