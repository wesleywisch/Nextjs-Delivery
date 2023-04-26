/* eslint-disable react-hooks/rules-of-hooks */
import { GetServerSideProps } from 'next'

import { SearchInput } from '../../components/SearchInput'
import { Banner } from '../../components/Banner'
import { ProductItem } from '../../components/ProductItem'

import { useApi } from '../../hooks/useApi'

import { Container, Header, SectionProducts } from './styles'

export default function Home() {
  function handleSearch(searchValue: string) {
    console.log(searchValue)
  }

  return (
    <Container>
      <Header>
        <div className="headerTop">
          <div className="headerTopLeft">
            <h3 className="headerTitle">Seja Bem Vindo (a) 👋</h3>
            <p className="headerSubtitle">O que deseja para hoje?</p>
          </div>

          <div className="headerTopRight">
            <div className="menuButton">
              <div className="menuButtonLine"></div>
              <div className="menuButtonLine"></div>
              <div className="menuButtonLine"></div>
            </div>
          </div>
        </div>

        <div className="headerBottom">
          <SearchInput
            tenantPrimaryColor='#fb9400'
            handleOnSearch={handleSearch}
          />
        </div>
      </Header>

      <main>
        <Banner />

        <SectionProducts>
          <ProductItem
            data={{
              id: 1,
              categoryName: "Tradicional",
              image: "/tmp/burger.png",
              name: "Texas Burger",
              price: "R$ 25,50",
            }}
            tenantPrimaryColor='#fb9400'
            tenantSecondaryColor='#fff9f2'
          />
        </SectionProducts>
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
