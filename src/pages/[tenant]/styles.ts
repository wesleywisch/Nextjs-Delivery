import styled from 'styled-components';

type Props = {
  tenantPrimaryColor: string;
}

export const Container = styled.div`
  background-color: #fff;

  main {
    .searchText {
      margin: 1.5rem;

      > span {
        font-weight: 400;
        font-size: 1rem;
        color: #979797;

        > strong {
          font-weight: 600;
        }
      }
    }

    .noProductsFiltered {
      width: 14.6875rem;
      margin: 5.5rem auto;

      .noProductsFilteredText {
        font-weight: 500;
        font-size: 1.5rem;
        line-height: 1.8125rem;
        color: #cdcdcd;
        text-align: center;
        margin-top: 2rem;
      }
    }
  }
`;

export const Header = styled.header<Props>`
  background-color: #f9f9fb;
  padding: 3.125rem 1.5rem 1.875rem 1.5rem;

  .headerTop {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.6875rem;

    .headerTopLeft {
      .headerTitle {
        font-weight: 500;
        font-size: 1.5rem;
        color: #1b1b1b;
        margin-bottom: .5rem;
      }

      .headerSubtitle {
        font-weight: 400;
        font-size: 1rem;
        color: rgba(151, 151, 151, 0.8);
      }
    }

    .headerTopRight {
      margin-bottom: 1.5rem;

      .menuButton {
        width: 1.125rem;
        height: 1rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: .5px;

        .menuButtonLine {
          background-color: ${({ tenantPrimaryColor }) => tenantPrimaryColor};
          height: 2px;
        }
      }
    }
  }
`;

export const SectionProducts = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin: 0rem 1.5rem 0rem 1.5rem;
`;
