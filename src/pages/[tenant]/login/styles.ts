import styled from 'styled-components';

type Props = {
  tenantColor: string;
}

export const Container = styled.div<Props>`
  background-color: #fff;
  padding: 3.125rem 1.5rem;

  main {
    .titleTenantLogin {
      font-weight: bold;
      font-size: 2.25rem;
      margin: 1.25rem 0rem 2.5rem 0rem;
      text-align: center;
    }

    .subTitleLogin {
      font-weight: 400;
      font-size: 1.125rem;
      line-height: 1.3125rem;
      color: rgba(27, 27, 27, 0.8);
      text-align: center;
      margin: auto;
      width: 13.9375rem;
      padding-bottom: 2.5rem;
      border-bottom: 1.5px solid ${({ tenantColor }) => tenantColor};
      position: relative;
    }

    .lineLogin {
      border-top: 1.5px solid #e2e2e2;
      margin-top: -.5px;
    }
  }
`;

export const ContainerAreaLogin = styled.div<Props>`
  margin-top: 3.5rem;

  .formLogin {


    .inputAreaLogin {
      margin-bottom: 2rem;
    }
  }

  .forgetArea {
    > p {
      font-weight: 400;
      font-size: 1rem;
      text-align: center;
      margin: auto;
      color: #000;
      width: fit-content;
      position: relative;
      padding-bottom: 3.875rem;
      border-bottom: 1.5px solid ${({ tenantColor }) => tenantColor};

      > a {
        font-weight: 600;
        text-decoration: none;
        color: ${({ tenantColor }) => tenantColor};
      }
    }
  }

  .lineLogin2 {
    border-top: 1.5px solid #e2e2e2;
    margin-top: -1.5px;
  }

  .signUpArea {
    margin-top: 3.875rem;
  }
`;
