import styled from 'styled-components';

type Props = {
  tenantColor: string;
}

export const Container = styled.div`
  background-color: #fff;
  padding: 3.125rem 1.5rem;

  main {
    .productsQuantityCart {
      border-top: 1.5px solid rgba(27, 27, 27, 0.1);
      border-bottom: 1.5px solid rgba(27, 27, 27, 0.1);
      padding: 1.1875rem 0;

      > span {
        font-weight: 400;
        font-size: 1rem;
        color: #1b1b1b;
      }
    }
  }
`;

export const SectionInfoGroupCheckout = styled.section`
  border-top: 1.5px solid rgba(27, 27, 27, 0.1);
  margin-bottom: 2.5rem;

  .infoAreaCheckout {
    padding-top: 1.5rem;

    .infoTitleCheckout {
      font-weight: 400;
      font-size: 1rem;
      color: #1b1b1b;
    }

    .infoBodyCheckout {
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
