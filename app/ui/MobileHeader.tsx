import Image from 'next/image'

import Logo from 'assets/tennis-logo.png'

export default function MobileHeader() {
  return (
    <section className="z-20 fixed top-0 left-0 bg-primary h-12 w-full">
      <div className="flex items-center justify-center h-full">
        <Image src={Logo} width={36} height={36} alt="logo" />
      </div>
    </section>
  )
}
