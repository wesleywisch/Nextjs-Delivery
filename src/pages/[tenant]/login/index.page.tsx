/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'

import { Header } from '../../../components/Header'
import { InputField } from '../../../components/InputField'
import { Button } from '../../../components/Button'

import { useApi } from '../../../hooks/useApi'
import { useAppContext } from '../../../hooks/useAppContext'

import { Tenant } from '../../../types/Tenant'

import { Container } from './styles'

type LoginProps = {
  tenant: Tenant;
}

export default function Login(data: LoginProps) {
  const { tenant, setTenant } = useAppContext();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit() {

  }

  useEffect(() => {
    setTenant(data.tenant)
  }, [])

  return (
    <Container>
      <Head>
        <title>Login | {data.tenant.name}</title>
      </Head>

      <Header
        backHref={`/${data.tenant.slug}`}
        color={data.tenant.tenantPrimaryColor}
        title="Título"
        subTitle='Sub-Título'
      />

      <main>
        <InputField
          color={data.tenant.tenantPrimaryColor}
          placeholder='Digite seu e-mail'
          value={email}
          onChange={setEmail}
          type='email'
        />
        <InputField
          color={data.tenant.tenantPrimaryColor}
          placeholder='Digite sua senha'
          value={password}
          onChange={setPassword}
          type='password'
        />

        <Button
          tenantColor={data.tenant.tenantPrimaryColor}
          label="Entrar"
          handleOnClick={handleSubmit}
          fill
        />
        <Button
          tenantColor={data.tenant.tenantPrimaryColor}
          label="Entrar"
          handleOnClick={handleSubmit}
        />
      </main>
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { tenant: tenantSlug } = ctx.query;
  const api = useApi();

  const tenant = api.getTenant(tenantSlug as string);

  if (!tenant) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  return {
    props: {
      tenant,
    }
  }
}
