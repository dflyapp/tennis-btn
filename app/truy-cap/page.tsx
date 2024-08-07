import { getCountsById } from 'db/queries'
import Link from 'next/link'

export default async function Page() {
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
    </div>
  )
}
