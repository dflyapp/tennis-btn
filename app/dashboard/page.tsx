'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Dashboard() {
  const [notifications, setNotifications] = useState(false)
  const [darkMode, setDarkMode] = useState(true)
  const [autoSave, setAutoSave] = useState(false)

  return (
    <div className="container mx-auto">
      <h1 className="text-left uppercase">Dashboard</h1>
      <div className="mt-12 flex flex-col gap-4">
        <Link href="/dashboard/male">Chỉnh điểm Nam</Link>
        <Link href="/dashboard/female">Chỉnh điểm Nữ</Link>
      </div>

      {/* Toggle buttons */}
      <div className="mt-12 max-w-sm flex flex-col gap-4">
        <h2 className="text-lg font-semibold">Cài Đặt</h2>

        {/* Row 1 */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Enable Notifications</span>
          <label className="flex items-center gap-2 cursor-pointer">
            <span className={`text-sm font-medium ${!notifications ? 'text-base-content' : 'text-base-content/30'}`}>Off</span>
            <input
              type="checkbox"
              className="toggle toggle-primary"
              checked={notifications}
              onChange={() => setNotifications(!notifications)}
            />
            <span className={`text-sm font-medium ${notifications ? 'text-primary' : 'text-base-content/30'}`}>On</span>
          </label>
        </div>

        {/* Row 2 */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Dark Mode</span>
          <label className="flex items-center gap-2 cursor-pointer">
            <span className={`text-sm font-medium ${!darkMode ? 'text-base-content' : 'text-base-content/30'}`}>Off</span>
            <input
              type="checkbox"
              className="toggle toggle-primary"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
            />
            <span className={`text-sm font-medium ${darkMode ? 'text-primary' : 'text-base-content/30'}`}>On</span>
          </label>
        </div>
      </div>
    </div>
  )
}
