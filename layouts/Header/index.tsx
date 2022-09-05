import Image from "next/image";
import Link from "next/link";

// import MenuButton from "./MenuButton";
import Logo from "assets/tennis-logo.png";

export default function Header() {
  return (
    <header className="bg-primary py-4 flex justify-between items-center px-4 fixed top-0 left-0 w-full z-10">
      {/* <MenuButton className="px-0" /> */}
      <Link href="/bang-diem/nam">
        <button className="text-white border border-white rounded-md px-2 py-1">
          <span className="text-xs">Bảng điểm</span> <br />
          <span className="text-xl">NAM</span>
        </button>
      </Link>
      <Link href="/">
        <div className="w-16 h-16 cursor-pointer">
          <Image src={Logo} alt="logo" />
        </div>
      </Link>
      <Link href="/bang-diem/nu">
        <button className="text-white border border-white rounded-md px-2 py-1">
          <span className="text-xs">Bảng điểm</span> <br />
          <span className="text-xl">NỮ</span>
        </button>
      </Link>
    </header>
  );
}
