import { SearchInput } from '../../components/SearchInput'

import { Container, Header } from './styles'

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
            borderColor='#fb9400'
            handleOnSearch={handleSearch}
          />
        </div>
      </Header>
    </Container>
  )
}