import styled from 'styled-components';

export const Container = styled.div`
  background-color: #fff;
  padding: 3.125rem 1.5rem;

  main {
    display: flex;
    flex-direction: column;
    min-height: 80vh;

    .btnArea {
      margin-top: 1.5rem;
    }
  }
`;

export const InputsArea = styled.div`
  border-top: 1.5px solid rgba(27, 27, 27, 0.1);

  form {
    .inputRow {
      display: flex;
      margin-top: 1.5rem;
      gap: 1.5rem;

      .inputColumn {
        display: flex;
        flex-direction: column;
        flex: 1;

        > label {
          margin-bottom: .25rem;
        }

        > div > input {
          width: 1px;
        }
      }
    }
  }
`;
