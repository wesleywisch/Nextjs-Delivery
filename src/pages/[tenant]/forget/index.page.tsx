/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { FormEvent, useEffect, useState } from 'react'

import { Header } from '../../../components/Header'
import { InputField } from '../../../components/InputField'
import { Button } from '../../../components/Button'

import { useApi } from '../../../hooks/useApi'
import { useAppContext } from '../../../hooks/useAppContext'

import { Tenant } from '../../../types/Tenant'

import { Container, ContainerAreaForget } from './styles'

type ForgetProps = {
  tenant: Tenant;
}

export default function Forget(data: ForgetProps) {
  const { tenant, setTenant } = useAppContext();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setIsLoading(true);

    await router.push(`/${data.tenant.slug}/forget-success`)

    setIsLoading(false);
  }

  useEffect(() => {
    setTenant(data.tenant)
  }, [])

  return (
    <Container tenantColor={data.tenant.tenantPrimaryColor}>
      <Head>
        <title>Esqueci minha senha | {data.tenant.name}</title>
      </Head>

      <Header
        backHref={`/${data.tenant.slug}/login`}
        color={data.tenant.tenantPrimaryColor}
      />

      <main>
        <h1 className='titleTenantForget'>
          {data.tenant.name}
        </h1>

        <p className="forgetTitle">
          Esqueceu sua senha?
        </p>

        <p className='subTitleForget'>
          Preencha o campo com seu e-mail e receba as instruções necessárias para redefinir sua senha.
        </p>

        <div className="line" />

        <ContainerAreaForget tenantColor={data.tenant.tenantPrimaryColor}>
          <form className="formLogin" onSubmit={handleSubmit}>
            <div className="inputAreaLogin">
              <InputField
                color={data.tenant.tenantPrimaryColor}
                placeholder='Digite seu e-mail'
                value={email}
                onChange={setEmail}
                type='email'
              />
            </div>

            <div className="inputAreaLogin">
              <Button
                tenantColor={data.tenant.tenantPrimaryColor}
                label="Enviar"
                handleOnClick={handleSubmit}
                fill
                type="submit"
                disabled={isLoading}
              />
            </div>
          </form>
        </ContainerAreaForget>
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
