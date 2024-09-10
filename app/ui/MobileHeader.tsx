import Image from 'next/image'

import Logo from 'assets/tennis-logo.png'

export default function MobileHeader() {
  return (
    <section className="z-20 fixed top-0 left-0 bg-primary h-20 w-full">
      <div className="flex items-center justify-center h-full">
        <Image src={Logo} width={50} height={50} alt="logo" />
      </div>
    </section>
  )
}
