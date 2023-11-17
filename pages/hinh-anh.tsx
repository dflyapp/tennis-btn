import fs from 'fs'
import path from 'path'

import { Header } from 'layouts'
import { NextSeo } from 'next-seo'

export default function HinhAnh({ players }: any) {
  return (
    <>
      <NextSeo
        title="Tennis BTN - Hình ảnh"
        description="Hình ảnh giao lưu diễn đàn tennis BTN đã được thành lập để tạo ra sân chơi đồng thời là nơi trao đổi kinh nghiệm, giao lưu kiến thức về tennis."
      />
      <Header />
      <div className="max-w-lg mx-auto">
        <div className="flex flex-wrap justify-center">
          {players.map((e: any) => {
            return (
              <div className="my-8" key={e}>
                <img src={e} alt={e} />
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export async function getStaticProps() {
  const hinhAnh = fs.readdirSync(path.join('public/hinh-anh'))
  const players = hinhAnh.map((filename) => `/hinh-anh/${filename}`)

  return {
    props: {
      players,
    },
  }
}
