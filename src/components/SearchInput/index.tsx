import { KeyboardEvent, useState } from "react";

import SearchIcon from './searchIcon.svg';

import { useAppContext } from "../../hooks/useAppContext";

import { Container } from "./styles";

type SearchInputProps = {
  handleOnSearch: (searchValue: string) => void;
}

export function SearchInput({ handleOnSearch }: SearchInputProps) {
  const { tenant } = useAppContext();

  const [searchValue, setSearchValue] = useState('');

  function handleButtonSearch() {
    handleOnSearch(searchValue);
  }

  function handleKeyUp(event: KeyboardEvent<HTMLInputElement>) {
    // if (event.code === 'Enter') {
    handleOnSearch(searchValue);
    // }
  }

  return (
    <Container
      tenantBorderColor={tenant?.tenantPrimaryColor ? tenant?.tenantPrimaryColor : '#000'}
    >
      <div className="button" onClick={handleButtonSearch}>
        <SearchIcon color={tenant?.tenantPrimaryColor} />
      </div>

      <input
        type="text"
        className="inputSearch"
        placeholder="Digite o nome do produto"
        onKeyUp={handleKeyUp}
        value={searchValue}
        onChange={e => setSearchValue(e.target.value)}
      />
    </Container>
  )
}
