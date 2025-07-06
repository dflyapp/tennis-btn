'use client'

import Image from 'next/image'

import Logo from 'assets/tennis-logo.png'
import { useEffect, useState } from 'react'

export default function MobileHeader() {
  const [secret, setSecret] = useState<null | string>(null)

  useEffect(() => {
    const localSecret = localStorage.getItem('secret')
    if (localSecret !== null) {
      setSecret(localSecret)
    }
  }, [])

  return (
    <section className="z-20 fixed top-0 left-0 bg-primary h-20 w-full">
      <div className="flex items-center justify-center h-full gap-x-4">
        <Image src={Logo} width={50} height={50} alt="logo" />
        <form>
          <input
            type="password"
            className="input input-bordered w-24 md:w-64 text-sm"
            placeholder="số bí mật"
            onChange={(e) => setSecret(e.target.value)}
            value={secret || ''}
          />
          <button
            className="btn"
            onClick={(e) => {
              e.preventDefault()
              localStorage.setItem('secret', secret || '')
            }}
          >
            gửi
          </button>
        </form>
        <button
          className="btn"
          onClick={() => {
            window.location.reload()
          }}
        >
          tải lại
        </button>
      </div>
    </section>
  )
}
