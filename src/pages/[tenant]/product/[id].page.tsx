/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { GetServerSideProps } from 'next'
import Image from 'next/image'
import Head from 'next/head'
import { useEffect } from 'react'

import { Header } from '../../../components/Header'
import { Button } from '../../../components/Button'

import { useApi } from '../../../hooks/useApi'
import { useAppContext } from '../../../hooks/useAppContext'
import { useFormatter } from '../../../hooks/useFormatter'

import { Tenant } from '../../../types/Tenant'
import { Product } from '../../../types/Product'

import { Container } from './styles'

type ProductProps = {
  tenant: Tenant;
  product: Product;
}

export default function Product(data: ProductProps) {
  const { tenant, setTenant } = useAppContext();

  const formatter = useFormatter();

  function handleAddProductToCart() {

  }

  useEffect(() => {
    setTenant(data.tenant)
  }, [])

  return (
    <Container tenantPrimaryColor={data.tenant.tenantPrimaryColor}>
      <Head>
        <title>{data.product.name} | {data.tenant.name}</title>
      </Head>

      <div className="headerAreaProduct">
        <Header
          color={data.tenant.tenantPrimaryColor}
          backHref={`/${data.tenant.slug}`}
          title="Produto"
          pageProductId
        />
      </div>

      <div className="headerBgProduct" />

      <div className="productImage">
        <Image
          src={data.product.image}
          alt={data.product.name}
          width={100}
          height={350}
        />
      </div>

      <main>
        <span className="categoryNameProduct" title={data.product.categoryName}>{data.product.categoryName}</span>

        <h1 className='titleProduct' title={data.product.name}>{data.product.name}</h1>

        <div className="lineProduct" />

        <p className="descriptionProduct" title={data.product.description}>{data.product.description}</p>

        <p className="qtText">Quantidade</p>

        <div className="areaProduct">
          <div className="areaProductLeft">
            ...
          </div>

          <div className="areaProductRight">
            <span title={formatter.formatPrice(data.product.price)}>{formatter.formatPrice(data.product.price)}</span>
          </div>
        </div>

        <div className="buttonAreaProduct">
          <Button
            tenantColor={data.tenant.tenantPrimaryColor}
            label="Adicionar à sacola"
            handleOnClick={handleAddProductToCart}
            fill
          />
        </div>
      </main>

    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { tenant: tenantSlug, id } = ctx.query;
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

  const product = await api.getProduct(id as string);

  return {
    props: {
      tenant,
      product,
    }
  }
}
