'use client'
import { SelectPlayerFemale } from 'db/schema'
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'
import EditPlayer from './EditPlayer'
import CreatePlayer from './CreatePlayer'
import TanksackTable from './TansackTable'

const fetcher = (url: string) =>
  fetch(url, { method: 'GET' }).then((res) => res.json())
const updateName = (url: string) =>
  fetch(url, { method: 'PUT' }).then((res) => res.json())

export default function PlayerList() {
  const { data, error, isLoading, mutate } = useSWR(
    '/api/players-female',
    fetcher
  )
  const { players } = data || {}
  const { trigger } = useSWRMutation('/api/players/1', updateName)

  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>

  return (
    <div className="px-2 md:px-0 container mx-auto">
      <h1>Bảng điểm nữ</h1>
      <TanksackTable />

      {/* <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Max</th>
            <th>Min</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {players?.map((e: SelectPlayerFemale) => {
            return (
              <tr key={e.id}>
                <th>{e.id}</th>
                <td> {e.name}</td>
                <td>{e.max}</td>
                <td>{e.min}</td>
                <td>
                  <EditPlayer player={e} updateCache={() => mutate()} />
                </td>
              </tr>
            )
          })}
        </tbody>
      </table> */}
    </div>
  )
}
