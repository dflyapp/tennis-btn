import React, { useState } from 'react'
import Image from 'next/image'

const ImageWithFallback = (props: any) => {
  const { src, fallbackSrc, ...rest } = props
  const [imgSrc, setImgSrc] = useState(src)

  return (
    <Image
      {...rest}
      src={imgSrc}
      onError={() => {
        setImgSrc(fallbackSrc)
      }}
      alt="avatar"
    />
  )
}

export default ImageWithFallback

// ref: https://stackoverflow.com/questions/66949606/what-is-the-best-way-to-have-a-fallback-image-in-nextjs
