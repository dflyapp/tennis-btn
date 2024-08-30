'use client'
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'

const fetcher = (url: string) =>
  fetch(url, { method: 'GET' }).then((res) => res.json())
const updateName = (url: string) =>
  fetch(url, { method: 'PUT' }).then((res) => res.json())

export default function PlayerList() {
  const { data, error, isLoading, mutate } = useSWR('/api/players', fetcher)
  const { players } = data || {}
  const { trigger } = useSWRMutation('/api/players/1', updateName)

  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>

  return (
    <div className="px-2 md:px-0 container mx-auto">
      <h1>Dashboard</h1>
      <input
        type="text"
        placeholder="Tìm tên, điểm"
        className="input input-bordered w-full max-w-xs my-4"
      />
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Min</th>
            <th>Max</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {players?.map((e: any) => {
            return (
              <tr key={e.id}>
                <th>{e.id}</th>
                <td> {e.name}</td>
                <td>{e.min}</td>
                <td>{e.max}</td>
                <td>
                  <button disabled={false} className="btn" onClick={() => {}}>
                    Chỉnh sửa
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>

      <div className="mt-8">
        <button
          disabled={false}
          className="btn btn-primary"
          onClick={async () => {
            await trigger()
            mutate()
          }}
        >
          Tạo VĐV Mới
        </button>
      </div>
    </div>
  )
}
