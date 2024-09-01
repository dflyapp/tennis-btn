import { NextSeo } from 'next-seo'

import { Footer, Header } from 'layouts'
import { Loading } from 'components'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import FilterTableNam from 'components/FilterTableNam'
import { useQuery } from '@tanstack/react-query'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

type Person = {
  id: number
  nickName: string
  max: number
  min: number
  mobile: string
  isActive: number
}

export const getStaticProps = () => {
  return {
    props: {
      HIDE: process.env.HIDE,
    },
  }
}

export default function BangDiem({
  HIDE,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { isPending, error, data } = useQuery({
    queryKey: ['score'],
    queryFn: () => fetch('/api/score').then((res) => res.json()),
  })

  if (error) return <div>failed to load</div>
  if (!data) return <Loading />

  if (HIDE === 'true') {
    return (
      <>
        <NextSeo
          title="Tennis BTN - Bảng điểm Nam"
          description="Thông tin bảng điểm nam"
        />
        <Header />
        <h1 className="text-center my-8">Bảng điểm nam</h1>
        <p className="text-center">
          Điểm đang được cập nhật. Vui lòng quay lại sau.
        </p>
      </>
    )
  }

  const x = data[0].data.filter((e: any) => e.length >= 5 && e[0] > 0)
  let result: Person[] = []
  x.forEach((e: any) => {
    result.push({
      id: e[0],
      nickName: e[2],
      max: e[3],
      min: e[4],
      mobile: e[5],
      isActive: e[6],
    })
  })

  // only show members is active and has value 1, 0 means hidden
  result = result.filter((e) => e.isActive === 1)

  return (
    <>
      <NextSeo
        title="Tennis BTN - Bảng điểm Nam"
        description="Thông tin bảng điểm nam"
      />
      <Header />

      <h1 className="text-center my-8">Bảng điểm nam</h1>

      <FilterTableNam dataSet={result} />

      <div className="my-12" />
      <Footer />
    </>
  )
}
