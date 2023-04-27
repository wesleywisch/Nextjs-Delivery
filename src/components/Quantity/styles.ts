import styled from "styled-components";

type Props = {
  tenantColor: string;
  small: boolean;
}

export const Container = styled.div<Props>`
  display: flex;
  align-items: center;
  border: 1px solid #f2f4f5;
  border-radius: .3rem;
  overflow: hidden;

  .buttonMinus, .buttonAdd {
    font-weight: 500;
    font-size: 1.5rem;
    width: ${({ small }) => small ? '2.625rem' : '3rem'};
    height: ${({ small }) => small ? '2.625rem' : '3rem'};
    border: 0;
    outline: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    background-color: ${({ tenantColor }) => tenantColor};
    cursor: pointer;

    &:disabled {
      color: #96a3ab;
      background-color: #f2f4f5;
      cursor: not-allowed;
    }
  }

  .qt {
    font-weight: 700;
    font-size: ${({ small }) => small ? '1rem' : '1.125rem'};
    color: ${({ tenantColor }) => tenantColor};
    padding: 0 0.625rem;
  }
`;
