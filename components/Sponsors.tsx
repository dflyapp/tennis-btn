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
    { name: "vg", logo: Sponsor1, content: NTS },
    { name: "son-sang", logo: Sponsor2, content: NTS },
    { name: "nst", logo: Sponsor3, content: NTS },
    { name: "long-mekong", logo: Sponsor4, content: NTS },
    { name: "ldt", logo: Sponsor5, content: NTS },
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
                <h1>Giới thiệu về công ty {e.name}</h1>
                <Image src={e.logo} alt={e.name} />
                <div>{e.content()}</div>
              </Dialog>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}

function NTS() {
  return (
    <div>
      <p>
        Vinamilk được thành lập vào ngày 20/08/1976, dựa trên cơ sở tiếp quản 3
        nhà máy sữa do chế độ cũ để lại:Nhà máy sữa Thống Nhất (tiền thân là nhà
        máy Foremost); Nhà máy sữa Trường Thọ (tiền thân là nhà máy Cosuvina);
        Nhà máy sữa Bột Dielac.Vào tháng 3 năm 1994, Vinamilk chính thức khánh
        thành Nhà máy sữa đầu tiên ở Hà Nội.
      </p>
    </div>
  );
}
