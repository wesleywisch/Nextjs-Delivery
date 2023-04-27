import styled from 'styled-components';

type Props = {
  tenantColor: string;
}

export const Container = styled.div<Props>`
  background-color: #fff;
  padding: 3.125rem 1.5rem;

  main {
    .titleTenantSignUp {
      font-weight: bold;
      font-size: 2.25rem;
      margin: 1.25rem 0rem 2.5rem 0rem;
      text-align: center;
    }

    .subTitleSignUp {
      font-weight: 400;
      font-size: 1.125rem;
      line-height: 1.3125rem;
      color: rgba(27, 27, 27, 0.8);
      text-align: center;
      margin: auto;
      width: 13.75rem;
      padding-bottom: 2.5rem;
      border-bottom: 1.5px solid ${({ tenantColor }) => tenantColor};
      position: relative;
    }

    .lineSignUp {
      border-top: 1.5px solid #e2e2e2;
      margin-top: -.5px;
    }
  }
`;

export const ContainerAreaSignUp = styled.div<Props>`
  margin-top: 3.5rem;

  .formSignUp {
    .inputAreaSignUp {
      margin-bottom: 2rem;
    }
  }

  .backLogin {
    > p {
      font-weight: 400;
      font-size: 1rem;
      text-align: center;
      margin: auto;
      color: #000;

      > a {
        font-weight: 600;
        text-decoration: none;
        color: ${({ tenantColor }) => tenantColor};
      }
    }
  }
`;
