import styled from "styled-components";

type Props = {
  textColor: string;
  borderColor: string;
  backgroundColor: string;
}

export const Container = styled.button<Props>`
  border: 0;
  outline: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${({ borderColor }) => borderColor};
  background: ${({ backgroundColor }) => backgroundColor};
  padding: 1.375rem;
  color: ${({ textColor }) => textColor};
  font-weight: 600;
  font-size: 1rem;
  border-radius: .25rem;
  cursor: pointer;

  &:disabled {
    opacity: .7;
    cursor: not-allowed;
  }
`;
