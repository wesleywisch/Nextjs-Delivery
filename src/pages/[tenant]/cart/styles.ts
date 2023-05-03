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

export const ProductsAreaListCart = styled.section``;

export const ShippingAreaCart = styled.section<Props>`
  margin-top: 2rem;

  .shippingTitle {
    font-weight: 400;
    font-size: 1rem;
    color: #6a7d8b;
    margin-bottom: 1rem;
  }

  .shippingFormAreaCart {
    display: flex;
    gap: 1rem;
  }

  .shippingInfoCart {
    background-color: #f9f9fa;
    border-radius: .5rem;
    margin-top: 1rem;
    padding: 1.5rem 2rem;

    .shippingAddress {
      font-weight: 400;
      font-size: 0.625rem;
      color: #6a7d8b;
    }

    .shippingTimeCart {
      display: flex;
      justify-content: space-between;
      margin-top: 1rem;

      .shippingTextCart {
        font-weight: 400;
        font-size: 1rem;
        color: #000;
      }

      .shippingPriceCart {
        font-weight: 600;
        font-size: 1rem;
        color: ${({ tenantColor }) => tenantColor};
      }
    }
  }
`;

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
