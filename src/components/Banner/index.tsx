import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper'
import 'swiper/css'

import { Container } from './styles'

export function Banner() {
  return (
    <Container>
      <Swiper
        slidesPerView={1}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        modules={[Autoplay]}
      >
        <SwiperSlide>
          <div className="slideImg">
            1
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="slideImg">
            2
          </div>
        </SwiperSlide>
      </Swiper>
    </Container>
  )
}
