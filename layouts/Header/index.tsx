import Image from "next/image";
import Link from "next/link";

// import MenuButton from "./MenuButton";
import Logo from "assets/tennis-logo.png";

export default function Header() {
  return (
    <header className="bg-primary py-4 flex justify-between lg:justify-center lg:gap-x-4 items-center px-4 fixed top-0 left-0 w-full z-10">
      {/* <MenuButton className="px-0" /> */}
      <Link href="/giai-dau">
        <button className="text-white border border-white rounded-md px-2 py-3">
          <span className="text-xs">Sự Kiện</span>
        </button>
      </Link>
      <Link href="/bang-diem/nam">
        <button className="flex flex-col items-center text-white border border-white rounded-md px-2 py-1">
          <span style={{ fontSize: "0.5rem" }}>Bảng điểm</span>
          <span className="text-xl">NAM</span>
        </button>
      </Link>
      <Link href="/">
        <div className="w-16 h-16 cursor-pointer">
          <Image src={Logo} alt="logo" />
        </div>
      </Link>
      <Link href="/bang-diem/nu">
        <button className="flex flex-col items-center text-white border border-white rounded-md px-2 py-1">
          <span style={{ fontSize: "0.5rem" }}>Bảng điểm</span>
          <span className="text-xl">NỮ</span>
        </button>
      </Link>
      <Link href="/hinh-anh">
        <button className="text-white border border-white rounded-md px-2 py-3">
          <span className="text-xs">Hình Ảnh</span>
        </button>
      </Link>
    </header>
  );
}
