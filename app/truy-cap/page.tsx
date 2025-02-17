import { getCountsById } from 'db/queries'
import Link from 'next/link'
import { createClient } from 'utils/supabase/client'
import { SelectPlayerFemale } from 'db/schema'
import FilterTable from 'components/FilterTable'

export default async function Page() {
  const supabase = createClient()
  const { data: data1, error } = await supabase
    .from('players_female')
    .select()
    .order('id')
    .returns<SelectPlayerFemale[]>()

  if (error) return <>Error</>
  if (!data1) return <>Loading 123@@@@</>

  const data = await getCountsById(1)

  if (!data.length)
    return <span className="text-xs text-gray-400">có lỗi xày ra</span>

  return (
    <div className="container mx-auto">
      <Link href="/">back home</Link>
      <h1>Đếm lượt truy cập!</h1>
      <div className="text-xs text-gray-400">
        Truy cập dùng Server Component: {JSON.stringify(data[0].count)}
      </div>
      <FilterTable dataSet={data1} />
    </div>
  )
}
