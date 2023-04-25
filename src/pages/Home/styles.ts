import styled from 'styled-components';

export const Container = styled.div`
  background-color: #fff;
`;

export const Header = styled.header`
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
          background-color: #fb9400;
          height: 2px;
        }
      }
    }
  }

  .headerBottom {

  }
`;

export const SectionProducts = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin: 0rem 1.5rem 0rem 1.5rem;
`;
