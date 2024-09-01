'use client'
import TableClient from './TableClient'

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
import CreatePlayer from './CreatePlayer'

const queryClient = new QueryClient()

export default function PlayerList() {
  return (
    <QueryClientProvider client={queryClient}>
      <Example />
    </QueryClientProvider>
  )
}

function Example() {
  const { isPending, error, data, refetch } = useQuery({
    queryKey: ['players-female-key'],
    queryFn: () => fetch('/api/players-female').then((res) => res.json()),
  })

  if (error) return <div>failed to load</div>
  if (isPending) return <div>loading...</div>

  return (
    <div className="px-2 md:px-0 container max-w-lg mx-auto">
      <div className="flex items-center justify-between">
        <h1>Bảng điểm nữ</h1>
        <CreatePlayer
          updateCache={async () => {
            await refetch()
            const searchInput = document.getElementById(
              'search-input'
            ) as HTMLInputElement
            searchInput.value = ''
          }}
        />
      </div>
      <TableClient
        dataSet={data?.players}
        updateCache={async () => {
          await refetch()
          const searchInput = document.getElementById(
            'search-input'
          ) as HTMLInputElement
          searchInput.value = ''
        }}
      />
    </div>
  )
}
