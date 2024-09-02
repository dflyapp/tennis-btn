'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AdminFooter from 'app/ui/AdminFooter'
import AdminHeader from 'app/ui/AdminHeader'

const queryClient = new QueryClient()

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="px-2 md:px-0 container max-w-lg mx-auto">
        <AdminHeader />
        {children}
        <AdminFooter />
      </div>
    </QueryClientProvider>
  )
}
