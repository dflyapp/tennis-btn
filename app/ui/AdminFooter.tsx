import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'

export default function AdminFooter() {
  const { isPending, error, data } = useQuery({
    queryKey: ['get-user'],
    queryFn: () => fetch('/api/get-user').then((res) => res.json()),
  })

  if (isPending)
    return (
      <>
        <div className="skeleton h-20 w-full mt-12"></div>
      </>
    )

  return (
    <div className="h-40 bg-gray-100 mt-12 p-8">
      <p className="text-xs">
        Xin chào <strong>{data?.user?.email}!</strong>
      </p>
      <p className="text-xs">Trang login dùng để thoát và migrate</p>
      <div className="mt-4 flex">
        <Link className="btn btn-link" href="/login">
          Trang Login
        </Link>
        <Link className="btn btn-link" href="/">
          Trang chủ
        </Link>
        <Link className="btn btn-link" href="/bang-diem/nam">
          Nam
        </Link>
        <Link className="btn btn-link" href="/bang-diem/nu">
          Nữ
        </Link>
      </div>
    </div>
  )
}
