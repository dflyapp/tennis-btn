'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="container mx-auto">
        <section className="bg-gray-50">{children}</section>
      </div>
    </QueryClientProvider>
  )
}
