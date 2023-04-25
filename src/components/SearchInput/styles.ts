import styled from "styled-components";

type StylesPros = {
  tenantBorderColor: string;
}

export const Container = styled.div<StylesPros>`
  background-color: #fff;
  display: flex;
  padding: 0.375rem;
  border-radius: 0.3125rem;
  border: 1px solid #fff;

  .button {
    width: 3rem;
    height: 3rem;
    background-color: #f9f9fb;
    border-radius: 0.3125rem;
  }

  .input {
    border: 0;
    outline: 0;
    flex: 1;
    height: 3rem;
    font-weight: 400;
    font-size: 1rem;
    margin-left: 0.8125rem;
  }

  &:focus-within {
    border: 1px solid ${({ tenantBorderColor }) => ( tenantBorderColor ? tenantBorderColor : '#fff' )};
  }
`;
