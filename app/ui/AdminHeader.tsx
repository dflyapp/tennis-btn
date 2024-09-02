import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function AdminHeader() {
  const { isPending, error, data } = useQuery({
    queryKey: ['get-user'],
    queryFn: () => fetch('/api/get-user').then((res) => res.json()),
  })
  const pathname = usePathname()

  if (error) return <>Error {error}</>
  if (isPending)
    return (
      <>
        <div className="skeleton h-20 w-full"></div>
      </>
    )

  return (
    <>
      <div className="mb-4 flex items-center gap-x-2">
        <Link
          className={classNames('btn', {
            'btn-secondary': !pathname?.includes('female'),
          })}
          href="/dashboard/male"
        >
          Nam
        </Link>
        <Link
          className={classNames('btn', {
            'btn-secondary': pathname?.includes('female'),
          })}
          href="/dashboard/female"
        >
          Nữ
        </Link>
      </div>
      <p className="text-xs">
        Xin chào <strong>{data?.user?.email}!</strong>
      </p>
    </>
  )
}
