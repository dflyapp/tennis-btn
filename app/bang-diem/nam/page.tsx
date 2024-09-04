import { createClient } from 'utils/supabase/server'
import { SelectPlayerFemale } from 'db/schema'
import FilterTable from 'components/FilterTable'
import { Footer, Header } from 'layouts'

export default async function Page() {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('players_male')
    .select()
    .order('id')
    .returns<SelectPlayerFemale[]>()

  if (error) return <>Đã có lỗi xảy ra: {error.message}</>

  return (
    <>
      <Header />
      <div className="h-20" />
      <h1 className="text-center my-8">Bảng điểm nam</h1>
      <FilterTable dataSet={data} />
      <div className="h-12" />
      <Footer />
    </>
  )
}
