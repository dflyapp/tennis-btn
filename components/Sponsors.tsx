import Image from "next/image";

import Sponsor1 from "assets/sponsors/duc-phat.jpg";
import Sponsor2 from "assets/sponsors/nam-hai.jpg";
import Sponsor3 from "assets/sponsors/dong-duong-vina.jpg";
import Sponsor4 from "assets/sponsors/happy-home.jpg";
import Sponsor5 from "assets/sponsors/my-pham-anhnhat.jpg";
import Sponsor6 from "assets/sponsors/tuan-phat.jpg";
import Sponsor7 from "assets/sponsors/ve-may-bay.jpg";

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
      name: "sponsor-1",
      vnName: "Công ty TNHH SX TM DV & XD Đức Phát",
      logo: Sponsor1,
      content: () => (
        <>
          <p className="flex gap-x-2">
            <span>Địa chỉ website:</span>
            <Link href="http://chieusangducphat.com/gioi-thieu.html">
              chieusangducphat.com
            </Link>
          </p>
          <p>
            Sản xuất,Kinh doanh,xuất nhập khẩu thiết bị điện & chiếu sáng. Bao
            gồm các loại đèn LED cao áp, đèn chiếu sáng công cộng, đèn pha, đèn
            công nghiệp, trụ đèn trang trí, trụ thép chiếu sáng, các thiết bị cơ
            khí phục vụ cho ngàng điện và xây dựng. Phục vụ trong lĩnh vực chiếu
            sáng giao thông đô thị, khu dân cư, trung tâm thương mại, khu công
            nghiệp, nhà kho, xí nghiệp, công viên quảng trường, khu vui chơi
            giải trí, sân thể thao, sân bay, bến cảng, . . .
          </p>
        </>
      ),
    },
    {
      name: "sponsor-2",
      vnName: "Công ty TNHH CB & KD Than Nam Hải",
      logo: Sponsor2,
      content: () => (
        <>
          <p className="flex gap-x-2">
            <span>Địa chỉ website:</span>
            <Link href="http://thannamhai.com/">thannamhai.com</Link>
          </p>
          <p>
            Công ty TNHH Chế Biến Và Kinh Doanh Than Nam Hải chuyên cung cấp
            than đá Quảng Ninh và than nhập khẩu tới các khách hàng ở khu vực
            phía Nam như TP.HCM, Đồng Nai, Bình Dương, Tây Ninh, Bình Thuận,
            Vũng Tàu, Cần Thơ, An Giang, Long An… Với truyền thống, bề dày kinh
            nghiệm trong lĩnh vực than đá và phương châm kinh doanh Uy tín và
            Chất lượng, tới nay công ty chúng tôi tự hào đã là đối tác cung cấp
            hàng đầu của rất nhiều khách hàng là các nhà máy sản xuất và cả
            những doanh nghiệp kinh doanh than đá ở khu vực phía Nam Sản phẩm
            than đá của chúng tôi cung cấp chuyên phục vụ đốt lò hơi công nghiệp
            cho các nhà máy sản xuất phân bón, xi măng, bê tông, sắt thép, thức
            ăn gia súc, dệt nhuộm, sản xuất giấy… và rất nhiều các ngành công
            nghiệp khác. Quý khách có nhu cầu mua than đá, hãy liên hệ với công
            ty chúng tôi để được tư vấn sử dụng than đá hiệu quả nhất !
          </p>
        </>
      ),
    },
    {
      name: "sponsor-3",
      vnName: "CÔNG TY TNHH THƯƠNG MẠI KỸ THUẬT ĐÔNG DƯƠNG VI NA",
      logo: Sponsor3,
      content: () => (
        <>
          <p className="flex gap-x-2">
            <span>Địa chỉ website:</span>
            <Link href="https://dongduongvina.com.vn/gioi-thieu/gioi-thieu">
              dongduongvina.com.vn
            </Link>
          </p>
          <p>
            Nhà phân phối chuyên nghiệp các giải pháp công nghệ trong lĩnh vực
            chế biến và đóng gói thủy hải sản, thực phẩm, nông sản
          </p>
        </>
      ),
    },
    {
      name: "sponsor-4",
      vnName: "Công ty Happy Home",
      logo: Sponsor4,
      content: () => (
        <>
          <p>Nội dung đang được cập nhật</p>
        </>
      ),
    },
    {
      name: "sponsor-5",
      vnName: "Công ty Mỹ Phẩm Anh Nhật",
      logo: Sponsor5,
      content: () => (
        <>
          <p>Nội dung đang được cập nhật</p>
        </>
      ),
    },
    {
      name: "sponsor-6",
      vnName: "Công ty Tuấn Phát",
      logo: Sponsor6,
      content: () => (
        <>
          <p>Nội dung đang được cập nhật</p>
        </>
      ),
    },
    {
      name: "sponsor-7",
      vnName: "Công ty Vé Máy Bay Hạnh Phúc",
      logo: Sponsor7,
      content: () => (
        <>
          <p>Nội dung đang được cập nhật</p>
        </>
      ),
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
