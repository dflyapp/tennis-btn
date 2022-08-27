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
    {
      name: "vg",
      vnName: "Công ty TNHH Máy Phát Điện Võ Gia",
      logo: Sponsor1,
      content: ContentVoGia,
    },
    {
      name: "son-sang",
      vnName: "Công ty TNHH Sơn Sang",
      logo: Sponsor2,
      content: ContentSS,
    },
    {
      name: "nst",
      vnName: "Công ty TNHH XD-TM Nhà Tây Sơn",
      logo: Sponsor3,
      content: ContentNTS,
    },
    {
      name: "long-mekong",
      vnName: "Công ty TNHH Long Mekong",
      logo: Sponsor4,
      content: ContentLongMK,
    },
    {
      name: "ldt",
      vnName: "Công ty TNHH LDT Windows",
      logo: Sponsor5,
      content: ContentLDTWindows,
    },
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
                <h1>Giới thiệu về công ty {e.vnName}</h1>
                <Image src={e.logo} alt={e.name} />
                <div className="sponsors">{e.content()}</div>
              </Dialog>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}

function ContentVoGia() {
  return (
    <>
      <p>
        Công ty Võ Gia tự hào là công ty chuyên nhập khẩu máy phát điện công
        nghiệp chính hãng, giá rẻ. Với đầy đủ thương hiệu máy phát điện khác
        nhau và các công suất từ 20kva - 3000kva.
      </p>
      <p>
        Sản phẩm máy phát điện công nghiệp tại Võ Gia là máy mới chính hãng 100%
        chưa qua sử dụng. Được công ty nhập khẩu nguyên chiếc và nhập khẩu linh
        kiện trực tiếp từ các thương hiệu lớn trên thế giới.
      </p>
    </>
  );
}

function ContentSS() {
  return (
    <div>
      <p>
        Công ty TNHH Sơn Sang luôn tự hào là đơn vị cung cấp dịch vụ bảo dưỡng,
        sửa chữa ô tô và xe có động cơ chuyên nghiệp và chất lượng tại khu vực
        thành phố Hồ Chí Minh.
      </p>
      <p>
        Bên cạnh đội ngũ lành nghề có nhiều năm kinh nghiệm trong việc bảo trì
        xe, công ty Sơn Sang còn là đơn vị chuyên bán phụ Tùng và các bộ phận
        phụ trợ từ các thương hiệu nổi tiếng đảm báo chất lượng cho thiết bị và
        người sử dụng.
      </p>
    </div>
  );
}

function ContentNTS() {
  return (
    <div>
      <p>
        Công ty TNHH XD TM Nhà Tây Sơn chuyển cũng cấp dịch vụ xây dựng, sửa
        chửa nhà cửa,căn hộ, biệt thự với đầy đủ quy mô chuyên nghiệp.
      </p>
      <p>
        Với hơn 25 năm kinh nghiệm tập trung vào chất lượng và sự hài lòng của
        khách hàng, Cty Nhà Tây Sơn vần luôn cập Nhật xu hướng nhà ở hiện đại để
        mang lại trải nghiệm tuyệt vời cho gia đình Việt Nam.
      </p>
    </div>
  );
}

function ContentLongMK() {
  return (
    <>
      <p>đang cập nhật nội dung</p>
    </>
  );
}

function ContentLDTWindows() {
  return (
    <>
      <p>đang cập nhật nội dung</p>
    </>
  );
}
