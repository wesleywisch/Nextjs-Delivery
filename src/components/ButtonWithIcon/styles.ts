import styled from "styled-components";

type Props = {
  tenantColor: string;
  bgColor?: boolean;
}

export const Container = styled.div<Props>`
  background-color: ${({ bgColor, tenantColor }) => bgColor ? tenantColor : '#f9f9fb'};
  display: flex;
  align-items: center;
  padding: 0.375rem;
  border-radius: 0.25rem;
  margin-top: .5rem;

  .leftSide {
    background-color: ${({ bgColor }) => bgColor ? 'rgba(0,0,0, 0.1)' : '#fff'};
    width: 3rem;
    height: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0.3125rem;
  }

  .centerSide {
    flex: 1;
    padding: 0 1rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    > span {
      color: ${({ bgColor }) => bgColor ? '#fff' : '#1b1b1b'};
      font-weight: 400;
      font-size: 0.9375rem;
    }
  }

  .rightSide {
    padding: 0 0.75rem;
  }
`;
