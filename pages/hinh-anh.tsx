import fs from 'fs'
import path from 'path'

import { Footer, Header } from 'layouts'
import Image from 'next/image'
import Head from 'next/head'

export default function HinhAnh({ players }: any) {
  return (
    <>
      <Head>
        <title>Tennis BTN - Hình ảnh</title>
        <meta
          name="description"
          content="Hình ảnh giao lưu diễn đàn tennis BTN đã được thành lập để tạo ra sân chơi đồng thời là nơi trao đổi kinh nghiệm, giao lưu kiến thức về tennis."
        />
      </Head>
      <Header />
      <div className="max-w-lg mx-auto">
        <div className="flex flex-wrap justify-center">
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

export async function getStaticProps() {
  const hinhAnh = fs.readdirSync(path.join('public/hinh-anh'))
  const players = hinhAnh.map((filename) => `/hinh-anh/${filename}`)

  return {
    props: {
      players,
    },
  }
}
