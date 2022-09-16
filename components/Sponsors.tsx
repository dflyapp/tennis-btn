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
import Link from "next/link";

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
      vnName: "Công ty TNHH TV ĐT XD Long Mekong", //cty tnhh tv dt xd long mekong
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
      <Link href="https://mayphatdienvogia.com/">
        https://mayphatdienvogia.com/
      </Link>
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
      <p>Chuyên thi công hạ tầng và san lấp mặt bằng.</p>
      <p>
        Chúng tôi có kinh nghiệp hơn 15 năm trong lĩnh vực hạ tầng, san lấp
        trong các khu công nghiệp, cụm công nghiệp, khu dân cư...
      </p>
      <p>Các công trình đã thực hiện trọng điểm tại các khu:</p>
      <ul>
        <li>1. Khu công nghiệp Linh Trung 3 - Trảng Bàng - Tây Ninh</li>
        <li>2. Khu công nghiệp Bourbon An Hoà - Trảng Bàng - Tây Nịn</li>
        <li>3. Khu công nghiệp Xuyên Á - Long An</li>
        <li>4. Khu công nghiệp Long Giang - Tiền Giang</li>
        <li>5. Khu dân cư Bà Rịa - Vũng Tàu</li>
        <li>6. Cảng bourbon Bến Lức</li>
        <li>7. Khu Dân Cư The Palm - Novaland Quận 9 - TPHCM</li>
        <li>Và nhiều công trình khác..</li>
      </ul>
      <p>
        Với tiêu chí đảm bảo chất lượng, tiến độ, thẩm mỹ với mọi công trình.
        Rất mong có được sự tin cậy, hợp tác từ mọi khách hàng.
      </p>
    </>
  );
}

function ContentLDTWindows() {
  return (
    <>
      <Link href="http://luuductai.com/">http://luuductai.com/</Link>
      <p>
        Trong nền kinh tế hội nhập và phát triển đã mang lại cho Doanh nghiệp
        biết bao cơ hội và không thiếu sự cạnh tranh đòi hỏi Doanh nghiệp phải
        không ngừng đầu tư và phát triển sản phẩm cho mình.
      </p>
      <p>
        LƯU ĐỨC TÀI đã chinh phục khách hàng bằng sự vượt trội về chất lượng
        cũng như mẫu mã sản phẩm. Vì thế quý khách hàng hoàn toàn yên tâm khi
        đến với sản phẩm của LƯU ĐỨC TÀI.
      </p>
      <p>Sản phẩm của LƯU ĐỨC TÀI đa dạng chủng loại nét đẹp phong phú:</p>
      <ul>
        <li>
          Cửa cuốn LƯU ĐỨC TÀI sản xuất theo công nghệ Đức, cửa cuốn siêu khe
          thoáng vận hành êm ái có độ vận hành cao, có độ dày 0.8 - 1.6 ly và hệ
          phụ kiện đi kèm được nhập khẩu từ các nhà sản xuất có uy tín.
        </li>
        <li>
          Cửa nhôm LƯU ĐỨC TÀI có độ dày 1.5 - 2.0 ly được sản xuất và lắp ráp
          theo công nghệ Châu Âu, sản phẩm được thiết kế đồng bộ với phụ kiện
          được nhập khẩu từ Đức.
        </li>
        <li>
          Cửa nhựa lõi thép LƯU ĐỨC TÀI được nhập khẩu thanh profiles từ tập
          đoàn REHAU, DIMEX Cộng Hòa Liên Bang Đức. Sản phẩm chất lượng cao.
        </li>
      </ul>
    </>
  );
}
