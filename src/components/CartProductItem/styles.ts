import styled from "styled-components";

type Props = {
  tenantColor: string;
}

export const Container = styled.div<Props>`
  display: flex;
  align-items: center;
  border-bottom: 1.5px solid rgba(27, 27, 27, 0.1);

  .productItemImage {
    width: 5.3125rem;

    > img {
      width: 100%;
    }
  }

  .productItemInfo {
    flex: 1;
    margin-left: 1.1875rem;

    .productItemCategory{
      font-weight: 400;
      font-size: 0.75rem;
      color: rgba(27, 27, 27, 0.5);
    }

    .productItemName{
      font-weight: 500;
      font-size: 1rem;
      color: #1b1b1b;
      margin-top: .25rem;
      margin-bottom: 0.125rem;
    }

    .productItemPrice{
      font-weight: 600;
      font-size: 1rem;
      color: ${({ tenantColor }) => tenantColor};
    }
  }

  .productItemQuantityControl {
    .qtAreaNoEdit {
      margin-right: 1.625rem;

      .qtNoEditTitle {
        margin-bottom: 0.125rem;

        > p {
          font-weight: 600;
          font-size: 0.75rem;
          color: ${({ tenantColor }) => tenantColor};
        }
      }

      .qtNoEditCount {
        width: 2.625rem;
        height: 2.625rem;
        border-radius: .25rem;
        border: 1px solid #f2f4f5;
        display: flex;
        justify-content: center;
        align-items: center;

        > span {
          font-weight: 700;
          font-size: 1rem;
          color: ${({ tenantColor }) => tenantColor};
        }
      }
    }
  }
`;
