import Loading from './Loading'
import { SelectCount } from 'db/schema'
import { useQuery } from '@tanstack/react-query'

export default function CountVisit() {
  const { isPending, error, data } = useQuery({
    queryKey: ['count'],
    queryFn: () => fetch('/api/count').then((res) => res.json()),
  })

  if (error) return <span className="text-xs text-gray-400">có lỗi xày ra</span>
  if (!data) return <Loading />

  return (
    <>
      <span className="text-xs text-gray-400">
        Truy cập: {JSON.stringify(data[0].count)}
      </span>
    </>
  )
}
