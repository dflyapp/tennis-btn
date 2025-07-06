'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

const queryClient = new QueryClient()

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isValid, setIsValid] = useState(true)

  useEffect(() => {
    const SECRET = localStorage.getItem('secret')
    if (SECRET === null || SECRET !== process.env.NEXT_PUBLIC_SECRET) {
      setIsValid(false)
    }
  }, [])

  if (!isValid) return <p>Không có quyền truy cập</p>
  
  return (
    <QueryClientProvider client={queryClient}>
      <div className="container mx-auto">
        <section className="bg-gray-50">{children}</section>
      </div>
    </QueryClientProvider>
  )
}
