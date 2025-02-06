import { createClient } from 'utils/supabase/server'
import { SelectPlayerFemale } from 'db/schema'
import FilterTable from 'components/FilterTable'

export const metadata = {
  title: 'Tennis BTN - Bảng điểm Nam',
  description: 'Xem điểm Max và Min của vận động viên Nam',
}

export default async function Page() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('players_male')
    .select()
    .order('id')
    .returns<SelectPlayerFemale[]>()

  if (error) return <>Đã có lỗi xảy ra: {error.message}</>

  return (
    <>
      <h1 className="text-center my-8">Bảng điểm nam</h1>
      <FilterTable dataSet={data} />
    </>
  )
}
