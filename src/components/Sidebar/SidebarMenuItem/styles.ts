import styled from "styled-components";

type Props = {
  shortly?: boolean;
}

export const Container = styled.div<Props>`
  font-weight: 400;
  font-size: 1rem;
  color: #6a7d8b;
  padding: 1rem 0;
  display: flex;
  align-items: center;
  filter: opacity(${({ shortly }) => shortly ? '0.7' : ''});
  cursor: ${({ shortly }) => shortly ? 'not-allowed' : 'pointer'};

  > span {
    margin-left: 1.5rem;
  }
`;
