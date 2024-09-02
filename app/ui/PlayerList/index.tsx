'use client'
import { useQuery } from '@tanstack/react-query'

import TableClient from './TableClient'
import CreatePlayer from './CreatePlayer'

export type ModelType = 'players_male' | 'players_female'

interface PlayerListProps {
  MODEL: ModelType // "players_female"
  API: string // "/api/players-female"
}

export default function PlayerList({ MODEL, API }: PlayerListProps) {
  const { isPending, error, data, refetch } = useQuery({
    queryKey: [MODEL],
    queryFn: () => fetch(API).then((res) => res.json()),
  })

  if (error) return <div>failed to load</div>
  if (isPending)
    return (
      <div className="flex mt-12 flex-col gap-4">
        <div className="skeleton h-8 w-full"></div>
        <div className="skeleton h-24 w-full"></div>
      </div>
    )

  return (
    <>
      <CreatePlayer
        model={MODEL}
        updateCache={async () => {
          await refetch()
          const searchInput = document.getElementById(
            'search-input'
          ) as HTMLInputElement
          searchInput.value = ''
        }}
      />
      <TableClient
        model={MODEL}
        dataSet={data?.players}
        updateCache={async () => {
          await refetch()
          const searchInput = document.getElementById(
            'search-input'
          ) as HTMLInputElement
          searchInput.value = ''
        }}
      />
    </>
  )
}
