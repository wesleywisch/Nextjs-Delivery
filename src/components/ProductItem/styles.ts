import styled from "styled-components";

type Props = {
  tenantPrimaryColor: string;
  tenantSecondaryColor: string;
}

export const Container = styled.div<Props>`
  background-color: #fff;
  border-radius: .5rem;
  box-shadow: 0rem .5rem 2.5rem rgba(0,0,0,0.08);
  overflow: hidden;
  display: block;

  a {
    text-decoration: none;
  }

  .head {
    height: 5.625rem;
    background-color: ${({ tenantSecondaryColor }) => ( tenantSecondaryColor )};
  }

  .info {
    padding: 0.8125rem;

    .containerImg {
      text-align: center;
      margin-top: -5.625rem;

      .productImg {
        width: 100%;
        height: auto;
        object-fit: cover;
      }
    }

    .categoryName {
      font-weight: 500;
      font-size: .5rem;
      color: #1b1b1b;
    }

    .productName {
      font-weight: 700;
      font-size: 1.125rem;
      color: #1b1b1b;
      margin: .3rem 0 .3rem 0;
    }

    .productPrice {
      font-weight: 600;
      font-size: 0.9375rem;
      color: ${({ tenantPrimaryColor }) => ( tenantPrimaryColor )};
    }
  }
`;
