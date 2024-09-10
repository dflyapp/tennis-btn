import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames'
import { usePathname } from 'next/navigation'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default function AdminHeader() {
  const { isPending, error, data } = useQuery({
    queryKey: ['get-user'],
    queryFn: () => fetch('/api/get-user').then((res) => res.json()),
  })
  const pathname = usePathname()
  if (error) {
    redirect('/login')
  }

  if (isPending)
    return (
      <>
        <div className="skeleton h-20 w-full"></div>
      </>
    )

  return (
    <>
      <div className="-mt-16 mb-4 flex items-center gap-x-2">
        <Link
          className={classNames('btn rounded-none w-20 no-animation', {
            'btn-primary': !pathname?.includes('female'),
          })}
          href="/dashboard/male"
        >
          Nam
        </Link>
        <Link
          className={classNames('btn rounded-none w-20 no-animation', {
            'btn-primary': pathname?.includes('female'),
          })}
          href="/dashboard/female"
        >
          Nữ
        </Link>
      </div>
    </>
  )
}
