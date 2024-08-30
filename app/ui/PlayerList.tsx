'use client'
import useSWR from 'swr'

const fetcher = (url: string) =>
  fetch(url, { method: 'GET' }).then((res) => res.json())

export default function PlayerList() {
  const { data, error, isLoading } = useSWR('/api/players', fetcher)
  const { players } = data || {}

  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>

  return (
    <div className="container mx-auto">
      <h1>Dashboard</h1>
      <button
        disabled={true}
        className="btn btn-primary"
        onClick={async () => {}}
      >
        update client
      </button>
      <div className="flex flex-col">
        {players?.map((e: any) => {
          return (
            <div className="my-2 border w-fit p-2 rounded-md" key={e.id}>
              <p>
                {e.id}: {e.name}
              </p>
              <p>{e.min}</p>
              <p>{e.max}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
