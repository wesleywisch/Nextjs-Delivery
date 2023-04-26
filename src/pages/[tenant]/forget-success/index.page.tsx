/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { useEffect, useState } from 'react'

import { Header } from '../../../components/Header'
import { Button } from '../../../components/Button'

import { useApi } from '../../../hooks/useApi'
import { useAppContext } from '../../../hooks/useAppContext'

import { Tenant } from '../../../types/Tenant'

import Email from './Email.svg'

import { Container } from './styles'

type ForgetSuccessProps = {
  tenant: Tenant;
}

export default function ForgetSuccess(data: ForgetSuccessProps) {
  const { tenant, setTenant } = useAppContext();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin() {
    setIsLoading(true);
    await router.push(`/${data.tenant.slug}/login`)
    setIsLoading(false);
  }

  useEffect(() => {
    setTenant(data.tenant)
  }, [])

  return (
    <Container tenantColor={data.tenant.tenantPrimaryColor}>
      <Head>
        <title>E-mail enviado com sucesso | {data.tenant.name}</title>
      </Head>

      <Header
        backHref={`/${data.tenant.slug}/forget`}
        color={data.tenant.tenantPrimaryColor}
      />

      <main>
        <div className="iconArea">
          <Email color={data.tenant.tenantPrimaryColor} />
        </div>

        <p className="forgetSuccessTitle">
          Verifique seu e-mail
        </p>

        <p className='subTitleForgetSuccess'>
          Enviamos as instruções para recuperação de senha para o seu e-mail.
        </p>

        <div className="inputAreaForgetSuccess">
          <Button
            tenantColor={data.tenant.tenantPrimaryColor}
            label="Fazer login"
            handleOnClick={handleLogin}
            fill
            disabled={isLoading}
          />
        </div>
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
