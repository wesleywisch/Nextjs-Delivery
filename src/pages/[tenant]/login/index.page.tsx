/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { FormEvent, useEffect, useState } from 'react'

import { Header } from '../../../components/Header'
import { InputField } from '../../../components/InputField'
import { Button } from '../../../components/Button'

import { useApi } from '../../../hooks/useApi'
import { useAppContext } from '../../../hooks/useAppContext'

import { Tenant } from '../../../types/Tenant'

import { Container, ContainerAreaLogin } from './styles'

type LoginProps = {
  tenant: Tenant;
}

export default function Login(data: LoginProps) {
  const { tenant, setTenant } = useAppContext();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setIsLoading(true);
    setIsLoading(false);
  }

  async function handleSignUp() {
    setIsLoading(true);
    await router.push(`/${data.tenant.slug}/signup`);
    setIsLoading(false);
  }

  useEffect(() => {
    setTenant(data.tenant)
  }, [])

  return (
    <Container tenantColor={data.tenant.tenantPrimaryColor}>
      <Head>
        <title>Login | {data.tenant.name}</title>
      </Head>

      <Header
        backHref={`/${data.tenant.slug}`}
        color={data.tenant.tenantPrimaryColor}
      />

      <main>
        <h1 className='titleTenantLogin'>
          {data.tenant.name}
        </h1>

        <p className='subTitleLogin'>
          Use suas credenciais para realizar o login
        </p>

        <div className="line" />

        <ContainerAreaLogin tenantColor={data.tenant.tenantPrimaryColor}>
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
              <InputField
                color={data.tenant.tenantPrimaryColor}
                placeholder='Digite sua senha'
                value={password}
                onChange={setPassword}
                type='password'
              />
            </div>

            <div className="inputAreaLogin">
              <Button
                tenantColor={data.tenant.tenantPrimaryColor}
                label="Entrar"
                handleOnClick={handleSubmit}
                fill
                type="submit"
                disabled={isLoading}
              />
            </div>
          </form>

          <div className="forgetArea">
            <p>Esqueceu sua senha? <Link href={`/${data.tenant.slug}/forget`}>Clique aqui.</Link></p>
          </div>

          <div className="line" />

          <div className="signUpArea">
            <Button
              tenantColor={data.tenant.tenantPrimaryColor}
              label="Quero me cadastrar"
              handleOnClick={handleSignUp}
              disabled={isLoading}
            />
          </div>
        </ContainerAreaLogin>
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
