import styled from "styled-components";

export const Container = styled.header`
  display: flex;
  height: 3rem;

  .leftSide, .rightSide {
    width: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
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
