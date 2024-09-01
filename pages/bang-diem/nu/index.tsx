import { Loading } from 'components'
import { Footer, Header } from 'layouts'
import { NextSeo } from 'next-seo'
import { InferGetStaticPropsType } from 'next'
import FilterTable from 'components/FilterTable'
import { useQuery } from '@tanstack/react-query'

export async function getStaticProps() {
  return {
    props: {
      HIDE: process.env.HIDE,
    },
  }
}

export default function BangDiem({
  HIDE,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { isPending, error, data, refetch } = useQuery({
    queryKey: ['players-female-key'],
    queryFn: () => fetch('/api/players-female').then((res) => res.json()),
  })

  if (error) return <div>failed to load</div>
  if (isPending) return <Loading />

  if (HIDE === 'true') {
    return (
      <>
        <NextSeo
          title="Tennis BTN - Bảng điểm Nữ"
          description="Thông tin bảng điểm nữ"
        />
        <Header />
        <h1 className="text-center my-8">Bảng điểm nữ</h1>
        <p className="text-center">
          Điểm đang được cập nhật. Vui lòng quay lại sau.
        </p>
      </>
    )
  }

  return (
    <>
      <NextSeo
        title="Tennis BTN - Bảng điểm Nữ"
        description="Thông tin bảng điểm nữ"
      />
      <Header />
      <h1 className="text-center my-8">Bảng điểm nữ</h1>
      <FilterTable dataSet={data?.players} />

      <div className="my-12" />
      <Footer />
    </>
  )
}
