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
    <html lang="en" data-theme="mytheme">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="container mx-auto pt-4 max-w-lg">
        <QueryClientProvider client={queryClient}>
          <div className="px-2 md:px-0 container max-w-lg mx-auto">
            <AdminHeader />
            <section className="bg-gray-50 pt-2 -mt-4 border-2 border-primary p-2">
              {children}
            </section>
            <AdminFooter />
          </div>
        </QueryClientProvider>
      </body>
    </html>
  )
}
