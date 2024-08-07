import useSWR from 'swr'
import Loading from './Loading'
import { SelectCount } from 'db/schema'
import { useEffect } from 'react'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function CountVisit() {
  const { data, error } = useSWR<SelectCount[]>('/api/count', fetcher)

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
