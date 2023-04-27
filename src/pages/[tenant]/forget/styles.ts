import styled from 'styled-components';

type Props = {
  tenantColor: string;
}

export const Container = styled.div<Props>`
  background-color: #fff;
  padding: 3.125rem 1.5rem;

  main {
    .titleTenantForget {
      font-weight: bold;
      font-size: 2.25rem;
      margin: 1.25rem 0rem 2.5rem 0rem;
      text-align: center;
    }

    .forgetTitle {
      font-weight: 600;
      font-size: 1.5rem;
      text-align: center;
      margin-bottom: 1.875rem;
    }

    .subTitleForget {
      font-weight: 400;
      font-size: 1.125rem;
      line-height: 1.3125rem;
      color: rgba(27, 27, 27, 0.8);
      text-align: center;
      margin: auto;
      width: 19rem;
      padding-bottom: 2.5rem;
      border-bottom: 1.5px solid ${({ tenantColor }) => tenantColor};
      position: relative;
    }

    .lineForget {
      border-top: 1.5px solid #e2e2e2;
      margin-top: -.5px;
    }
  }
`;

export const ContainerAreaForget = styled.div<Props>`
  margin-top: 3.5rem;

  .formLogin {
    .inputAreaLogin {
      margin-bottom: 2rem;
    }
  }
`;
