import styled from "styled-components";

type Props = {
  tenantBorderColor: string;
  error?: boolean;
}

export const Container = styled.div<Props>`
  width: 100%;
  height: 3.8125rem;
  background-color: #f9f9fb;
  border: 2px solid ${({ error }) => !error ? '#f9f9fb' : 'red'};
  border-radius: .25rem;
  padding: 0rem 1rem;
  display: flex;

  .inputField {
    flex: 1;
    border: 0;
    outline: 0;
    background: transparent;
    color: #1b1b1b;
    font-weight: 400;
    font-size: 1rem;
  }

  .showPassword {
    display: flex;
    align-items: center;
  }

  &:focus-within {
    border: 2px solid ${({ tenantBorderColor, error }) => !error ? (tenantBorderColor ? tenantBorderColor : '#f9f9fb') : 'red'};
    background-color: #fff;
  }
`;
