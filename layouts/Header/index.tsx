import Image from "next/image";
import Link from "next/link";

import MenuButton from "./MenuButton";
import Logo from "assets/tennis-logo.png";

export default function Header() {
  return (
    <header className="bg-primary py-4 flex justify-between items-center px-4">
      <MenuButton className="px-0" />
      <Link href="/">
        <div className="-ml-8 w-16 h-16 cursor-pointer">
          <Image src={Logo} alt="logo" />
        </div>
      </Link>
      <div />
    </header>
  );
}
