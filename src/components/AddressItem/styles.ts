import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1.5px solid rgba(27, 27, 27, 0.1);

  .addressArea {
    flex: 1;
    display: flex;
    align-items: center;
    padding: 2rem 0;

    .addressIcon {
      margin-left: 1.1875rem;
    }

    .addressText {
      width: 12.5rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

      > p {
        font-weight: 400;
        font-size: 0.9375rem;
        color: #1b1b1b;
        margin-left: 0.6875rem;
      }
    }
  }

  .btnArea {
    .menuIcon {
      padding: 0 0.625rem;
    }

    .popup {
      position: absolute;
      right: 1.5rem;
      background-color: #fff;
      border: 2px solid #f9f9fb;
      box-shadow: 0rem 1rem 2.5rem rgba(0,0,0, 0.08);
      border-radius: .25rem;
      padding: 1.1875rem;
      display: flex;
      flex-direction: column;
      gap: 1.25rem;

      .popupItem {
        display: flex;
        align-items: center;

        .popupIcon {}

        .popupText {
          margin-left: 1.1875rem;

          > span {
            font-weight: 400;
            font-size: 1rem;
            color: #1b1b1b;
          }
        }
      }
    }
  }
`;
