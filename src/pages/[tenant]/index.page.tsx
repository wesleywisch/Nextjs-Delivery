/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { GetServerSideProps } from 'next'
import { useEffect, useState } from 'react'

import { SearchInput } from '../../components/SearchInput'
import { Banner } from '../../components/Banner'
import { ProductItem } from '../../components/ProductItem'
import { Sidebar } from '../../components/Sidebar'

import { useApi } from '../../hooks/useApi'
import { useAppContext } from '../../hooks/useAppContext'

import { Tenant } from '../../types/Tenant'
import { Product } from '../../types/Product'

import { Container, Header, SectionProducts } from './styles'

type HomeProps = {
  tenant: Tenant;
  products: Product[];
}

export default function Home(data: HomeProps) {
  const { tenant, setTenant } = useAppContext();

  const [products, setProducts] = useState<Product[]>(data.products)
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setTenant(data.tenant)
  }, [])

  function handleSearch(searchValue: string) {
    console.log(searchValue)
  }

  return (
    <Container>
      <Header tenantPrimaryColor={tenant?.tenantPrimaryColor ? tenant?.tenantPrimaryColor : '#000'}>
        <div className="headerTop">
          <div className="headerTopLeft">
            <h3 className="headerTitle">Seja Bem Vindo (a) 👋</h3>
            <p className="headerSubtitle">O que deseja para hoje?</p>
          </div>

          <div className="headerTopRight">
            <div
              onClick={() => setSidebarOpen(true)}
              className="menuButton"
            >
              <div className="menuButtonLine"></div>
              <div className="menuButtonLine"></div>
              <div className="menuButtonLine"></div>
            </div>

            <Sidebar
              tenant={data.tenant}
              open={sidebarOpen}
              handleCloseSidebar={() => setSidebarOpen(false)}
            />
          </div>
        </div>

        <div className="headerBottom">
          <SearchInput
            handleOnSearch={handleSearch}
          />
        </div>
      </Header>

      <main>
        <Banner />

        <SectionProducts>
          {products.length > 0 ? products.map((product, key) => (
            <ProductItem
              key={key}
              data={product}
            />
          )) : (
            <div>
              Não possui nenhum produto.
            </div>
          )}
        </SectionProducts>
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

  const products = await api.getAllProducts();

  return {
    props: {
      tenant,
      products,
    }
  }
}
