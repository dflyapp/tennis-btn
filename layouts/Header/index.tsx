import Image from "next/image";

import MenuButton from "./MenuButton";
import Logo from "assets/tennis-logo.png";

export default function Header() {
  return (
    <header className="bg-primary py-4 flex justify-between px-4">
      <MenuButton className="px-0" />
      <div className="w-16 h-16">
        <Image src={Logo} alt="logo" />
      </div>
    </header>
  );
}
