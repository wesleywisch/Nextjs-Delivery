/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import Head from 'next/head'
import { FormEvent, useEffect, useState } from 'react'

import { Header } from '../../../components/Header'
import { InputField } from '../../../components/InputField'
import { Button } from '../../../components/Button'

import { useApi } from '../../../hooks/useApi'
import { useAppContext } from '../../../hooks/useAppContext'

import { Tenant } from '../../../types/Tenant'

import { Container, ContainerAreaSignUp } from './styles'

type SignUpProps = {
  tenant: Tenant;
}

export default function SignUp(data: SignUpProps) {
  const { tenant, setTenant } = useAppContext();

  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setIsLoading(true);
    setIsLoading(false);
  }

  useEffect(() => {
    setTenant(data.tenant)
  }, [])

  return (
    <Container tenantColor={data.tenant.tenantPrimaryColor}>
      <Head>
        <title>Cadastro | {data.tenant.name}</title>
      </Head>

      <Header
        backHref={`/${data.tenant.slug}/login`}
        color={data.tenant.tenantPrimaryColor}
      />

      <main>
        <h1 className='titleTenantSignUp'>
          {data.tenant.name}
        </h1>

        <p className='subTitleSignUp'>
          Preencha os campos para criar o seu cadastro.
        </p>

        <div className="line" />

        <ContainerAreaSignUp tenantColor={data.tenant.tenantPrimaryColor}>
          <form className="formSignUp" onSubmit={handleSubmit}>
            <div className="inputAreaSignUp">
              <InputField
                color={data.tenant.tenantPrimaryColor}
                placeholder='Digite seu nome'
                value={name}
                onChange={setName}
              />
            </div>

            <div className="inputAreaSignUp">
              <InputField
                color={data.tenant.tenantPrimaryColor}
                placeholder='Digite seu e-mail'
                value={email}
                onChange={setEmail}
                type='email'
              />
            </div>

            <div className="inputAreaSignUp">
              <InputField
                color={data.tenant.tenantPrimaryColor}
                placeholder='Digite sua senha'
                value={password}
                onChange={setPassword}
                type='password'
              />
            </div>

            <div className="inputAreaSignUp">
              <Button
                tenantColor={data.tenant.tenantPrimaryColor}
                label="Cadastrar"
                handleOnClick={handleSubmit}
                fill
                type="submit"
                disabled={isLoading}
              />
            </div>
          </form>

          <div className="backLogin">
            <p>Já possui um cadastro? <Link href={`/${data.tenant.slug}/login`}>Fazer login.</Link></p>
          </div>
        </ContainerAreaSignUp>
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

  return {
    props: {
      tenant,
    }
  }
}
