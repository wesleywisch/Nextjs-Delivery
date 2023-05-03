import styled from "styled-components";

type Props = {
  textColor: string;
  borderColor: string;
  backgroundColor: string;
  notWidth?: boolean;
}

export const Container = styled.button<Props>`
  outline: 0;
  width: ${({ notWidth }) => notWidth ? '' : '100%'};
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid ${({ borderColor }) => borderColor};
  background: ${({ backgroundColor }) => backgroundColor};
  padding: 1.1875rem;
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
