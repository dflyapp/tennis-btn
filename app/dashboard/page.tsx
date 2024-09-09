import Link from 'next/link'

export default async function Dashboard() {
  return (
    <div className="px-2 md:px-0 container mx-auto">
      <h1 className="text-left uppercase">Dashboard Page</h1>
      <div className="mt-12 flex flex-col gap-4">
        <Link href="/dashboard/male">Chỉnh điểm Nam</Link>
        <Link href="/dashboard/female">Chỉnh điểm Nữ</Link>
      </div>
    </div>
  )
}
