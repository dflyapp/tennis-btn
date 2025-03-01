'use client'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import * as Sentry from '@sentry/nextjs'

import TableClient from './TableClient'
import CreatePlayer from './CreatePlayer'
import { manualClearCache } from './actions'

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
  const queryClient = useQueryClient()
  const clearCacheAndRefetch = async () => {
    return Sentry.startSpan(
      {
        name: 'clearCacheAndRefetch',
        op: 'function',
      },
      async (span) => {
        try {
          queryClient.removeQueries({ queryKey: [MODEL] })
          await manualClearCache()
          await refetch()
          const searchInput = document.getElementById(
            'search-input'
          ) as HTMLInputElement

          if (searchInput) searchInput.value = ''
        } finally {
          span?.end()
        }
      }
    )
  }

  if (error) return <div>failed to load</div>

  if (isPending)
    return (
      <div className="flex mt-12 flex-col gap-4">
        <div className="skeleton rounded-none h-8 w-full"></div>
        <div className="skeleton rounded-none h-96 w-full"></div>
        <div className="skeleton rounded-none h-96 w-full"></div>
      </div>
    )

  return (
    <>
      <CreatePlayer model={MODEL} updateCache={clearCacheAndRefetch} />
      <TableClient
        model={MODEL}
        dataSet={data?.players}
        updateCache={clearCacheAndRefetch}
      />
    </>
  )
}
