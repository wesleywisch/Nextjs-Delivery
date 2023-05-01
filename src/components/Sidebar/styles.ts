import styled from "styled-components";

type Props = {
  tenantPrimaryColor: string;
  open: boolean;
}

export const Container = styled.div<Props>`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  width: ${({ open }) => open ? '100vw' : '0'};
  z-index: 5;
  background-color: #fff;
  transition: all ease .5s;
  overflow-x: hidden;

  .areaSidebar {
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100%;

    .headerSidebar {
      display: flex;
      justify-content: space-between;
      margin: 4.875rem 1.5rem 0 1.5rem;
      position: relative;

      .loginAreaSidebar {
        border-bottom: 1.5px solid ${({ tenantPrimaryColor }) => tenantPrimaryColor};
        margin-left: 2.625rem;
        padding-bottom: 3rem;
        min-width: 14.375rem;

        .userInfoSidebar {
          > strong {
            font-weight: 500;
            font-size: 1.5rem;
            color: #1b1b1b;
            display: block;
            margin-bottom: .5rem;
          }

          > span {
            font-weight: 400;
            font-size: 1rem;
            color: #96a3ab;
          }
        }
      }

      .closeBtnSidebar {
        width: 2rem;
        height: 2rem;
        border: 0;
        outline: 0;
        display: flex;
        justify-content: flex-end;
        align-items: flex-start;
        font-size: 1.5rem;
        background: transparent;
        color: ${({ tenantPrimaryColor }) => tenantPrimaryColor};
      }
    }

    .lineSidebar {
      border-bottom: 1.5px solid #e2e2e2;
      margin: -.5px 1.5rem 0 1.5rem;
    }

    .menuSidebar {
      flex: 1;
      margin: 1.5625rem 4.125rem;
      display: flex;
      flex-direction: column;
    }

    .menuBottom {
      margin: 1.5625rem 4.125rem;
      display: flex;
      flex-direction: column;
    }
  }
`;
