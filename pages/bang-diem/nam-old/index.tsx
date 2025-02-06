import { Loading } from 'components'
import { Footer, Header } from 'layouts'
import { InferGetStaticPropsType } from 'next'
import FilterTable from 'components/FilterTable'
import { createClient } from 'utils/supabase/client'
import { SelectPlayerFemale } from 'db/schema'
import Head from 'next/head'

export async function getStaticProps() {
  const supabase = createClient()
  const response = await supabase
    .from('players_male')
    .select()
    .order('id')
    .returns<SelectPlayerFemale[]>()

  return {
    props: {
      response,
    },
  }
}

export default function BangDiem({
  response,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { error, data } = response

  if (error) return <div>failed to load</div>
  if (!data) return <Loading />

  return (
    <>
      <Head>
        <title>Tennis BTN - Bảng điểm Nam</title>
        <meta name="description" content="Thông tin bảng điểm nam" />
      </Head>
      <Header />
      <h1 className="text-center my-8">Bảng điểm nam</h1>
      <FilterTable dataSet={data} />

      <div className="my-12" />
      <Footer />
    </>
  )
}
