import { KeyboardEvent, useState } from "react";

import SearchIcon from './searchIcon.svg';

import { Container } from "./styles";

type SearchInputProps = {
  tenantPrimaryColor: string;
  handleOnSearch: (searchValue: string) => void;
}

export function SearchInput({ tenantPrimaryColor, handleOnSearch }: SearchInputProps) {
  const [searchValue, setSearchValue] = useState('');

  function handleButtonSearch() {
    if (searchValue.trim() && searchValue !== '') {
      handleOnSearch(searchValue);
    }
  }

  function handleKeyUp(event: KeyboardEvent<HTMLInputElement>) {
    if (event.code === 'Enter') {
      if (searchValue.trim() && searchValue !== '') {
        handleOnSearch(searchValue);
      }
    }
  }

  return (
    <Container tenantBorderColor={tenantPrimaryColor}>
      <div className="button" onClick={handleButtonSearch}>
        <SearchIcon color={tenantPrimaryColor} />
      </div>

      <input
        type="text"
        className="input"
        placeholder="Digite o nome do produto"
        onKeyUp={handleKeyUp}
        value={searchValue}
        onChange={e => setSearchValue(e.target.value)}
      />
    </Container>
  )
}
