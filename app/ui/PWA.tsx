'use client'

import { useEffect } from 'react'

const PWA = () => {
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
      <h4>PWA Element</h4>
    </div>
  )
}

export default PWA
