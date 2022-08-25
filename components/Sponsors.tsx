import Image from "next/image";

import Sponsor1 from "assets/sponsors/sponsor-1.jpeg";
import Sponsor2 from "assets/sponsors/sponsor-2.jpeg";
import Sponsor3 from "assets/sponsors/sponsor-3.jpeg";
import Sponsor4 from "assets/sponsors/sponsor-4.jpeg";
import Sponsor5 from "assets/sponsors/sponsor-5.jpeg";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";
import Dialog from "./DialogBrand";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

export default function Sponsors() {
  const sponsorList = [
    { name: "vg", logo: Sponsor1 },
    { name: "son-sang", logo: Sponsor2 },
    { name: "nst", logo: Sponsor3 },
    { name: "long-mekong", logo: Sponsor4 },
    { name: "ldt", logo: Sponsor5 },
  ];
  return (
    <>
      <Swiper
        slidesPerView={1}
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
        {sponsorList.map((e) => {
          return (
            <SwiperSlide className="mx-0" key={e.name}>
              <Dialog content={e}>
                <h1>Giới thiệu về công ty</h1>
                <Image src={e.logo} alt={e.name} />
                <p>hello {JSON.stringify(e)}</p>
              </Dialog>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}
