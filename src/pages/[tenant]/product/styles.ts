import styled from 'styled-components';

type Props = {
  tenantPrimaryColor: string;
}

export const Container = styled.div<Props>`
  background-color: #fff;

  .headerAreaProduct {
    position: absolute;
    left: 1.5rem;
    top: 4rem;
    right: 1.5rem;
  }

  .headerBgProduct {
    height: 21.875rem;
    background-color: #333;
    background-image: url('/assets/product-bg.png');
    background-position: top center;
    background-repeat: no-repeat;
    background-color: ${({ tenantPrimaryColor }) => tenantPrimaryColor};
  }

  .productImage {
    text-align: center;
    margin-top: -250px;

    img {
      width: auto;
      height: 350px;
    }
  }

  main {
    margin: 0 1.5rem;

    .categoryNameProduct {
      font-weight: 500;
      font-size: 1rem;
      color: #1b1b1b;
    }

    .titleProduct {
      font-weight: 600;
      font-size: 2.5rem;
      line-height: 3rem;
      color: #1b1b1b;
      padding-bottom: 1.5rem;
      border-bottom: 1.5px solid ${({ tenantPrimaryColor }) => tenantPrimaryColor};
      width: fit-content;
      position: relative;
    }

    .lineProduct {
      border-top: 1.5px solid #e2e2e2;
      margin-top: -.5px;
    }

    .descriptionProduct {
      font-weight: 400;
      font-size: 1rem;
      line-height: 1.5rem;
      color: rgba(27, 27, 27, 0.5);
      margin: 1.5rem 0;
    }

    .qtText {
      font-weight: 400;
      font-size: 1rem;
      color: #1b1b1b;
      margin-bottom: 1rem;
    }

    .areaProduct {
      display: flex;
      align-items: center;

      .areaProductLeft {}

      .areaProductRight {
        flex: 1;
        text-align: right;

        > span {
          font-weight: 600;
          font-size: 2.5rem;
          color: ${({ tenantPrimaryColor }) => tenantPrimaryColor};
        }
      }
    }

    .buttonAreaProduct {
      margin: 3.125rem 0;
    }
  }
`;
