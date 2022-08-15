import Image from "next/image";

import LogoZalo from "./logo-zalo.png";
import LogoFacebook from "./logo-facebook.png";

export default function Footer() {
  return (
    <>
      <div className="text-center text-primary bg-gray-200 py-12">
        <h2 className="font-bold">
          LIÊN HỆ ĐĂNG KÝ THAM GIA GIẢI ĐẤU VÀ QUẢNG CÁO
        </h2>
        <p>Mr. Sơn Tào (+84) 903 371 177</p>
        <div className="flex w-fit mx-auto mt-4">
          <Image width={30} height={30} src={LogoZalo} alt="zalo" />
          <div className="w-4"></div>
          <Image width={30} height={30} src={LogoFacebook} alt="facebook" />
        </div>
      </div>
    </>
  );
}
