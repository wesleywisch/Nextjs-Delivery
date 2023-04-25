import styled from "styled-components";

export const Container = styled.div`
  margin: 1.5rem;

  .slideImg {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 150px;
    object-fit: cover;
    background-color: #ccc;
    color: #fff;
  }

  .swiper {
    width: 100%;
    height: 100%;
    border-radius: .5rem;
    box-shadow: 0px 8px 40px rgba(0,0,0,0.08);
  }

  .swiper-slide {
    text-align: center;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
