import Image from "next/image";

import LogoZalo from "./logo-zalo.png";
import LogoFacebook from "./logo-facebook.png";
import Link from "next/link";

export default function Footer() {
  return (
    <>
      <div className="text-center text-primary bg-gray-200 py-12">
        <h2 className="font-bold">
          LIÊN HỆ ĐĂNG KÝ THAM GIA GIẢI ĐẤU VÀ QUẢNG CÁO
        </h2>
        <p>Mr. Sơn Tào (+84) 903 371 177</p>
        <div className="flex w-fit mx-auto mt-4">
          <Link href="https://zalo.me/0903371177">
            <Image
              className="cursor-pointer"
              width={30}
              height={30}
              src={LogoZalo}
              alt="zalo"
            />
          </Link>
          <div className="w-4"></div>
          <Link href="https://www.facebook.com/Di%E1%BB%85n-%C4%90%C3%A0n-Tennis-BTN-104833428859613">
            <Image
              className="cursor-pointer"
              width={30}
              height={30}
              src={LogoFacebook}
              alt="facebook"
            />
          </Link>
        </div>
      </div>
    </>
  );
}
