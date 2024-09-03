import { createClient } from 'utils/supabase/client'
import { SelectPlayerFemale } from 'db/schema'
import FilterTable from 'components/FilterTable'
import { Loading } from 'components'
import { Header } from 'layouts'

export default async function Page() {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('players_female')
    .select()
    .order('id')
    .returns<SelectPlayerFemale[]>()

  if (error) return <>Đã có lỗi xảy ra</>
  if (!data) return <Loading />

  if (!data.length)
    return <span className="text-xs text-gray-400">có lỗi xày ra</span>

  return (
    <>
      <Header />
      <div className="h-20" />
      <h1 className="text-center my-8">Bảng điểm nữ</h1>
      <FilterTable dataSet={data} />
      <div className="h-12" />
    </>
  )
}
