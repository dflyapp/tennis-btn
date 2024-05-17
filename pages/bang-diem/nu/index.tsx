import useSWR from 'swr'
import { Loading } from 'components'
import { Header } from 'layouts'
import FilterTable from './FilterTable'
import { NextSeo } from 'next-seo'
import { GetStaticProps, InferGetStaticPropsType } from 'next'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

type Person = {
  id: number
  nickName: string
  max: number
  min: number
  mobile: string
  isActive: number
}

type ServerData = {
  hideScore: boolean
}

export const getStaticProps = (async (context) => {
  const res = await fetch(`${process.env.BACKEND_API_ENDPOINT}/score`)
  const serverData = await res.json()
  return { props: { serverData } }
}) satisfies GetStaticProps<{
  serverData: ServerData
}>

export default function BangDiem({
  serverData,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { data, error } = useSWR('/api/score', fetcher)

  if (error) return <div>failed to load</div>
  if (!data) return <Loading />

  if (serverData?.hideScore) {
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

  const x = data[1].data.filter((e: any) => e.length >= 5 && e[0] > 0)
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
        title="Tennis BTN - Bảng điểm Nữ"
        description="Thông tin bảng điểm nữ"
      />
      <Header />
      <h1 className="text-center my-8">Bảng điểm nữ</h1>
      <FilterTable dataSet={result} />
    </>
  )
}
