import fs from 'fs'
import path from 'path'

import Image from 'next/image'
import Header from 'components/Header'
import Footer from 'components/Footer'

export const metadata = {
  title: 'Tennis BTN - Hình ảnh',
  description:
    'Hình ảnh giao lưu diễn đàn tennis BTN đã được thành lập để tạo ra sân chơi đồng thời là nơi trao đổi kinh nghiệm, giao lưu kiến thức về tennis.',
}

export default function Page() {
  const hinhAnh = fs.readdirSync(path.join('public/hinh-anh'))
  const players = hinhAnh.map((filename) => `/hinh-anh/${filename}`)

  return (
    <>
      <Header />
      <div className="max-w-lg mx-auto">
        <div className="mt-20 flex flex-wrap justify-center">
          {players.map((e: any) => {
            return (
              <div className="my-8" key={e}>
                <Image src={e} alt={e} width={200} height={100} />
              </div>
            )
          })}
        </div>
      </div>

      <div className="my-12" />
      <Footer />
    </>
  )
}
