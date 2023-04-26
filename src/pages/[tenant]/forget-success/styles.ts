import styled from 'styled-components';

type Props = {
  tenantColor: string;
}

export const Container = styled.div<Props>`
  background-color: #fff;
  padding: 3.125rem 1.5rem;

  main {
    .iconArea {
      display: flex;
      justify-content: center;
      margin: 100px auto 53px auto;
    }

    .forgetSuccessTitle {
      font-weight: 600;
      font-size: 1.5rem;
      text-align: center;
      margin-bottom: 1.875rem;
    }

    .subTitleForgetSuccess {
      font-weight: 400;
      font-size: 1.125rem;
      line-height: 1.3125rem;
      color: rgba(27, 27, 27, 0.8);
      text-align: center;
      margin: auto;
      width: 19rem;
    }

    .inputAreaForgetSuccess {
      margin-top: 2.5rem;
    }
  }
`;
