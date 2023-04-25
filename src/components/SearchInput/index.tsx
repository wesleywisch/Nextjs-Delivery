import { KeyboardEvent, useState } from "react";

import { Container } from "./styles";

type SearchInputProps = {
  tenantBorderColor: string;
  handleOnSearch: (searchValue: string) => void;
}

export function SearchInput({ tenantBorderColor, handleOnSearch }: SearchInputProps) {
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
    <Container tenantBorderColor={tenantBorderColor}>
      <div className="button" onClick={handleButtonSearch}>

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
