'use client'
import PlayerList from 'app/ui/PlayerList'
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
      <h1>Specific Route</h1>
      <div className="px-2 md:px-0 container max-w-lg mx-auto">
        {/* <h1 className="text-left uppercase">Bảng điểm nam</h1> */}
        <PlayerList MODEL={'players_male'} API="/api/players-male" />
      </div>
    </div>
  )
}

export default SpecificRoute
