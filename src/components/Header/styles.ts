import styled from "styled-components";

export const Container = styled.header`
  display: flex;
  height: 3rem;

  .leftSide, .rightSide {
    width: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;

    > a {
      width: 3rem;
      height: 3rem;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: .3rem;

      &.buttonTransparent {
        background-color: rgba(0,0,0, 0.1)
      }
    }
  }

  .centerSide {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .title {
      font-weight: 600;
      font-size: 1.5rem;
      color: #1b1b1b;
    }

    .subTitle {
      font-weight: 400;
      font-size: 0.8125rem;
      color: #6a7d8b;
    }
  }
`;
