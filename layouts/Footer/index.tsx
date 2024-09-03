'use client'
import Image from 'next/image'

import LogoZalo from './logo-zalo.png'
import LogoFacebook from './logo-facebook.png'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import CountVisit from 'components/CountVisit'

export default function Footer() {
  const [url, setUrl] = useState('')

  useEffect(() => {
    const ua = navigator.userAgent
    if (/android/i.test(ua)) {
      setUrl(
        'fb://profile/Di%E1%BB%85n-%C4%90%C3%A0n-Tennis-B%E1%BA%AFc-Trung-Nam-61550725257652'
      )
    } else if (/iPad|iPhone|iPod/.test(ua) || navigator.maxTouchPoints > 1) {
      setUrl(
        'fb://page/Di%E1%BB%85n-%C4%90%C3%A0n-Tennis-B%E1%BA%AFc-Trung-Nam-61550725257652'
      )
    }
    setUrl(
      'https://www.facebook.com/p/Di%E1%BB%85n-%C4%90%C3%A0n-Tennis-B%E1%BA%AFc-Trung-Nam-61550725257652/'
    )
  }, [])

  return (
    <>
      <div className="text-center bg-gray-100 py-12 px-4 md:px-0">
        <h2 className="font-bold">
          LIÊN HỆ ĐĂNG KÝ THAM GIA GIẢI ĐẤU VÀ QUẢNG CÁO
        </h2>
        <p>Mr. Sơn Tào 0903 371 177</p>
        <div className="flex w-fit mx-auto my-4">
          <Link href="https://zalo.me/0903371177">
            <Image
              className="cursor-pointer"
              width={40}
              height={40}
              src={LogoZalo}
              alt="zalo"
            />
          </Link>
          <div className="w-8"></div>
          <Link href={url} target="_blank">
            <Image
              className="cursor-pointer"
              width={40}
              height={40}
              src={LogoFacebook}
              alt="facebook"
            />
          </Link>
        </div>
        <CountVisit />
      </div>
    </>
  )
}
