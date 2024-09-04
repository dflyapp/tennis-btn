import { createClient } from 'utils/supabase/server'
import { SelectPlayerFemale } from 'db/schema'
import FilterTable from 'components/FilterTable'

export const metadata = {
  title: 'Tennis BTN - Bảng điểm Nữ',
  description: 'Xem điểm Max và Min của vận động viên Nữ',
}

export default async function Page() {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('players_female')
    .select()
    .order('id')
    .returns<SelectPlayerFemale[]>()

  if (error) return <>Đã có lỗi xảy ra: {error.message}</>

  return (
    <>
      <h1 className="text-center my-8">Bảng điểm nữ</h1>
      <FilterTable dataSet={data} />
    </>
  )
}
