'use client'

import Link from 'next/link'
import { useEffect } from 'react'

const SpecificRoute = () => {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').then(
          (registration) => {
            console.log(
              'Service Worker registered with scope:',
              registration.scope
            )
          },
          (error) => {
            console.error('Service Worker registration failed:', error)
          }
        )
      })
    }
  }, [])

  return (
    <div>
      <h1>PWA Route</h1>
      <div className="px-2 md:px-0 container max-w-lg mx-auto">
        <h1 className="text-left uppercase">Dashboard Page</h1>
        <div className="mt-12 flex flex-col gap-4">
          <Link href="/dashboard/male">Chỉnh điểm Nam</Link>
          <Link href="/dashboard/female">Chỉnh điểm Nữ</Link>
        </div>
      </div>
    </div>
  )
}

export default SpecificRoute
