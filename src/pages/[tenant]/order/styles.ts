import styled from 'styled-components';

type Props = {
  tenantColor: string;
}

type ContainerProps = {
  orderBackgroundColor: string;
  orderTextColor: string;
}

export const Container = styled.div<ContainerProps>`
  background-color: #fff;
  padding: 3.125rem 1.5rem;

  main {
    .lineOrder {
      border-top: 1.5px solid rgba(27, 27, 27, 0.1);
    }

    .orderStatusArea {
      margin-top: 1.3125rem;
      padding: 1.6875rem 1.4375rem;
      border-radius: .25rem;
      background-color: ${({ orderBackgroundColor }) => orderBackgroundColor};

      .orderStatusTitle > span {
        font-weight: 600;
        font-size: 1rem;
        line-height: 1.1875rem;
        color: ${({ orderTextColor }) => orderTextColor};
      }

      .orderStatusPercentage {
        margin-top: 1rem;
        height: .5rem;
        border-radius: .5rem;
        background-color: rgba(0, 0, 0, 0.1);

        .orderStatusPercentageBar {
          height: inherit;
          border-radius: .5rem;
          background-color: ${({ orderTextColor }) => orderTextColor};
        }
      }

      .orderStatusMensagem {
        margin-top: .5rem;

        > p {
          font-weight: 400;
          font-size: 0.625rem;
          color: rgba(0, 0, 0, 0.7);
        }
      }
    }

    .orderInfoArea {
      display: flex;
      align-items: center;
      border-bottom: 1.5px solid rgba(27, 27, 27, 0.1);
      padding: 0.9375rem 0;

      .orderInfoStatus {
        font-weight: 600;
        font-size: 0.6875rem;
        padding: 0.375rem 1.0625rem;
        border-radius: .25rem;
        background-color: ${({ orderBackgroundColor }) => orderBackgroundColor};
        color: ${({ orderTextColor }) => orderTextColor};
      }

      .orderInfoQuantity > span {
        font-weight: 400;
        font-size: 1rem;
        color: #1b1b1b;
        padding: 0 1.1875rem;
      }

      .orderInfoDate {
        text-align: right;
        flex: 1;

        > span {
          font-weight: 400;
          font-size: 1rem;
          color: #b3b3b3;
        }
      }
    }
  }
`;

export const SectionInfoGroupOrder = styled.section`
  border-top: 1.5px solid rgba(27, 27, 27, 0.1);
  margin-bottom: 2.5rem;

  .infoAreaOrder {
    padding-top: 1.5rem;

    .infoTitleOrder {
      font-weight: 400;
      font-size: 1rem;
      color: #1b1b1b;
    }

    .infoBodyOrder {
      margin-top: .5rem;

      .paymentTypes {
        display: flex;
        justify-content: space-between;
        gap: 1.5rem;

        .paymentBtn {
          flex: 1;
        }
      }

      .couponInput {
        display: flex;
        gap: 1rem;
      }
    }
  }
`;

export const ProductsAreaListCart = styled.section``;

export const ResumeAreaCart = styled.section<Props>`
  background-color: #f9f9fb;
  border-radius: .5rem;
  margin-top: 1rem;
  padding: 3rem 2rem;

  .resumeItemCart {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1.5rem;

    .resumeLeftCart {
      font-weight: 400;
      font-size: 1rem;
      color: #000;
    }

    .resumeRightCart {
      font-weight: 500;
      font-size: 1rem;
      color: #000;

      &.discount {
        opacity: .75;
      }
    }

    .resumeRightBigCart {
      font-weight: 600;
      font-size: 1.5rem;
      color: ${({ tenantColor }) => tenantColor};
    }
  }

  .resumeLineCart {
    border-top: 1px dashed #96a3ab;
    margin-bottom: 1.8125rem;
  }

  .resumeButtonCart {
    margin-top: 2.5rem;
  }
`;
