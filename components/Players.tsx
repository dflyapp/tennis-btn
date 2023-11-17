import Image from 'next/image'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'

export default function Players({ players }: any) {
  return (
    <>
      <Swiper
        slidesPerView={2}
        spaceBetween={0}
        slidesPerGroup={1}
        loop={true}
        loopFillGroupWithBlank={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={false}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
      >
        {players.map((e: any) => {
          return (
            <SwiperSlide className="mx-0 my-4" key={e}>
              <div className="w-48 h-48 mb-6">
                <img src={e} alt={e} />
              </div>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </>
  )
}
